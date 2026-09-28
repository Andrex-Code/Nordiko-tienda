# Fix: Funciones del Carrito No Disponibles

## Proma
En producción (https://nordiko-tienda.vercel.app), las funciones del carrito no estaban accesibles:
- `agregarAlCarrito`: undefined
- `actualizarCarrito`: undefined
- `abrirCarrito`: undefined

## Causa Raíz
Todo el código en `app.js` estaba envuelto en un **IIFE** (Immediately Invoked Function Expression):

```javascript
(function () {
    'use strict';
    
    function agregarAlCarrito(id, boton) { ... }
    function actualizarCarrito() { ... }
    function abrirCarrito() { ... }
    
})();
```

Esto significa que todas las funciones estaban en el **scope local** del IIFE, no en el **scope global**. Por lo tanto:
- No eran accesibles desde la consola del navegador
- No eran accesibles desde eventos inline en HTML (`onclick="agregarAlCarrito(...)"`)
- No eran accesibles desde otros scripts

## Solución Aplicada
Se agregaron líneas para exponer las funciones necesarias al scope global usando `window`:

```javascript
// Exponer funciones del carrito al scope global
window.agregarAlCarrito = agregarAlCarrito;
window.actualizarCarrito = actualizarCarrito;
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.cambiarCantidad = cambiarCantidad;
window.guardarCarrito = guardarCarrito;
window.cargarCarrito = cargarCarrito;
```

## Funciones Expuestas
| Función | Descripción |
|---------|-------------|
| `agregarAlCarrito(id, boton)` | Agrega un producto al carrito |
| `actualizarCarrito()` | Actualiza la vista del carrito |
| `abrirCarrito()` | Abre el sidebar del carrito |
| `cerrarCarrito()` | Cierra el sidebar del carrito |
| `eliminarDelCarrito(id)` | Elimina un producto del carrito |
| `cambiarCantidad(id, delta)` | Cambia la cantidad de un producto |
| `guardarCarrito()` | Guarda el carrito en localStorage |
| `cargarCarrito()` | Carga el carrito desde localStorage |

## Verificación
Después de la corrección:
- [x] `agregarAlCarrito` es `function`
- [x] `actualizarCarrito` es `function`
- [x] `abrirCarrito` es `function`
- [x] No hay errores de sintaxis (verificado con `node --check`)
- [x] Las funciones están en el scope global

## Archivo Modificado
- `app.js` (líneas 831-841)
