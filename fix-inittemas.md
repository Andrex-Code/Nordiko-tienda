# Fix: Función `initTemas` no definida

## Problema

En producción (`https://nordiko-tienda.vercel.app/admin`), la función `initTemas` no estaba disponible (`typeof initTemas === 'undefined'`), lo que impedía que los event listeners de las tarjetas de tema se asignaran correctamente.

## Causa Raíz

El bloque de código que asignaba los event listeners a las tarjetas de tema (`.tema-card`) estaba a **nivel superior del script**, ejecutándose inmediatamente al cargar el archivo `admin.js`. Esto causaba dos problemas:

1. **Timing**: Si el DOM no estaba completamente cargado cuando el script se ejecutaba, los elementos `.tema-card` no existían y los listeners no se asignaban.
2. **Falta de función**: La llamada a `initTemas()` en `initAdmin()` (línea 1385) referenciaba una función que nunca fue definida.

## Corrección Aplicada

Se envolvió el bloque de código que maneja los event listeners de `.tema-card` dentro de una función `initTemas()`:

**Antes:**
```javascript
// Manejar selección de tema — con guardado automático
document.querySelectorAll('.tema-card').forEach(card => {
  card.addEventListener('click', () => {
    // ... lógica de selección de tema
  });
});
```

**Después:**
```javascript
function initTemas() {
  // Manejar selección de tema — con guardado automático
  document.querySelectorAll('.tema-card').forEach(card => {
    card.addEventListener('click', () => {
      // ... lógica de selección de tema
    });
  });
}
```

## Ubicaciones

- **Definición**: Línea 899 en `admin.js`
- **Llamada**: Línea 1387 en `initAdmin()`

## Verificación

- [x] `initTemas` está definida como function
- [x] Los event listeners de `.tema-card` se asignan correctamente dentro de la función
- [x] No hay errores de sintaxis (validado con `node --check`)
- [x] La función se llama después de que el DOM está listo (vía `initAdmin`)

## Impacto

- Las tarjetas de tema ahora responden correctamente a los clics
- La selección de tema funciona con guardado automático
- El panel de colores personalizados se muestra/oculta correctamente
