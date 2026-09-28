# Eliminación del Sistema de Temas — NØRDIKO

## Resumen

Se eliminó completamente el sistema de temas del proyecto NØRDIKO. La tienda y el panel de administración ahora usan únicamente los colores por defecto (Bosque) definidos en las variables CSS.

---

## Archivos modificados

### 1. `admin/index.html`
**Eliminado:**
- Sección completa de temas en el panel de ajustes (tarjetas de tema, panel de colores personalizados, preview de tienda, botones de guardar/restablecer)
- Modal de vista previa de la tienda (`previewModalOverlay`)
- ~600 líneas de CSS relacionado con temas:
  - `.temas-section`, `.temas-grid`, `.tema-card`
  - `.custom-colors-panel`, `.color-pickers-grid`, `.color-picker-item`, `.color-picker-wrapper`
  - `.tema-preview-banner`, `.preview-store`, `.preview-store-*`
  - `.preview-modal-overlay`, `.preview-modal`, `.preview-store-large`
  - Media queries responsive para temas

### 2. `admin.js`
**Eliminado:**
- `const STORAGE_KEY_TEMA = 'nordiko_tema'`
- `const TEMAS = {...}` (5 temas: bosque, cafe, noche, tierra, personalizado)
- `let temaActual` y `let customColores`
- `function cargarTema()`
- `function aplicarTema(nombreTema)`
- `function initTemas()` (event listeners de tarjetas y color pickers)
- `function guardarTema()`
- `function restablecerTema()`
- Referencias a temas en `initAdmin()` (`cargarTema()` e `initTemas()`)
- Llamadas a `document.getElementById` para elementos de temas (`btnGuardarTema`, `btnRestablecerTema`, `btnVerPreview`, etc.)
- Funciones `abrirPreviewModal()` y `cerrarPreviewModal()`
- Event listener de tecla Escape para el modal de preview

### 3. `app.js`
**Eliminado:**
- Sección completa "16. SISTEMA DE TEMAS - APLICAR A LA TIENDA"
- `const TEMAS = {...}` (5 temas)
- `let customColores`
- `function aplicarTema(nombreTema)`
- `function hexToRgb(hex)`
- `function cargarTema()`
- Llamada `cargarTema()` al iniciar
- Referencia a "preferencias de tema" en texto de cookies

### 4. `index.html`
**Eliminado:**
- Script completo de aplicación de temas en el `<head>` (~345 líneas)
- `const CLAVE_TEMA = 'nordiko_tema'`
- `const TEMAS = {...}` (4 temas con variables CSS)
- Funciones de utilidad de color: `hslToHex`, `hexToHsl`, `aclararColor`, `oscurecerColor`, `generarVariaciones`, `esColorValido`
- `function construirTemaPersonalizado(colores)`
- `function aplicarTema(nombreTema, customColores)`
- `function cargarYAplicarTema()`

---

## Qué se MANTIVO

- **Colores por defecto (Bosque)** definidos en las variables CSS de `styles.css` y `admin/index.html`
- Todas las funcionalidades del admin: productos, pedidos, categorías, configuración
- Todas las funcionalidades de la tienda: carrito, checkout, filtros, búsqueda, favoritos
- Sistema de notificaciones toast
- Sistema de confirmación para eliminaciones
- Gestión de fotos de productos
- Responsive design

---

## Verificación

- `node --check admin.js` — Sin errores
- `node --check app.js` — Sin errores
- No quedan referencias a 'tema' en el código (excepto un comentario en el header de admin.js)

---

## Impacto

- **Rendimiento:** Se eliminó la carga de un script de ~345 líneas en el `<head>` de la tienda (elimina FOUC y reduce tiempo de carga)
- **Mantenimiento:** Se eliminó código duplicado de paletas de colores en 3 archivos
- **Simplificación:** El sistema de temas añadía complejidad sin beneficio claro — los colores por defecto (Bosque) ya estaban bien definidos
