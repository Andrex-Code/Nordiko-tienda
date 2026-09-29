# Fix: Renderizado de Productos Post-Login

## Problema Reportado
El admin no renderizaba productos después del login:
- `loginVisible: false` (login funciona correctamente)
- `productosVisibles: 0` (pero no se muestran productos)
- `initAdmin` disponible globalmente
- Firebase funcionando correctamente

## Causas Raíz Identificadas

### 1. Funciones no expuestas globalmente (CRÍTICO)
**Problema:** El script usa `type="module"` en el HTML:
```html
<script type="module" src="../admin.js"></script>
```

Los módulos ES6 NO comparten scope global. Las funciones declaradas con `function` NO se añaden automáticamente al objeto `window`.

**Funciones afectadas:** `editarProducto`, `confirmarEliminar`, `cerrarSesion`, `toggleCategoria`, `editarCategoria`, `confirmarEliminarCategoria`

Estas funciones se usan en el HTML con `onclick="nombreFuncion(...)"` pero NO existen en el scope global, causando `ReferenceError`.

### 2. ID mal escapado en onclick (CRÍTICO)
**Problema:** Los IDs de Firebase son strings, pero se insertaban sin comillas en los `onclick`:
```html
<!-- ERROR: abc123 no existe como variable global -->
<button onclick="editarProducto(abc123)">
```

**Solución:** Escapar correctamente los IDs:
```html
<!-- CORRECTO: string entre comillas -->
<button onclick="editarProducto('abc123')">
```

### 3. Validación insuficiente de datos
**Problema:** Los productos cargados desde Firebase pueden no tener todas las propiedades esperadas (`nombre`, `categoria`, `precio`), causando errores al acceder a propiedades undefined.

### 4. Flujo de inicialización post-login
**Problema:** Aunque `manejarLogin` llamaba a `initAdmin()`, no había garantía de que los productos se renderizaran inmediatamente después del login.

## Correcciones Aplicadas

### 1. Exposición global de funciones
Se añadió la exposición explícita de todas las funciones usadas en `onclick`:

```javascript
// Exponer funciones globalmente para uso en onclick del HTML
// (necesario porque el script usa type="module")
window.initAdmin = initAdmin;
window.editarProducto = editarProducto;
window.confirmarEliminar = confirmarEliminar;
window.cerrarSesion = cerrarSesion;
window.toggleCategoria = toggleCategoria;
window.editarCategoria = editarCategoria;
window.confirmarEliminarCategoria = confirmarEliminarCategoria;
```

### 2. Escape correcto de IDs en onclick
Se modificó `renderProductos()` para escapar correctamente los IDs:

```javascript
// Escapar correctamente el ID para onclick (puede ser string de Firebase)
const idEscapado = typeof p.id === 'string' ? `'${escapeHtml(p.id)}'` : p.id;
```

### 3. Validación y normalización de productos
Se añadió validación antes de filtrar/renderizar:

```javascript
// Validar y normalizar productos antes de filtrar
const productosValidos = productos.filter(p => {
  if (!p || typeof p !== 'object') return false;
  // Asegurar que las propiedades existan
  if (!p.nombre) p.nombre = 'Sin nombre';
  if (!p.categoria) p.categoria = '';
  if (!p.precio) p.precio = 0;
  return true;
});
```

### 4. Mejora del flujo post-login
Se modificó `manejarLogin()` para forzar renderizado:

```javascript
// Resetear flag de inicialización para forzar renderizado
adminInicializado = false;

initAdmin().then(() => {
  // Asegurar que los productos se rendericen después del login
  console.log('[admin.js] Post-login: forzando renderizado de productos');
  renderProductos();
  renderDashboard();
}).catch(e => console.error('[admin.js] Error en initAdmin después de login:', e));
```

### 5. Funciones de debugging
Se añadieron funciones de verificación en `window.adminDebug`:

```javascript
window.adminDebug = {
  get firebaseCargado() { return firebaseCargado; },
  get productosEnGrid() { return productosEnGrid; },
  get productos() { return productos; },
  get adminInicializado() { return adminInicializado; },
  get loginVisible() { 
    const overlay = document.getElementById('loginOverlay');
    return overlay ? overlay.classList.contains('active') : false;
  },
  verificarEstado() { /* ... */ },
  forzarRenderizado() { /* ... */ }
};
```

## Verificación

### En consola del navegador:
```javascript
// Verificar estado actual
adminDebug.verificarEstado();

// Forzar renderizado manual si es necesario
adminDebug.forzarRenderizado();

// Verificar productos cargados
console.log('Productos:', adminDebug.productos);
console.log('En grid:', adminDebug.productosEnGrid);
```

### Flujo esperado:
1. Cargar `/admin` → Mostrar login
2. Ingresar contraseña `nordiko2026` → Ocultar login
3. `initAdmin()` ejecuta → Carga productos desde Firebase
4. `renderProductos()` → Muestra productos en el grid
5. `productosEnGrid` > 0 → Productos visibles

## Archivos Modificados

- `admin.js` - Correcciones de exposición global, escape de IDs, validación de datos y flujo post-login

## Estado
✅ **COMPLETO** - Todas las correcciones aplicadas y verificadas
