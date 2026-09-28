# Fix: Temas en Admin - Los colores no cambiaban

## Problema

Al hacer clic en una tarjeta de tema en el panel de administración:
- ✅ La tarjeta se marcaba como activa
- ✅ Se guardaba en localStorage
- ❌ Los colores NO cambiaban

**Evidencia:**
- `fondoAntes: #0a0a0a` → `fondoDespues: #0a0a0a` (NO CAMBIÓ)
- `acentoAntes: #c9a96e` → `acentoDespues: #c9a96e` (NO CAMBIÓ)

## Causa Raíz

1. **Variables CSS no coincidían**: En `admin/index.html`, las variables CSS estaban definidas en `:root` con valores hardcodeados que no coincidían con los valores del objeto `TEMAS` en `admin.js`.

2. **Gradientes hardcodeados**: Los gradientes en las tarjetas de tema (líneas 1394-1430 de `admin/index.html`) estaban hardcodeados en el CSS y no usaban variables CSS, por lo que no cambiaban dinámicamente.

3. **Faltaban variables**: No se establecían todas las variables CSS necesarias (ej: `--gris-borde`, `--rojo-peligro`, `--preview-*`).

4. **app.js no tenía aplicarTema**: La tienda principal (`index.html`) usa `app.js`, que NO tenía la función `aplicarTema` ni cargaba el tema guardado.

5. **Declaración tardía de variables**: `categoriaEditando` y `callbackConfirmacion` estaban declaradas con `let` en la sección de categorías (línea ~1216), pero `restablecerTema` las usaba antes, causando un ReferenceError.

## Correcciones Aplicadas

### 1. `admin.js` - Función `aplicarTema` (líneas 317-435)

**Cambios:**
- ✅ Se añadió `--gris-borde`, `--rojo-peligro`, `--rojo-peligro-hover`
- ✅ Se añadió actualización dinámica de gradientes de tarjetas de tema
- ✅ Se añadió actualización dinámica de gradientes de preview
- ✅ Se mantiene la funcionalidad de variables de preview

**Código clave:**
```javascript
// Actualizar gradientes de las tarjetas de tema
const gradientesTema = {
  bosque: 'linear-gradient(135deg, #1a2e1a, #243824)',
  cafe: 'linear-gradient(135deg, #3e2723, #5d4037)',
  noche: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
  tierra: 'linear-gradient(135deg, #2d1f1a, #4a2c1a)',
  personalizado: `linear-gradient(135deg, ${colores.primario}, ${colores.primarioClaro})`
};
```

### 2. `app.js` - Nuevo sistema de temas (líneas 817-985)

**Añadido:**
- ✅ Objeto `TEMAS` con los 5 temas (bosque, cafe, noche, tierra, personalizado)
- ✅ Función `aplicarTema(nombreTema)` que establece las variables CSS de la tienda
- ✅ Función `hexToRgb(hex)` para convertir colores hex a RGB
- ✅ Función `cargarTema()` que carga el tema guardado en localStorage
- ✅ Llamada a `cargarTema()` al iniciar la aplicación

**Variables CSS de la tienda (`styles.css`):**
```css
--color-forest, --color-forest-light, --color-coffee, --color-coffee-light,
--color-bronze, --color-bronze-dark, --color-bronze-light, --color-cream,
--color-black, --color-charcoal, --color-smoke, --color-ash,
--color-text, --color-text-light, --color-text-muted,
--color-bg, --color-bg-alt, --color-bg-card, --color-border,
--color-border-bronze, --color-success, --color-error
```

### 3. `admin.js` - Declaración de variables movida arriba (líneas 106-107)

**Problema:** `categoriaEditando` y `callbackConfirmacion` estaban declaradas con `let` en la sección de categorías (línea ~1216), pero `restablecerTema` las usaba antes, causando un ReferenceError.

**Solución:** Se movieron las declaraciones junto a las otras variables de estado al inicio del archivo:

```javascript
let productoAEliminar = null;
let productoEditando = null;
let categoriaEditando = null;
let callbackConfirmacion = null;
```

## Verificación

### Temas y sus colores esperados:

| Tema | Fondo | Acento | FondoCard |
|------|-------|--------|-----------|
| **bosque** | `#0a0a0a` | `#c9a96e` | `#1c1916` |
| **cafe** | `#1a1210` | `#d4a574` | `#2d201c` |
| **noche** | `#050508` | `#2563eb` | `#151525` |
| **tierra** | `#120a08` | `#c2410c` | `#221510` |
| **personalizado** | custom | custom | custom |

### Para verificar:

1. **En admin (`admin/index.html`)**:
   - Abrir la sección "Ajustes" → "Tema de la Tienda"
   - Hacer clic en cada tarjeta de tema
   - Verificar que los colores del panel cambian (fondo, acentos, bordes)
   - Verificar que la tarjeta activa se resalta
   - Verificar en consola: `[aplicarTema] Tema "cafe" aplicado. Fondo: #1a1210, Acento: #d4a574`

2. **En la tienda (`index.html`)**:
   - Abrir la página principal
   - Verificar que los colores de fondo, texto y acentos coinciden con el tema seleccionado
   - Verificar en consola: `[aplicarTema] Tema "cafe" aplicado a la tienda. Fondo: #1a1210, Acento: #d4a574`

3. **Persistencia**:
   - Recargar la página
   - Verificar que el tema guardado se aplica automáticamente

## Archivos Modificados

1. **`admin.js`**: 
   - Función `aplicarTema` actualizada con más variables CSS y actualización dinámica de gradientes
   - Declaraciones de `categoriaEditando` y `callbackConfirmacion` movidas arriba

2. **`app.js`**: Nuevo sistema de temas añadido:
   - Objeto `TEMAS`
   - Función `aplicarTema`
   - Función `cargarTema`
   - Función `hexToRgb`
   - Carga automática al iniciar

## Notas

- Ambos archivos usan la misma clave de localStorage: `nordiko_tema`
- El tema se guarda como JSON: `{ tema: "cafe", customColores: {...} }`
- Los colores personalizados solo se aplican cuando el tema es "personalizado"
- Las transiciones CSS (`transition: all 0.3s ease`) hacen que el cambio sea suave
