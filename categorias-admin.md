# 📁 Categorías - Panel de Administración NØRDIKO

## Resumen de cambios

Se agregó una sección completa de **Categorías** al panel de administración (`admin/index.html`) para que el dueño pueda gestionar las categorías de productos de forma sencilla.

---

## ✅ Lo que se implementó

### 1. Menú lateral
- Nuevo item **📁 Categorías** entre "Productos" y "Ajustes"
- Badge con el número de categorías

### 2. Sección de Categorías
- **Lista de categorías** en tarjetas visuales con:
  - Nombre de la categoría (editable con botón ✏️)
  - Código interno (visible, inmutable al editar para no romper productos)
  - Badge de estado: "Activa" / "Oculta"
  - Toggle switch grande para activar/desactivar
  - Botón de eliminar (con confirmación)
- **Formulario para agregar** categoría con:
  - Nombre (lo que ven los clientes)
  - Código interno (para organizar productos)
  - Validación automática del código (minúsculas, sin espacios)
- **Botón "GUARDAR CATEGORÍA"** gigante

### 3. Select dinámico en formulario de producto
- El campo "Categoría" del formulario de producto ahora es un **SELECT** que se llena automáticamente con las categorías creadas
- Se actualiza solo al agregar, editar o eliminar categorías

### 4. Preview en tienda
- Banner que muestra cómo se verán los botones de filtro en la tienda
- Se actualiza en tiempo real al activar/desactivar categorías

### 5. Confirmación antes de eliminar
- Diálogo de confirmación claro para eliminar categorías
- Advierte si hay productos usando esa categoría

---

## 🎨 Diseño

- Botones grandes (50px+) fáciles de tocar
- Tarjetas visuales con iconos
- Toggle switch intuitivo
- Todo en español simple
- Colores dorados y verdes (identidad NØRDIKO)

---

## 🔧 Técnica

| Aspecto | Detalle |
|---------|---------|
| **Almacenamiento** | `localStorage` → clave `nordiko_config` → propiedad `categorias` |
| **Estructura** | `{ id: string, nombre: string, activa: boolean }` |
| **Seguridad** | `escapeHtml()` aplicado a todo contenido dinámico |
| **Compatibilidad** | La tienda (`index.html`) lee las mismas categorías automáticamente |

---

## 📋 Categorías por defecto

| Código | Nombre | Estado |
|--------|--------|--------|
| `hidratante` | Hidratante | ✅ Activa |
| `corporal` | Corporal | ✅ Activa |
| `facial` | Facial | ✅ Activa |
| `ante-envejecimiento` | Antiedad | ✅ Activa |

---

## 🔄 Cómo funciona

1. El dueño abre el panel de administración
2. Va a **Categorías** en el menú lateral
3. Ahí puede:
   - **Agregar** nuevas categorías (nombre + código)
   - **Activar/Desactivar** con el toggle (aparece o no en la tienda)
   - **Eliminar** si ya no la necesita
4. Las categorías activas aparecen automáticamente como filtros en la tienda

---

## 📁 Archivo modificado

- `admin/index.html` - Panel de administración

No se modificó la tienda (`index.html`) porque ya tenía la lógica para leer las categorías desde `localStorage`.
