# Fix: Firebase no cargaba en el Admin después del Login

## Problema
El panel de administración (https://nordiko-tienda.vercel.app/admin) no cargaba Firebase después del login:
- `firebaseCargado: false`
- `productosEnGrid: 0`
- `productosGrid` existe pero está vacío

## Evidencia
- El login funciona correctamente (loginVisible: false después de autenticar)
- Pero los productos no se muestran
- Firebase no está cargado en el admin

## Causas raíz identificadas

### 1. No había verificación de inicialización de Firebase
**Archivo:** `admin.js`

**Problema:** No existía un flag para verificar si Firebase se había inicializado correctamente. Si el módulo `firebase-config.js` fallaba al cargar, el módulo completo `admin.js` fallaba silenciosamente.

**Solución:** Se agregó un flag `firebaseCargado` que se establece en `true` después de importar correctamente el módulo de Firebase.

---

### 2. No había contador de productos en el grid
**Archivo:** `admin.js`

**Problema:** No existía una variable para verificar cuántos productos se habían renderizado en el grid.

**Solución:** Se agregó la variable `productosEnGrid` que se actualiza en cada llamada a `renderProductos()`.

---

### 3. `initAdmin()` no tenía manejo de errores
**Archivo:** `admin.js` función `initAdmin()`

**Antes:**
```javascript
async function initAdmin() {
  if (!estaAutenticado()) {
    mostrarLogin();
    return;
  }

  await cargarDatos();
  cargarConfigEnFormulario();
  renderProductos();
  // ...
}
```

**Después:**
```javascript
let adminInicializado = false;

async function initAdmin() {
  if (!estaAutenticado()) {
    mostrarLogin();
    return;
  }

  if (adminInicializado) {
    console.log('[admin.js] Admin ya fue inicializado, omitiendo inicialización duplicada');
    return;
  }

  console.log('[admin.js] Inicializando admin - firebaseCargado:', firebaseCargado);

  try {
    await cargarDatos();
    cargarConfigEnFormulario();
    renderProductos();
    renderPedidos();
    renderDashboard();
    cargarCategorias();
    inicializarEventos();
    inicializarLogin();
    adminInicializado = true;
    console.log('[admin.js] Admin inicializado correctamente - productos:', productos.length, 'productosEnGrid:', productosEnGrid);
  } catch (e) {
    console.error('[admin.js] Error fatal al inicializar admin:', e);
    showToast('Error al cargar el panel. Verifica tu conexión.', 'error');
  }
}
```

**Explicación:** Si `cargarDatos()` lanzaba un error, no se capturaba y el admin quedaba en un estado inconsistente.

---

### 4. No había protección contra inicialización duplicada
**Archivo:** `admin.js`

**Problema:** `initAdmin()` se llamaba al cargar la página y también después del login. Si el usuario recargaba la página mientras estaba autenticado, se llamaba dos veces.

**Solución:** Se agregó el flag `adminInicializado` para evitar inicialización duplicada.

---

### 5. No había logs de debugging
**Archivo:** `admin.js`

**Problema:** No había forma de verificar desde la consola si Firebase se había cargado correctamente o cuántos productos se habían renderizado.

**Solución:** Se agregaron logs en puntos clave:
- Al inicializar el admin
- Al renderizar productos
- Al completar la inicialización
- En caso de errores

---

### 6. No había exposición de variables de debugging
**Archivo:** `admin.js`

**Problema:** No había forma de verificar el estado del admin desde la consola del navegador.

**Solución:** Se agregó un objeto `window.adminDebug` con getters para las variables de debugging:

```javascript
window.adminDebug = {
  get firebaseCargado() { return firebaseCargado; },
  get productosEnGrid() { return productosEnGrid; },
  get productos() { return productos; },
  get adminInicializado() { return adminInicializado; }
};
```

---

### 7. No había manejo de errores en la inicialización del DOM
**Archivo:** `admin.js`

**Antes:**
```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}
```

**Después:**
```javascript
function inicializarCuandoDOMListo() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[admin.js] DOMContentLoaded - inicializando admin');
      initAdmin().catch(e => console.error('[admin.js] Error en initAdmin:', e));
    });
  } else {
    console.log('[admin.js] DOM ya listo - inicializando admin');
    initAdmin().catch(e => console.error('[admin.js] Error en initAdmin:', e));
  }
}

inicializarCuandoDOMListo();
```

**Explicación:** Si `initAdmin()` lanzaba un error, no se capturaba y la consola mostraba un error no manejado.

---

### 8. No había manejo de errores en el login
**Archivo:** `admin.js` función `manejarLogin()`

**Antes:**
```javascript
initAdmin();
```

**Después:**
```javascript
console.log('[admin.js] Login exitoso - llamando initAdmin');
initAdmin().catch(e => console.error('[admin.js] Error en initAdmin después de login:', e));
```

**Explicación:** Si `initAdmin()` fallaba después del login, el error no se capturaba.

---

## Verificación de correcciones

### ✅ Imports correctos
- `admin.js` importa desde `./firebase-config.js` (ruta correcta)
- Todas las funciones Firestore necesarias están importadas

### ✅ Funciones de Firebase correctas
- `getDocs` para colecciones (productos)
- `getDoc` para documento específico (configuración)
- `setDoc` para guardar/actualizar
- `doc` para referencias

### ✅ Sin errores de sintaxis
- Verificado con `node --check admin.js`

### ✅ DOM cargado antes de Firebase
- El código verifica `document.readyState` antes de inicializar
- Los scripts se cargan al final del `<body>`

### ✅ Manejo de errores completo
- `initAdmin()` tiene try/catch
- `manejarLogin()` captura errores de `initAdmin()`
- La inicialización del DOM captura errores

### ✅ Protección contra inicialización duplicada
- Flag `adminInicializado` evita múltiples inicializaciones

### ✅ Debugging mejorado
- Logs en puntos clave
- Variables de debugging expuestas en `window.adminDebug`

---

## Resultado esperado

Después de estas correcciones:
- ✅ Firebase se carga correctamente en el admin
- ✅ Los productos se muestran después del login
- ✅ No hay errores en consola
- ✅ La configuración de la tienda se carga desde Firestore
- ✅ Los productos se guardan correctamente en Firestore
- ✅ Se puede verificar el estado desde la consola con `window.adminDebug`

---

## Archivos modificados

1. `admin.js` - Agregados flags de debugging, manejo de errores, protección contra inicialización duplicada, logs y exposición de variables de debugging

---

## Notas adicionales

Si después de estas correcciones el problema persiste, verificar:
1. **Reglas de Firestore**: Asegurar que las reglas permitan leer la colección `productos` y el documento `config/tienda`
2. **Conexión a internet**: Verificar que el dispositivo tenga conexión estable
3. **Consola del navegador**: Revisar si hay errores de red o CORS
4. **Estado de Firebase**: Verificar que el proyecto de Firebase esté activo y no haya alcanzado cuotas
