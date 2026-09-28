# Fix: Firebase no cargaba en el Admin

## Problema
El panel de administración (https://nordiko-tienda.vercel.app/admin) no cargaba Firebase y no mostraba productos:
- `firebaseCargado: false`
- `productosEnGrid: 0`
- `productosGrid` existía pero estaba vacío

## Causas raíz identificadas

### 1. Ruta de importación incorrecta en admin.js
**Archivo:** `admin.js` línea 23

**Antes:**
```javascript
import { productosCollection, configCollection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, doc } from '../firebase-config.js';
```

**Después:**
```javascript
import { productosCollection, configCollection, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, doc } from './firebase-config.js';
```

**Explicación:** La ruta `../firebase-config.js` apuntaba a un directorio padre inexistente. Debía ser `./firebase-config.js` (mismo directorio).

---

### 2. Doble carga de Firebase
**Archivo:** `admin/index.html`

**Antes:**
```html
<script type="module" src="../firebase-config.js"></script>
<script type="module" src="../admin.js"></script>
```

**Después:**
```html
<script type="module" src="../admin.js"></script>
```

**Explicación:** `admin.js` ya importa `firebase-config.js` directamente. Cargar ambos causaba inicialización duplicada de Firebase.

---

### 3. Uso incorrecto de getDocs para configuración
**Archivo:** `admin.js` función `cargarDatos()`

**Antes:**
```javascript
const configDoc = await getDocs(configCollection);
if (!configDoc.empty) {
  configDoc.forEach((doc) => {
    if (doc.id === 'tienda') {
      config = { ...config, ...doc.data() };
    }
  });
}
```

**Después:**
```javascript
const configDocRef = doc(configCollection, 'tienda');
const configDocSnap = await getDoc(configDocRef);
if (configDocSnap.exists()) {
  config = { ...config, ...configDocSnap.data() };
}
```

**Explicación:** Se debe usar `getDoc` para obtener un documento específico, no `getDocs` que obtiene toda la colección.

---

### 4. ID de producto como número en Firestore
**Archivo:** `admin.js` función `guardarProductos()`

**Antes:**
```javascript
await setDoc(doc(productosCollection, producto.id), productoData);
```

**Después:**
```javascript
await setDoc(doc(productosCollection, String(id)), productoData);
```

**Explicación:** Firestore requiere IDs de documento como string, no como número.

---

### 5. Función cerrarModal duplicada
**Archivo:** `admin.js`

**Problema:** La función `cerrarModal` estaba definida dos veces (líneas 524 y 530), causando error de sintaxis.

**Solución:** Se eliminó la duplicación.

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
- Función `cerrarModal` duplicada eliminada
- Todas las funciones están correctamente cerradas

### ✅ DOM cargado antes de Firebase
- El código verifica `document.readyState` antes de inicializar
- Los scripts se cargan al final del `<body>`

---

## Resultado esperado

Después de estas correcciones:
- ✅ Firebase se carga correctamente en el admin
- ✅ Los productos se muestran en el grid
- ✅ No hay errores en consola
- ✅ La configuración de la tienda se carga desde Firestore
- ✅ Los productos se guardan correctamente en Firestore

---

### 6. initAdmin no esperaba la carga de datos de Firebase
**Archivo:** `admin.js` función `initAdmin()`

**Antes:**
```javascript
function initAdmin() {
  cargarDatos();
  cargarConfigEnFormulario();
  renderProductos();
  // ...
}
```

**Después:**
```javascript
async function initAdmin() {
  await cargarDatos();
  cargarConfigEnFormulario();
  renderProductos();
  // ...
}
```

**Explicación:** `cargarDatos()` es asíncrona pero no se esperaba, por lo que `renderProductos()` se ejecutaba con un array vacío antes de que llegaran los datos de Firebase.

---

## Archivos modificados

1. `admin.js` - Corregidas importaciones, uso de getDoc, guardado de productos, función duplicada, initAdmin async
2. `admin/index.html` - Eliminada carga duplicada de firebase-config.js
