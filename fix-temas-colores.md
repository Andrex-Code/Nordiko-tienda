# Fix: Temas en Admin NO Cambian Colores

## Problema Reportado
Al hacer clic en una tarjeta de tema en admin:
- ✓ La tarjeta se marca como activa
- ✓ Se guarda en localStorage
- ✗ Los colores NO cambian

## Evidencia
- fondoAntes: `#0a0a0a` → fondoDespues: `#0a0a0a` (NO CAMBIÓ)
- acentoAntes: `#c9a96e` → acentoDespues: `#c9a96e` (NO CAMBIÓ)
- tarjetaActiva: "personalizado" (debería ser "cafe")

## Root Cause (3 bugs identificados)

### Bug 1: `customColores` iniciales idénticos al CSS base
El tema "personalizado" por defecto tenía `fondo: '#0a0a0a'` y `acento: '#c9a96e'`, que son **exactamente** los mismos valores hardcodeados en el CSS de `admin/index.html`. Cuando el usuario selecciona cualquier tema, visualmente no hay cambio porque los colores personalizados por defecto son idénticos al tema base.

### Bug 2: Variables `--custom-*` contaminaban otros temas
En `aplicarTema()`, las variables `--custom-primario`, `--custom-acento`, etc. se establecían **siempre**, incluso cuando se aplicaba un tema predefinido (cafe, noche, tierra). Esto causaba que la vista previa y algunos elementos usaran los colores personalizados en vez del tema seleccionado.

### Bug 3: `restablecerTema()` restauraba valores indistinguibles
La función `restablecerTema()` devolvía `customColores` a los valores originales (`#0a0a0a`, `#c9a96e`), que son indistinguibles del tema base, reiniciando el ciclo de "no hay cambio visual".

---

## Correcciones Aplicadas en `admin.js`

### 1. `customColores` iniciales distintivos
```javascript
// ANTES (indistinguible del CSS base)
let customColores = {
  primario: '#2a2a2a',
  acento: '#c9a96e',
  fondo: '#0a0a0a',    // ← idéntico al CSS base
  texto: '#ffffff'
};

// DESPUÉS (visualmente distintivo)
let customColores = {
  primario: '#1e3a5f',
  acento: '#e07a3f',
  fondo: '#0d1b2a',    // ← Ahora es distinguible
  texto: '#f0e6d3'
};
```

### 2. Variables `--custom-*` solo para tema personalizado
```javascript
// ANTES: Siempre se aplicaban
root.style.setProperty('--custom-primario', customColores.primario);
root.style.setProperty('--custom-acento', customColores.acento);
// ...

// DESPUÉS: Solo cuando es tema personalizado
if (nombreTema === 'personalizado') {
  root.style.setProperty('--custom-primario', customColores.primario);
  root.style.setProperty('--custom-acento', customColores.acento);
  root.style.setProperty('--custom-fondo', customColores.fondo);
  root.style.setProperty('--custom-texto', customColores.texto);
  // También los color pickers
}
```

### 3. Logging para debugging
```javascript
console.log(`[aplicarTema] Tema "${nombreTema}" aplicado. Fondo: ${colores.fondo}, Acento: ${colores.acento}`);
```

### 4. `restablecerTema()` actualizado
```javascript
customColores = {
  primario: '#1e3a5f',
  acento: '#e07a3f',
  fondo: '#0d1b2a',
  texto: '#f0e6d3'
};
```

---

## Verificación Simulada

### Clic en "cafe"
| Variable | Antes | Después |
|----------|-------|---------|
| `--negro` (fondo) | `#0a0a0a` | `#1a1210` |
| `--dorado` (acento) | `#c9a96e` | `#d4a574` |
| `--verde-oscuro` | `#1a2e1a` | `#3e2723` |
| `temaActual` | `'personalizado'` | `'cafe'` |
| localStorage | `{"tema":"personalizado",...}` | `{"tema":"cafe",...}` |

### Clic en "noche"
| Variable | Antes | Después |
|----------|-------|---------|
| `--negro` (fondo) | `#1a1210` | `#050508` |
| `--dorado` (acento) | `#d4a574` | `#2563eb` |

### Clic en "tierra"
| Variable | Antes | Después |
|----------|-------|---------|
| `--negro` (fondo) | `#050508` | `#120a08` |
| `--dorado` (acento) | `#2563eb` | `#c2410c` |

---

## Nota sobre index.html (Tienda)

La tienda usa un **sistema de temas completamente diferente** con variables CSS propias (`--color-forest`, `--color-bronze`, `--color-black`, etc.) definidas en el `<head>`.

El tema guardado en localStorage (`nordiko_tema`) es leído por ambos, pero cada uno aplica su propia paleta. Para cambios completos, el `index.html` también necesita que sus variables se actualicen cuando cambia el tema (lo cual ya hace parcialmente, pero con su propia paleta de colores).

---

## Estado
- [x] Bug 1 corregido: `customColores` distintivos
- [x] Bug 2 corregido: Variables `--custom-*` condicionales
- [x] Bug 3 corregido: `restablecerTema()` actualizado
- [x] Logging agregado para debugging
- [ ] Verificación manual en navegador (abrir `admin/index.html` y hacer clic en cada tema)
