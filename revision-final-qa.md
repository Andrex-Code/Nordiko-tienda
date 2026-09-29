# 🔍 REVISIÓN QA FINAL — NØRDIKO

**Fecha:** 28 de septiembre de 2026  
**Probado por:** Ingeniero QA Senior  
**URLs probadas:**  
- Tienda: https://nordiko-tienda.vercel.app  
- Admin: https://nordiko-tienda.vercel.app/admin  

---

## 📋 RESUMEN EJECUTIVO

| Área | Estado | Pass | Falla |
|------|--------|------|-------|
| Tienda | ⚠️ PARCIAL | 5 | 3 |
| Admin | ❌ CRÍTICO | 5 | 3 |
| **TOTAL** | **⚠️** | **10** | **6** |

**Veredicto general:** La tienda funciona para ventas pero tiene inconsistencias. El admin tiene bugs críticos que impiden la gestión correcta de productos.

---

## 🛒 VERIFICACIONES DE LA TIENDA

### 1. Productos cargan desde Firebase — ⚠️ PASS CON OBSERVACIONES

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Carga desde Firebase | ✅ PASS | Usa `getDocs(productosCollection)` correctamente |
| Fallback a productos default | ✅ PASS | Si Firebase falla, usa 13 productos locales |
| Solo muestra L'Eau d'Issey Miyake | ⚠️ OBSERVACIÓN | Depende de lo que haya en Firebase. Los 13 productos default incluyen 12 productos NØRDIKO + L'Eau d'Issey |

**Nota:** Si Firebase tiene solo L'Eau d'Issey Miyake, la tienda lo muestra correctamente. Si Firebase está vacío, muestra los 13 productos default (incluyendo productos que quizás no deberían estar).

---

### 2. Carrito funciona — ✅ PASS

| Función | Resultado | Detalle |
|---------|-----------|---------|
| Agregar al carrito | ✅ PASS | `agregarAlCarrito()` con animación y toast |
| Modificar cantidad (+/-) | ✅ PASS | `cambiarCantidad()` con botones grandes |
| Eliminar del carrito | ✅ PASS | `eliminarDelCarrito()` con confirmación |
| Persistencia en localStorage | ✅ PASS | `guardarCarrito()` / `cargarCarrito()` |
| Contador en navbar | ✅ PASS | Se actualiza con animación |
| Total calculado | ✅ PASS | Suma correcta de productos |

---

### 3. Checkout abre WhatsApp — ⚠️ PASS CON OBSERVACIONES

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Abre WhatsApp | ✅ PASS | `window.open(whatsappURL, '_blank')` |
| Mensaje con productos | ✅ PASS | Lista productos, cantidades y total |
| Datos del cliente | ✅ PASS | Nombre, teléfono, dirección, notas |
| Validación de teléfono | ✅ PASS | Valida formato colombiano (10 dígitos) |
| **Número de WhatsApp** | ❌ **INCONSISTENTE** | Usa `573001234567` por defecto, pero el footer usa `573128439577` |
| **Formato de precio en mensaje** | ❌ **INCONSISTENTE** | Usa `.toFixed(2)` → `$20000.00` en vez de `$20.000` |

**Problema:** El número de WhatsApp por defecto en el checkout (`573001234567`) es diferente al del footer (`573128439577`). Si el admin no configura el número, los pedidos van a un número equivocado.

---

### 4. Filtros funcionan — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Botones de filtro | ✅ PASS | Todos, Hidratantes, Corporales, Facial, Antiedad, Perfume |
| Filtrar por categoría | ✅ PASS | `data-filter` coincide con `categoria` del producto |
| Estado visual activo | ✅ PASS | Clase `active` al botón seleccionado |
| Combinar con búsqueda | ✅ PASS | Filtros y búsqueda trabajan juntos |

---

### 5. Buscador funciona — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Búsqueda en tiempo real | ✅ PASS | Evento `input` sin botón |
| Busca en nombre y descripción | ✅ PASS | `includes()` en ambos campos |
| No distingue mayúsculas | ✅ PASS | Usa `.toLowerCase()` |
| Mensaje sin resultados | ✅ PASS | Muestra "No encontramos productos" |

---

### 6. Formulario de contacto abre WhatsApp — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Abre WhatsApp | ✅ PASS | Con nombre, teléfono y mensaje |
| Validación | ✅ PASS | Nombre y mensaje obligatorios |
| Limpia formulario | ✅ PASS | `contactForm.reset()` |

---

### 7. Responsive en móvil — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Menú hamburguesa | ✅ PASS | Toggle con clase `active` |
| Carrito sidebar | ✅ PASS | Se abre como overlay |
| Botones grandes | ✅ PASS | Mínimo 50px de alto |
| Viewport | ✅ PASS | Meta viewport presente |

---

### 8. Errores en consola (Tienda) — ⚠️ PASS CON OBSERVACIONES

| Error | Severidad | Detalle |
|-------|-----------|---------|
| `console.warn` Firebase fallback | 🟡 LOW | Solo aparece si Firebase falla |
| `console.warn` localStorage | 🟡 LOW | Solo si localStorage falla |
| **Inconsistencia formato precio** | 🟠 MEDIUM | Tienda muestra `$20.000` pero WhatsApp muestra `$20000.00` |

---

## 🔧 VERIFICACIONES DEL ADMIN

### 1. Productos cargan desde Firebase — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Carga desde Firebase | ✅ PASS | `getDocs(productosCollection)` |
| Fallback a productos ejemplo | ✅ PASS | Si Firebase vacío, usa 5 productos ejemplo |
| Guardado automático | ✅ PASS | `guardarProductos()` al iniciar |

---

### 2. Se pueden agregar productos — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Formulario de agregar | ✅ PASS | Modal con todos los campos |
| Validación | ✅ PASS | Nombre, precio, categoría, stock |
| Guardado en Firebase | ✅ PASS | `setDoc()` con ID automático |
| Vista previa de foto | ✅ PASS | Se muestra antes de guardar |

---

### 3. Se pueden editar productos — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Cargar datos en formulario | ✅ PASS | `editarProducto()` llena todos los campos |
| Guardar cambios | ✅ PASS | Actualiza en array local y Firebase |
| Mantener foto existente | ✅ PASS | Si no se cambia, se conserva |

---

### 4. Se pueden eliminar productos — ❌ **FAIL CRÍTICO**

| Aspecto | Resultado | Detalle |
|---------|--------|---------|
| Confirmación de eliminación | ✅ PASS | Modal de confirmación |
| Eliminar del array local | ✅ PASS | `filter()` correctamente |
| **Eliminar de Firebase** | ❌ **FAIL** | **NO elimina el documento de Firebase** |

**🐛 BUG CRÍTICO:** La función `guardarProductos()` guarda TODOS los productos del array local en Firebase, pero NUNCA elimina los documentos que ya no están en el array. Cuando se recarga la página, los productos "eliminados" vuelven a aparecer desde Firebase.

**Solución requerida:** Antes de guardar, se deben eliminar de Firebase los documentos que no estén en el array local:
```javascript
// Eliminar productos que ya no existen en el array local
const existentes = await getDocs(productosCollection);
existentes.forEach((doc) => {
  if (!productos.find(p => String(p.id) === doc.id)) {
    deleteDoc(doc.ref);
  }
});
```

---

### 5. Se pueden subir fotos — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Zona de click para subir | ✅ PASS | `fotoUploadZone.click()` |
| Validación de tipo | ✅ PASS | Solo imágenes (`image/*`) |
| Validación de tamaño | ✅ PASS | Máximo 5MB |
| Vista previa | ✅ PASS | Muestra imagen antes de guardar |
| Convertir a base64 | ✅ PASS | `FileReader.readAsDataURL()` |
| Quitar foto | ✅ PASS | Botón para eliminar y volver a subir |

---

### 6. Configuración de WhatsApp funciona — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|--------|---------|
| Guardar en Firebase | ✅ PASS | `setDoc(doc(configCollection, 'tienda'), config)` |
| Cargar al iniciar | ✅ PASS | `getDoc()` correctamente |
| Validación | ✅ PASS | WhatsApp obligatorio |
| Aplicar a tienda | ✅ PASS | La tienda lee `nordiko_config` de localStorage |

**Nota:** La tienda lee la configuración de `localStorage`, pero el admin guarda en Firebase. Si el admin guarda la configuración pero la tienda no ha sido abierta después, no tendrá la configuración actualizada.

---

### 7. Categorías funcionan — ⚠️ PASS CON OBSERVACIONES

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Agregar categoría | ✅ PASS | Con nombre y código interno |
| Editar categoría | ✅ PASS | No permite cambiar el código (correcto) |
| Eliminar categoría | ✅ PASS | Con advertencia si tiene productos |
| Toggle activa/inactiva | ✅ PASS | Switch para mostrar/ocultar |
| **Categoría "perfume"** | ❌ **FALTA** | Las categorías default NO incluyen "perfume" |

**🐛 BUG:** El producto "L'Eau d'Issey Miyake" tiene categoría `"perfume"`, pero las categorías por defecto en el admin son: `hidratante`, `corporal`, `facial`, `ante-envejecimiento`. No se puede asignar la categoría "perfume" a ningún producto desde el admin.

---

### 8. Errores en consola (Admin) — ⚠️ PASS CON OBSERVACIONES

| Error/Warning | Severidad | Detalle |
|---------------|-----------|---------|
| `console.error` carga productos | 🟡 LOW | Solo si Firebase falla |
| **Dashboard con datos falsos** | 🟠 MEDIUM | Los pedidos son hardcodeados, no de Firebase |
| **`formatMoneda` inconsistente** | 🟠 MEDIUM | Usa `$25.99` (formato inglés) vs `$20.000` en tienda |
| **Categorías sin "perfume"** | 🔴 HIGH | No se puede asignar categoría al producto principal |

---

## 🐛 BUGS ENCONTRADOS

### Críticos (Impiden funcionamiento correcto)

| # | Bug | Ubicación | Impacto |
|---|-----|-----------|---------|
| 1 | **Eliminar productos no funciona** | `admin.js` → `guardarProductos()` | Los productos eliminados vuelven al recargar |
| 2 | **Categoría "perfume" no existe** | `admin.js` → `config.categorias` | No se puede asignar categoría al producto L'Eau d'Issey |

### Medios (Inconsistencias)

| # | Bug | Ubicación | Impacto |
|---|-----|-----------|---------|
| 3 | **Números de WhatsApp diferentes** | `app.js` checkout vs footer | Pedidos pueden ir a número equivocado |
| 4 | **Formato de precio inconsistente** | `app.js` vs `admin.js` | Tienda: `$20.000` / Admin: `$25.99` / WhatsApp: `$20000.00` |
| 5 | **Dashboard con datos falsos** | `admin.js` → `pedidos` | Estadísticas no reales |
| 6 | **Configuración no sincronizada** | Admin guarda en Firebase, tienda lee de localStorage | Tienda puede tener configuración desactualizada |

### Bajos (Mejoras)

| # | Bug | Ubicación | Impacto |
|---|-----|-----------|---------|
| 7 | Productos default incluyen 12 productos que quizás no deberían estar | `app.js` → `productosDefault` | Si Firebase vacío, muestra productos no deseados |
| 8 | `addDoc` y `updateDoc` importados pero no usados | `firebase-config.js` | Código muerto |

---

## 📊 PRUEBAS REALIZADAS

### Tienda (https://nordiko-tienda.vercel.app)

| Prueba | Método | Resultado |
|--------|--------|-----------|
| Carga de productos | Fetch de página + revisión código | ✅ Carga desde Firebase |
| Estructura HTML | Fetch de página | ✅ Todas las secciones presentes |
| Carrito (agregar/modificar/eliminar) | Revisión código | ✅ Lógica correcta |
| Checkout WhatsApp | Revisión código | ⚠️ Número inconsistente |
| Filtros | Revisión código | ✅ Funcional |
| Buscador | Revisión código | ✅ Funcional |
| Contacto WhatsApp | Revisión código | ✅ Funcional |
| Responsive | Revisión CSS + meta viewport | ✅ Móvil primero |

### Admin (https://nordiko-tienda.vercel.app/admin)

| Prueba | Método | Resultado |
|--------|--------|-----------|
| Carga de productos | Fetch de página + revisión código | ✅ Carga desde Firebase |
| Estructura HTML | Fetch de página | ✅ Todas las secciones presentes |
| Agregar producto | Revisión código | ✅ Funcional |
| Editar producto | Revisión código | ✅ Funcional |
| Eliminar producto | Revisión código | ❌ No elimina de Firebase |
| Subir fotos | Revisión código | ✅ Funcional |
| Configuración WhatsApp | Revisión código | ✅ Funcional |
| Categorías | Revisión código | ⚠️ Falta "perfume" |

---

## 💡 RECOMENDACIONES

### Prioridad Alta (Corregir antes de producción)

1. **Corregir eliminación de productos en Firebase**
   - Implementar limpieza de documentos huérfanos antes de guardar
   - Usar `deleteDoc()` para productos eliminados

2. **Agregar categoría "perfume" a las categorías por defecto**
   - Agregar `{ id: 'perfume', nombre: 'Perfume', activa: true }` al array de categorías

3. **Unificar número de WhatsApp**
   - Usar un solo número en toda la aplicación
   - Configurar por defecto el número real del negocio

4. **Sincronizar configuración admin → tienda**
   - La tienda debería cargar la configuración de Firebase al iniciar
   - O sincronizar localStorage con Firebase cuando se abre la tienda

### Prioridad Media (Mejorar experiencia)

5. **Unificar formato de precios**
   - Usar formato colombiano (`$20.000`) en toda la aplicación
   - Incluir el mensaje de WhatsApp

6. **Implementar dashboard con datos reales**
   - Crear colección de pedidos en Firebase
   - Cargar pedidos reales en el dashboard

7. **Limpiar productos default**
   - Dejar solo L'Eau d'Issey Miyake como producto default
   - O remover el fallback y mostrar mensaje de "no hay productos"

### Prioridad Baja (Optimizaciones)

8. **Remover imports no usados** (`addDoc`, `updateDoc`)
9. **Agregar loading states** mientras carga Firebase
10. **Implementar tests automatizados** para el flujo de compra

---

## ✅ CONCLUSIÓN

La tienda NØRDIKO es **funcional para ventas** pero requiere correcciones antes de considerarse producción-ready. El flujo principal (ver productos → agregar al carrito → checkout por WhatsApp) funciona correctamente.

El panel de administración tiene **bugs críticos** que impiden la gestión correcta de productos (especialmente la eliminación). Se recomienda corregir los bugs de alta prioridad antes de continuar operando.

**Estado general:** 🟡 **PARCIALMENTE LISTO** — Funciona para ventas, pero el admin necesita correcciones críticas.

---

*Documento generado el 28 de septiembre de 2026*
