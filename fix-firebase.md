# Fix Firebase — Resumen de Correcciones

## Problema
La tienda mostraba 0 productos después de integrar Firebase Firestore.

## Causa Raíz
`cargarProductos()` es una función `async` que devuelve una **Promise**, pero se asignaba directamente a `let productos = cargarProductos()`. Al llamar `renderizarProductos()` inmediatamente después, `productos` seguía siendo una Promise (no un array), por lo que `productos.filter()` fallaba y no se renderizaba nada.

## Correcciones Aplicadas

### 1. `app.js` — Inicialización de productos
```js
// ANTES:
let productos = cargarProductos();  // Promise!

// DESPUÉS:
let productos = [];  // Array vacío, se llena async
```

### 2. `app.js` — Carga asíncrona antes de renderizar
```js
// ANTES:
renderizarProductos();

// DESPUÉS:
cargarProductos().then((productosCargados) => {
    productos = productosCargados;
    renderizarProductos();
}).catch((error) => {
    console.error('Error al inicializar productos:', error);
    productos = productosDefault;
    renderizarProductos();
});
```

### 3. `app.js` — IDs de Firebase son strings, no números
Los documentos de Firestore tienen IDs string (ej: `"abc123"`). Se eliminó `parseInt()` y se usa comparación con `String()`:

```js
// ANTES:
const id = parseInt(e.currentTarget.dataset.id);  // NaN para IDs de Firebase
const producto = productos.find(p => p.id === id);

// DESPUÉS:
const id = e.currentTarget.dataset.id;
const producto = productos.find(p => String(p.id) === String(id));
```

### 4. `app.js` — Exponer `renderizarProductos` globalmente
```js
window.renderizarProductos = renderizarProductos;
```
Esto permite que el script inline de `index.html` pueda llamarlo cuando hay categorías personalizadas.

### 5. `index.html` — Eliminar `</script>` extra
Se eliminó una etiqueta `</script>` huérfana que causaba errores de parsing.

### 6. `index.html` — Botón de filtro "perfume"
Se agregó el botón de filtro faltante para la categoría "perfume" (producto L'Eau d'Issey Miyake).

## Verificación
- [x] Los productos cargan desde Firebase
- [x] No hay errores de consola por Promise no manejada
- [x] El carrito funciona con IDs string de Firebase
- [x] Los filtros funcionan correctamente
- [x] El script inline no tiene errores de sintaxis
