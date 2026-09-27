# Revisión de Seguridad y Rendimiento — NØRDIKO

**Fecha:** 2026-09-27
**Archivos revisados:** `index.html`, `styles.css`, `app.js`, `admin/index.html`

---

## 1. Seguridad

### 1.1 XSS (Cross-Site Scripting)

| Ubicación | Problema | Estado | Solución aplicada |
|-----------|----------|--------|-------------------|
| `index.html` — categorías dinámicas | `cat.nombre` y `cat.id` insertados en innerHTML sin escapar | **CORREGIDO** | Función `escapeHtml()` agregada |
| `index.html` — redes sociales | `red.url`, `red.nombre`, `red.icono` sin escapar | **CORREGIDO** | `escapeHtml()` + validación de URL |
| `app.js` — tarjetas de producto | `producto.imagen`, `producto.nombre` sin escapar | **CORREGIDO** | `escapeHtml()` aplicado |
| `app.js` — items del carrito | `item.imagen`, `item.nombre` sin escapar | **CORREGIDO** | `escapeHtml()` aplicado |

### 1.2 localStorage

| Problema | Estado | Solución aplicada |
|----------|--------|-------------------|
| No se valida la estructura de productos guardados | **MEJORADO** | Se mantiene verificación de array + validación por defecto |
| Configuración sin validar al cargar | **CORREGIDO** | Se validan campos individuales antes de usar |
| Sin sanitización de datos de categoría | **CORREGIDO** | Se verifica `cat.id` y `cat.nombre` antes de insertar |

### 1.3 URLs

| Problema | Estado | Solución aplicada |
|----------|--------|-------------------|
| URLs de redes sociales sin validar | **CORREGIDO** | Función `isValidUrl()` verifica protocolo http/https |
| `producto.imagen` sin validar | **CORREGIDO** | Se valida antes de insertar en `src` |

### 1.4 Formularios

| Formulario | Validación actual | Mejora |
|------------|-------------------|--------|
| Newsletter | Solo `required` nativo | Aceptable — se resetea y muestra toast |
| Contacto | Solo `required` nativo | Aceptable — se resetea y muestra toast |
| Checkout | Verifica campos vacíos | Aceptable — se podría añadir validación de teléfono |

### 1.5 WhatsApp

| Problema | Estado | Solución aplicada |
|----------|--------|-------------------|
| Mensaje construido con `%0A` manual | **CORREGIDO** | Se usa `\n` + `encodeURIComponent()` |
| Datos del usuario sin codificar | **CORREGIDO** | Mensaje completo codificado correctamente |

---

## 2. Rendimiento

### 2.1 Carga inicial

| Mejora | Estado |
|--------|--------|
| `preconnect` para Google Fonts | **AGREGADO** |
| `preconnect` para cdnjs (Font Awesome) | **AGREGADO** |

### 2.2 Imágenes

| Mejura | Estado |
|--------|--------|
| `loading="lazy"` en imágenes de productos | **AGREGADO** |
| `loading="lazy"` en imágenes del carrito | **AGREGADO** |

### 2.3 CSS/JS

| Aspecto | Estado |
|---------|--------|
| CSS en archivo separado | OK |
| JS en archivo separado | OK |
| Minificación | Pendiente (requiere build step) |

### 2.4 Fuentes

| Mejora | Estado |
|--------|--------|
| `preconnect` a Google Fonts | **AGREGADO** |
| `display=swap` en URL de Google Fonts | Ya presente |

### 2.5 Caché

| Mejora | Estado |
|--------|--------|
| `manifest.json` para PWA | **CREADO** |
| Service worker | No implementado (requiere HTTPS) |

---

## 3. Mejores prácticas

### 3.1 Meta tags

| Tag | Estado |
|-----|--------|
| `charset` | Ya presente |
| `viewport` | Ya presente |
| `description` | **AGREGADO** |
| `theme-color` | **AGREGADO** |
| `mobile-web-app-capable` | **AGREGADO** |
| `apple-mobile-web-app-capable` | **AGREGADO** |

### 3.2 Open Graph

| Tag | Estado |
|-----|--------|
| `og:title` | **AGREGADO** |
| `og:description` | **AGREGADO** |
| `og:type` | **AGREGADO** |
| `og:locale` | **AGREGADO** |
| `og:site_name` | **AGREGADO** |
| `twitter:card` | **AGREGADO** |
| `twitter:title` | **AGREGADO** |
| `twitter:description` | **AGREGADO** |

### 3.3 Schema.org

| Tipo | Estado |
|------|--------|
| `Store` con dirección, teléfono, horario | **AGREGADO** (JSON-LD) |

### 3.4 PWA

| Recurso | Estado |
|---------|--------|
| `manifest.json` | **CREADO** |
| Service worker | No implementado |
| Iconos | SVG inline en manifest |

---

## 4. Resumen de cambios aplicados

### `index.html`
- ✅ Meta description, theme-color
- ✅ Open Graph y Twitter Cards
- ✅ Schema.org JSON-LD (Store)
- ✅ PWA meta tags + manifest
- ✅ Preconnect para recursos externos
- ✅ Función `escapeHtml()` para prevenir XSS
- ✅ Función `isValidUrl()` para validar URLs
- ✅ Escape de HTML dinámico en categorías
- ✅ Escape y validación de URLs en redes sociales

### `app.js`
- ✅ Función `escapeHtml()` agregada
- ✅ Función `isValidUrl()` agregada
- ✅ Escape de HTML en tarjetas de producto
- ✅ Escape de HTML en items del carrito
- ✅ Validación de URLs de imágenes
- ✅ `loading="lazy"` en imágenes
- ✅ Mensaje de WhatsApp codificado con `encodeURIComponent`

### `admin/index.html`
- ✅ Revisado — no se encontraron vulnerabilidades críticas
- ✅ Los datos se insertan desde JS con texto estático (bajo riesgo)

### Nuevos archivos
- ✅ `manifest.json` — para instalación como PWA

---

## 5. Recomendaciones futuras

1. **Service Worker** — Implementar para cachear recursos y funcionar offline
2. **Minificación** — Usar herramientas como Terser (JS) y cssnano (CSS)
3. **Validación de formularios** — Añadir validación de teléfono y email con regex
4. **CSP (Content Security Policy)** — Añadir cabecera CSP para mayor protección XSS
5. **HTTPS** — Necesario para service worker y seguridad general
6. **Imagenes** — Considerar usar WebP con fallback a PNG/JPG
