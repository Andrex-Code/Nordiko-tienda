# Fix: Categorías, WhatsApp y Precios

**Fecha:** 2026-09-28  
**Estado:** ✅ Completado

---

## Problemas Corregidos

### 1. ✅ Categoría "perfume" agregada en admin.js

**Problema:** El producto L'Eau d'Issey Miyake tiene categoría "perfume" pero las categorías por defecto del admin no la incluían.

**Archivo:** `admin.js`

**Cambios:**
- Agregado `'perfume'` al array `CATEGORIAS` (línea 39)
- Agregada categoría `perfume` al objeto `config` por defecto (línea 85)
- Agregada categoría `perfume` al fallback de validación de categorías (línea 158)

---

### 2. ✅ Números de WhatsApp unificados

**Problema:** Checkout usaba `573001234567` mientras el footer usaba `573128439577`. Si el admin no configuraba el número, los pedidos iban a un número equivocado.

**Solución:** Se unificó todo al número `573128439577`.

**Archivos modificados:**

| Archivo | Línea | Cambio |
|---------|-------|--------|
| `app.js` | 706 | `573001234567` → `573128439577` |
| `index.html` | 301 | `573001234567` → `573128439577` |
| `index.html` | 413 | `573001234567` → `573128439577` |

---

### 3. ✅ Formato de precios unificado

**Problema:** 
- Tienda usaba `$20.000` (formato colombiano)
- Admin usaba `$25.99` (formato inglés)
- WhatsApp usaba `$20000.00` (formato inglés)

**Solución:** Todo usa formato colombiano con separador de miles: `$20.000`

**Archivos modificados:**

#### `admin.js`
- Función `formatMoneda()` reescrita para formato colombiano
- Línea 322: `$${p.total.toFixed(2)}` → `${formatMoneda(p.total)}`
- Línea 349: `'$' + ventasMes.toFixed(2)` → `formatMoneda(ventasMes)`
- Línea 352: `'$' + ventasMes.toFixed(2)` → `formatMoneda(ventasMes)`
- Línea 374: `$${p.total.toFixed(2)}` → `${formatMoneda(p.total)}`

#### `app.js`
- Línea 712: `$${(item.precio * item.cantidad).toFixed(2)}` → `${formatearPrecio(item.precio * item.cantidad)}`
- Línea 716: `$${total.toFixed(2)}` → `${formatearPrecio(total)}`

---

## Verificación

| Criterio | Estado |
|----------|--------|
| La categoría "perfume" aparece en las categorías por defecto | ✅ |
| Todos los números de WhatsApp son iguales (`573128439577`) | ✅ |
| Todos los precios usan formato colombiano (`$20.000`) | ✅ |

---

## Formato de Precio Colombiano

```javascript
// Antes (formato inglés)
'$' + num.toFixed(2)           // $25.99

// Después (formato colombiano)
'$' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')  // $25.990
```

**Ejemplos:**
- `20000` → `$20.000`
- `25.99` → `$26.000` (redondea)
- `350` → `$350`
- `1500000` → `$1.500.000`
