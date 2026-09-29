# Fix: Eliminación de Productos en Firebase

## Problema Crítico

Los productos "eliminados" volvían al recargar la página porque `guardarProductos()` no eliminaba los documentos de Firebase, solo los quitaba del array local.

## Causa Raíz

1. **`guardarProductos()`**: Solo guardaba los productos del array local usando `setDoc`, pero no eliminaba los documentos que ya no estaban en el array.
2. **Función de eliminación**: Al confirmar la eliminación, solo filtraba el array local y llamaba a `guardarProductos()`, sin eliminar el documento de Firebase.
3. **`cargarDatos()`**: Al recargar, volvía a obtener todos los documentos de Firebase, incluyendo los "eliminados".

## Corrección Aplicada

### Archivo: `admin.js`

**Función modificada**: Event listener de `btnConfirmarEliminar` (líneas 826-841)

**Cambios**:
1. Se convirtió el callback a `async` para poder usar `await`
2. Se agregó la eliminación del documento de Firebase usando `deleteDoc(doc(productosCollection, String(idAEliminar)))`
3. Se agregó manejo de errores con try/catch
4. Se agregó un `return` temprano si hay error para evitar eliminar del array local si falla la eliminación en Firebase

**Código corregido**:
```javascript
if (btnConfirmarEliminar) {
  btnConfirmarEliminar.addEventListener('click', async () => {
    if (callbackConfirmacion) {
      callbackConfirmacion();
      callbackConfirmacion = null;
    } else if (productoAEliminar) {
      const idAEliminar = productoAEliminar;
      // Eliminar el documento de Firebase
      try {
        await deleteDoc(doc(productosCollection, String(idAEliminar)));
        console.log('Producto eliminado de Firebase:', idAEliminar);
      } catch (e) {
        console.error('Error al eliminar producto de Firebase:', e);
        showToast('Error al eliminar el producto', 'error');
        return;
      }
      // Eliminar del array local
      productos = productos.filter(p => p.id !== idAEliminar);
      renderProductos();
      renderDashboard();
      showToast('Producto eliminado');
      productoAEliminar = null;
    }
    if (confirmOverlay) confirmOverlay.classList.remove('active');
  });
}
```

## Verificación

- [x] Al eliminar un producto, se elimina de Firebase usando `deleteDoc`
- [x] Al recargar, el producto no reaparece
- [x] No hay errores de sintaxis
- [x] Se manejan errores de Firebase apropiadamente
- [x] Se muestra notificación de error si falla la eliminación

## Fecha

2026-09-28
