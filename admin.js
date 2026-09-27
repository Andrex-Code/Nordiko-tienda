/**
 * ============================================================
 *  PANEL DE ADMINISTRACIÓN - TIENDA DE LOCIONES
 * ============================================================
 *  Lógica completa del panel de administración:
 *  - CRUD de productos con localStorage
 *  - Dashboard con estadísticas
 *  - Buscador y filtros en tiempo real
 *  - Importar / Exportar JSON
 *  - Configuración de la tienda
 *  - Notificaciones toast
 * ============================================================
 */

'use strict';

/* ============================================================
 *  CONSTANTES Y CONFIGURACIÓN
 * ============================================================ */

const STORAGE_KEY_PRODUCTOS = 'lotionShop_productos';
const STORAGE_KEY_CONFIG = 'lotionShop_config';

/** Categorías disponibles para los productos */
const CATEGORIAS = [
  'hidratante',
  'corporal',
  'facial',
  'ante-envejecimiento'
];

/** Opciones de badge para los productos */
const BADGES = [
  { valor: '', texto: 'Sin badge' },
  { valor: 'bestseller', texto: 'Bestseller' },
  { valor: 'new', texto: 'Nuevo' },
  { valor: 'sale', texto: 'Oferta' }
];

/** Umbral de stock bajo */
const STOCK_BAJO_UMBRAL = 5;

/* ============================================================
 *  PRODUCTOS POR DEFECTO
 * ============================================================ */

const PRODUCTOS_DEFAULT = [
  {
    id: 1,
    nombre: 'Loción de Rosas',
    descripcion: 'Hidratante corporal con extracto de rosas naturales.',
    precio: 350,
    precioAnterior: null,
    categoria: 'hidratante',
    stock: 25,
    imagen: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    icono: '🌹',
    badge: 'bestseller'
  },
  {
    id: 2,
    nombre: 'Loción de Lavanda',
    descripcion: 'Corporal relajante con aceite esencial de lavanda.',
    precio: 320,
    precioAnterior: null,
    categoria: 'corporal',
    stock: 18,
    imagen: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
    icono: '💜',
    badge: ''
  },
  {
    id: 3,
    nombre: 'Sérum Facial Vitamina C',
    descripcion: 'Sérum facial iluminador con vitamina C concentrada.',
    precio: 480,
    precioAnterior: null,
    categoria: 'facial',
    stock: 12,
    imagen: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
    icono: '🍊',
    badge: 'new'
  },
  {
    id: 4,
    nombre: 'Loción Antiedad Colágeno',
    descripcion: 'Tratamiento antienvejecimiento con colágeno hidrolizado.',
    precio: 550,
    precioAnterior: 650,
    categoria: 'ante-envejecimiento',
    stock: 8,
    imagen: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=400',
    icono: '✨',
    badge: 'sale'
  },
  {
    id: 5,
    nombre: 'Loción de Aloe Vera',
    descripcion: 'Hidratante natural con aloe vera puro.',
    precio: 290,
    precioAnterior: null,
    categoria: 'hidratante',
    stock: 30,
    imagen: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400',
    icono: '🌿',
    badge: ''
  },
  {
    id: 6,
    nombre: 'Loción Corporal de Coco',
    descripcion: 'Corporal nutritiva con aceite de coco orgánico.',
    precio: 340,
    precioAnterior: null,
    categoria: 'corporal',
    stock: 22,
    imagen: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
    icono: '🥥',
    badge: ''
  },
  {
    id: 7,
    nombre: 'Crema Facial Retinol',
    descripcion: 'Crema facial renovadora con retinol.',
    precio: 620,
    precioAnterior: null,
    categoria: 'facial',
    stock: 6,
    imagen: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400',
    icono: '🌙',
    badge: 'new'
  },
  {
    id: 8,
    nombre: 'Loción Reafirmante Q10',
    descripcion: 'Reafirmante con coenzima Q10 para piel tersa.',
    precio: 580,
    precioAnterior: 700,
    categoria: 'ante-envejecimiento',
    stock: 4,
    imagen: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400',
    icono: '💎',
    badge: 'sale'
  },
  {
    id: 9,
    nombre: 'Loción de Manzanilla',
    descripcion: 'Hidratante suave con extracto de manzanilla.',
    precio: 310,
    precioAnterior: null,
    categoria: 'hidratante',
    stock: 20,
    imagen: 'https://images.unsplash.com/photo-1615486363973-f79eea4a4b1b?w=400',
    icono: '🌼',
    badge: ''
  },
  {
    id: 10,
    nombre: 'Loción Corporal de Karité',
    descripcion: 'Corporal intensiva con manteca de karité.',
    precio: 360,
    precioAnterior: null,
    categoria: 'corporal',
    stock: 15,
    imagen: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400',
    icono: '🧈',
    badge: ''
  },
  {
    id: 11,
    nombre: 'Gel Facial Hialurónico',
    descripcion: 'Gel facial hidratante con ácido hialurónico.',
    precio: 450,
    precioAnterior: null,
    categoria: 'facial',
    stock: 10,
    imagen: 'https://images.unsplash.com/photo-1620756236308-65c3ef5d25f8?w=400',
    icono: '💧',
    badge: 'bestseller'
  },
  {
    id: 12,
    nombre: 'Loción Noche Regeneradora',
    descripcion: 'Tratamiento nocturno regenerador celular.',
    precio: 590,
    precioAnterior: null,
    categoria: 'ante-envejecimiento',
    stock: 7,
    imagen: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400',
    icono: '🌟',
    badge: ''
  }
];

/* ============================================================
 *  ESTADO GLOBAL
 * ============================================================ */

let productos = [];
let configTienda = {
  nombre: 'LotionShop',
  email: 'contacto@lotionshop.com',
  telefono: '+52 555 123 4567',
  direccion: 'Av. Reforma 123, CDMX'
};

/** Filtros actuales de la tabla */
let filtros = {
  busqueda: '',
  categoria: 'todas'
};

/** ID del producto que se está editando (null = ninguno) */
let editandoId = null;

/* ============================================================
 *  UTILIDADES
 * ============================================================ */

/**
 * Genera un ID único para un nuevo producto.
 * Usa Date.now() combinado con el máximo existente para garantizar unicidad.
 * @returns {number} ID único
 */
function generarId() {
  try {
    const maxId = productos.reduce((max, p) => Math.max(max, p.id), 0);
    return Math.max(Date.now(), maxId + 1);
  } catch (error) {
    console.error('Error al generar ID:', error);
    return Date.now();
  }
}

/**
 * Formatea un número como moneda mexicana.
 * @param {number} valor - Valor a formatear
 * @returns {string} Valor formateado (ej. "$350.00")
 */
function formatMoneda(valor) {
  try {
    return '$' + Number(valor).toFixed(2);
  } catch (error) {
    return '$0.00';
  }
}

/**
 * Escapa texto para prevenir XSS al insertar en HTML.
 * @param {string} texto - Texto a escapar
 * @returns {string} Texto seguro
 */
function escapeHtml(texto) {
  if (texto === null || texto === undefined) return '';
  const div = document.createElement('div');
  div.textContent = String(texto);
  return div.innerHTML;
}

/**
 * Obtiene el texto legible de un badge.
 * @param {string} badge - Valor del badge
 * @returns {string} Texto descriptivo
 */
function badgeTexto(badge) {
  const encontrado = BADGES.find(b => b.valor === badge);
  return encontrado ? encontrado.texto : '';
}

/**
 * Obtiene la clase CSS para un badge.
 * @param {string} badge - Valor del badge
 * @returns {string} Clase CSS
 */
function badgeClase(badge) {
  const clases = {
    bestseller: 'badge-bestseller',
    new: 'badge-new',
    sale: 'badge-sale'
  };
  return clases[badge] || '';
}

/* ============================================================
 *  SISTEMA DE NOTIFICACIONES TOAST
 * ============================================================ */

/**
 * Muestra una notificación toast en pantalla.
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo: 'success', 'error', 'info', 'warning'
 * @param {number} duracion - Duración en ms (default 3000)
 */
function mostrarToast(mensaje, tipo = 'success', duracion = 3000) {
  try {
    // Buscar o crear el contenedor de toasts
    let contenedor = document.getElementById('toast-container');
    if (!contenedor) {
      contenedor = document.createElement('div');
      contenedor.id = 'toast-container';
      contenedor.className = 'toast-container';
      document.body.appendChild(contenedor);
    }

    // Crear el toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `
      <span class="toast-icon">${obtenerIconoToast(tipo)}</span>
      <span class="toast-mensaje">${escapeHtml(mensaje)}</span>
      <button class="toast-cerrar" onclick="this.parentElement.remove()">&times;</button>
    `;

    contenedor.appendChild(toast);

    // Animación de entrada
    setTimeout(() => toast.classList.add('toast-visible'), 10);

    // Auto-cierre
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, duracion);
  } catch (error) {
    console.error('Error al mostrar toast:', error);
  }
}

/**
 * Obtiene el emoji icono según el tipo de toast.
 * @param {string} tipo - Tipo de toast
 * @returns {string} Emoji
 */
function obtenerIconoToast(tipo) {
  const iconos = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };
  return iconos[tipo] || 'ℹ️';
}

/* ============================================================
 *  GESTIÓN DE PRODUCTOS - CRUD
 * ============================================================ */

/**
 * Carga los productos desde localStorage.
 * Si no existen, usa los productos por defecto.
 */
function cargarProductos() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY_PRODUCTOS);
    if (datos) {
      productos = JSON.parse(datos);
      // Validar que sea un array
      if (!Array.isArray(productos)) {
        productos = [...PRODUCTOS_DEFAULT];
      }
    } else {
      productos = [...PRODUCTOS_DEFAULT];
      guardarProductos();
    }
  } catch (error) {
    console.error('Error al cargar productos:', error);
    productos = [...PRODUCTOS_DEFAULT];
    mostrarToast('Error al cargar productos. Se usaron datos por defecto.', 'error');
  }
}

/**
 * Guarda todos los productos en localStorage.
 * @returns {boolean} true si se guardó correctamente
 */
function guardarProductos() {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productos));
    return true;
  } catch (error) {
    console.error('Error al guardar productos:', error);
    mostrarToast('Error al guardar los productos.', 'error');
    return false;
  }
}

/**
 * Agrega un nuevo producto al inventario.
 * @param {Object} datos - Datos del producto
 * @returns {boolean} true si se agregó correctamente
 */
function agregarProducto(datos) {
  try {
    // Validar datos
    const validacion = validarProducto(datos);
    if (!validacion.valido) {
      mostrarToast(validacion.mensaje, 'error');
      return false;
    }

    const nuevoProducto = {
      id: generarId(),
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      precioAnterior: datos.precioAnterior ? Number(datos.precioAnterior) : null,
      categoria: datos.categoria,
      stock: Number(datos.stock),
      imagen: datos.imagen.trim(),
      icono: datos.icono,
      badge: datos.badge
    };

    productos.push(nuevoProducto);
    guardarProductos();
    mostrarToast(`Producto "${nuevoProducto.nombre}" agregado correctamente.`, 'success');
    return true;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    mostrarToast('Error al agregar el producto.', 'error');
    return false;
  }
}

/**
 * Actualiza un producto existente.
 * @param {number} id - ID del producto a actualizar
 * @param {Object} datos - Nuevos datos
 * @returns {boolean} true si se actualizó correctamente
 */
function actualizarProducto(id, datos) {
  try {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) {
      mostrarToast('Producto no encontrado.', 'error');
      return false;
    }

    // Validar datos
    const validacion = validarProducto(datos);
    if (!validacion.valido) {
      mostrarToast(validacion.mensaje, 'error');
      return false;
    }

    productos[index] = {
      ...productos[index],
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      precioAnterior: datos.precioAnterior ? Number(datos.precioAnterior) : null,
      categoria: datos.categoria,
      stock: Number(datos.stock),
      imagen: datos.imagen.trim(),
      icono: datos.icono,
      badge: datos.badge
    };

    guardarProductos();
    mostrarToast(`Producto "${datos.nombre}" actualizado correctamente.`, 'success');
    return true;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    mostrarToast('Error al actualizar el producto.', 'error');
    return false;
  }
}

/**
 * Elimina un producto del inventario.
 * @param {number} id - ID del producto a eliminar
 * @returns {boolean} true si se eliminó correctamente
 */
function eliminarProducto(id) {
  try {
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) {
      mostrarToast('Producto no encontrado.', 'error');
      return false;
    }

    const nombre = productos[index].nombre;
    productos.splice(index, 1);
    guardarProductos();
    mostrarToast(`Producto "${nombre}" eliminado correctamente.`, 'success');
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    mostrarToast('Error al eliminar el producto.', 'error');
    return false;
  }
}

/**
 * Busca un producto por su ID.
 * @param {number} id - ID del producto
 * @returns {Object|null} Producto encontrado o null
 */
function obtenerProducto(id) {
  try {
    return productos.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return null;
  }
}

/* ============================================================
 *  VALIDACIÓN DE FORMULARIO
 * ============================================================ */

/**
 * Valida los datos de un producto antes de guardar.
 * @param {Object} datos - Datos a validar
 * @returns {Object} { valido: boolean, mensaje: string }
 */
function validarProducto(datos) {
  try {
    // Nombre requerido
    if (!datos.nombre || !datos.nombre.trim()) {
      return { valido: false, mensaje: 'El nombre del producto es obligatorio.' };
    }

    // Nombre mínimo 3 caracteres
    if (datos.nombre.trim().length < 3) {
      return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres.' };
    }

    // Precio requerido y positivo
    if (datos.precio === '' || datos.precio === null || datos.precio === undefined) {
      return { valido: false, mensaje: 'El precio es obligatorio.' };
    }

    const precio = Number(datos.precio);
    if (isNaN(precio) || precio <= 0) {
      return { valido: false, mensaje: 'El precio debe ser un número positivo.' };
    }

    // Precio anterior (opcional, pero si existe debe ser válido)
    if (datos.precioAnterior && datos.precioAnterior !== '') {
      const precioAnt = Number(datos.precioAnterior);
      if (isNaN(precioAnt) || precioAnt <= 0) {
        return { valido: false, mensaje: 'El precio anterior debe ser un número positivo.' };
      }
      if (precioAnt <= precio) {
        return { valido: false, mensaje: 'El precio anterior debe ser mayor al precio actual.' };
      }
    }

    // Categoría requerida
    if (!datos.categoria) {
      return { valido: false, mensaje: 'La categoría es obligatoria.' };
    }

    // Stock requerido y no negativo
    if (datos.stock === '' || datos.stock === null || datos.stock === undefined) {
      return { valido: false, mensaje: 'El stock es obligatorio.' };
    }

    const stock = Number(datos.stock);
    if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
      return { valido: false, mensaje: 'El stock debe ser un número entero no negativo.' };
    }

    // Descripción requerida
    if (!datos.descripcion || !datos.descripcion.trim()) {
      return { valido: false, mensaje: 'La descripción es obligatoria.' };
    }

    return { valido: true, mensaje: '' };
  } catch (error) {
    console.error('Error en validación:', error);
    return { valido: false, mensaje: 'Error al validar los datos.' };
  }
}

/* ============================================================
 *  RENDERIZADO DE LA TABLA DE PRODUCTOS
 * ============================================================ */

/**
 * Obtiene los productos filtrados según los filtros actuales.
 * @returns {Array} Productos filtrados
 */
function obtenerProductosFiltrados() {
  try {
    return productos.filter(p => {
      // Filtro por búsqueda (nombre o descripción)
      const busqueda = filtros.busqueda.toLowerCase();
      const coincideBusqueda = !busqueda ||
        p.nombre.toLowerCase().includes(busqueda) ||
        p.descripcion.toLowerCase().includes(busqueda);

      // Filtro por categoría
      const coincideCategoria = filtros.categoria === 'todas' ||
        p.categoria === filtros.categoria;

      return coincideBusqueda && coincideCategoria;
    });
  } catch (error) {
    console.error('Error al filtrar productos:', error);
    return [];
  }
}

/**
 * Renderiza la tabla de productos en el DOM.
 */
function renderizarTabla() {
  try {
    const tbody = document.getElementById('tabla-productos-body');
    if (!tbody) return;

    const productosFiltrados = obtenerProductosFiltrados();

    if (productosFiltrados.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="tabla-vacia">
            <div class="tabla-vacia-contenido">
              <span class="tabla-vacia-icono">📦</span>
              <p>No se encontraron productos</p>
              <p class="tabla-vacia-sub">Intenta cambiar los filtros o agregar un nuevo producto</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = productosFiltrados.map(p => {
      const esStockBajo = p.stock <= STOCK_BAJO_UMBRAL;
      const tieneOferta = p.precioAnterior && p.precioAnterior > p.precio;

      return `
        <tr class="${esStockBajo ? 'fila-stock-bajo' : ''}">
          <td class="col-icono">
            <span class="producto-icono">${escapeHtml(p.icono)}</span>
          </td>
          <td class="col-nombre">
            <strong>${escapeHtml(p.nombre)}</strong>
            ${p.badge ? `<span class="badge ${badgeClase(p.badge)}">${badgeTexto(p.badge)}</span>` : ''}
          </td>
          <td class="col-categoria">
            <span class="categoria-tag">${escapeHtml(p.categoria)}</span>
          </td>
          <td class="col-precio">
            <span class="precio-actual">${formatMoneda(p.precio)}</span>
            ${tieneOferta ? `<span class="precio-anterior">${formatMoneda(p.precioAnterior)}</span>` : ''}
          </td>
          <td class="col-stock">
            <span class="stock-badge ${esStockBajo ? 'stock-bajo' : 'stock-ok'}">
              ${p.stock} uds
            </span>
          </td>
          <td class="col-estado">
            ${tieneOferta ? '<span class="estado-oferta">🏷️ Oferta</span>' : '<span class="estado-normal">Normal</span>'}
          </td>
          <td class="col-acciones">
            <button class="btn-accion btn-editar" onclick="abrirModalEditar(${p.id})" title="Editar">
              ✏️
            </button>
            <button class="btn-accion btn-eliminar" onclick="confirmarEliminar(${p.id})" title="Eliminar">
              🗑️
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (error) {
    console.error('Error al renderizar tabla:', error);
  }
}

/* ============================================================
 *  DASHBOARD - ESTADÍSTICAS
 * ============================================================ */

/**
 * Calcula y renderiza las estadísticas del dashboard.
 */
function renderizarDashboard() {
  try {
    // Total de productos
    const totalProductos = productos.length;

    // Valor del inventario (precio * stock de cada producto)
    const valorInventario = productos.reduce((total, p) => {
      return total + (p.precio * p.stock);
    }, 0);

    // Productos con stock bajo
    const stockBajo = productos.filter(p => p.stock <= STOCK_BAJO_UMBRAL).length;

    // Productos en oferta
    const enOferta = productos.filter(p => p.precioAnterior && p.precioAnterior > p.precio).length;

    // Actualizar el DOM
    const el = id => document.getElementById(id);
    if (el('stat-total')) el('stat-total').textContent = totalProductos;
    if (el('stat-valor')) el('stat-valor').textContent = formatMoneda(valorInventario);
    if (el('stat-stock-bajo')) el('stat-stock-bajo').textContent = stockBajo;
    if (el('stat-ofertas')) el('stat-ofertas').textContent = enOferta;
  } catch (error) {
    console.error('Error al renderizar dashboard:', error);
  }
}

/* ============================================================
 *  MODAL - AGREGAR / EDITAR PRODUCTO
 * ============================================================ */

/**
 * Abre el modal para agregar un nuevo producto.
 */
function abrirModalAgregar() {
  try {
    editandoId = null;
    document.getElementById('modal-titulo').textContent = 'Agregar Nuevo Producto';
    document.getElementById('form-producto').reset();
    document.getElementById('producto-id').value = '';
    document.getElementById('modal-producto').classList.add('modal-visible');
    document.getElementById('overlay-modal').classList.add('overlay-visible');
  } catch (error) {
    console.error('Error al abrir modal de agregar:', error);
  }
}

/**
 * Abre el modal para editar un producto existente.
 * @param {number} id - ID del producto a editar
 */
function abrirModalEditar(id) {
  try {
    const producto = obtenerProducto(id);
    if (!producto) {
      mostrarToast('Producto no encontrado.', 'error');
      return;
    }

    editandoId = id;
    document.getElementById('modal-titulo').textContent = 'Editar Producto';
    document.getElementById('producto-id').value = producto.id;
    document.getElementById('producto-nombre').value = producto.nombre;
    document.getElementById('producto-descripcion').value = producto.descripcion;
    document.getElementById('producto-precio').value = producto.precio;
    document.getElementById('producto-precio-anterior').value = producto.precioAnterior || '';
    document.getElementById('producto-categoria').value = producto.categoria;
    document.getElementById('producto-stock').value = producto.stock;
    document.getElementById('producto-imagen').value = producto.imagen;
    document.getElementById('producto-icono').value = producto.icono;
    document.getElementById('producto-badge').value = producto.badge;

    document.getElementById('modal-producto').classList.add('modal-visible');
    document.getElementById('overlay-modal').classList.add('overlay-visible');
  } catch (error) {
    console.error('Error al abrir modal de editar:', error);
  }
}

/**
 * Cierra el modal de producto.
 */
function cerrarModal() {
  try {
    document.getElementById('modal-producto').classList.remove('modal-visible');
    document.getElementById('overlay-modal').classList.remove('overlay-visible');
    editandoId = null;
  } catch (error) {
    console.error('Error al cerrar modal:', error);
  }
}

/**
 * Maneja el envío del formulario de producto (agregar o editar).
 * @param {Event} event - Evento del formulario
 */
function manejarSubmitProducto(event) {
  try {
    event.preventDefault();

    const datos = {
      nombre: document.getElementById('producto-nombre').value,
      descripcion: document.getElementById('producto-descripcion').value,
      precio: document.getElementById('producto-precio').value,
      precioAnterior: document.getElementById('producto-precio-anterior').value,
      categoria: document.getElementById('producto-categoria').value,
      stock: document.getElementById('producto-stock').value,
      imagen: document.getElementById('producto-imagen').value,
      icono: document.getElementById('producto-icono').value,
      badge: document.getElementById('producto-badge').value
    };

    let exito;
    if (editandoId) {
      exito = actualizarProducto(editandoId, datos);
    } else {
      exito = agregarProducto(datos);
    }

    if (exito) {
      cerrarModal();
      renderizarTabla();
      renderizarDashboard();
    }
  } catch (error) {
    console.error('Error en submit de producto:', error);
    mostrarToast('Error al procesar el formulario.', 'error');
  }
}

/* ============================================================
 *  CONFIRMACIÓN DE ELIMINACIÓN
 * ============================================================ */

/**
 * Muestra un diálogo de confirmación antes de eliminar un producto.
 * @param {number} id - ID del producto a eliminar
 */
function confirmarEliminar(id) {
  try {
    const producto = obtenerProducto(id);
    if (!producto) {
      mostrarToast('Producto no encontrado.', 'error');
      return;
    }

    // Crear modal de confirmación personalizado
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmado) {
      if (eliminarProducto(id)) {
        renderizarTabla();
        renderizarDashboard();
      }
    }
  } catch (error) {
    console.error('Error al confirmar eliminación:', error);
    mostrarToast('Error al eliminar el producto.', 'error');
  }
}

/* ============================================================
 *  BUSCADOR Y FILTROS
 * ============================================================ */

/**
 * Maneja la entrada del buscador en tiempo real.
 * @param {Event} event - Evento de input
 */
function manejarBusqueda(event) {
  try {
    filtros.busqueda = event.target.value;
    renderizarTabla();
  } catch (error) {
    console.error('Error en búsqueda:', error);
  }
}

/**
 * Maneja el cambio de filtro de categoría.
 * @param {Event} event - Evento de change
 */
function manejarFiltroCategoria(event) {
  try {
    filtros.categoria = event.target.value;
    renderizarTabla();
  } catch (error) {
    console.error('Error en filtro de categoría:', error);
  }
}

/**
 * Limpia todos los filtros y la búsqueda.
 */
function limpiarFiltros() {
  try {
    filtros.busqueda = '';
    filtros.categoria = 'todas';
    const inputBusqueda = document.getElementById('buscador-productos');
    const selectCategoria = document.getElementById('filtro-categoria');
    if (inputBusqueda) inputBusqueda.value = '';
    if (selectCategoria) selectCategoria.value = 'todas';
    renderizarTabla();
    mostrarToast('Filtros limpiados.', 'info');
  } catch (error) {
    console.error('Error al limpiar filtros:', error);
  }
}

/* ============================================================
 *  EXPORTAR / IMPORTAR JSON
 * ============================================================ */

/**
 * Exporta todos los productos a un archivo JSON descargable.
 */
function exportarJSON() {
  try {
    const datos = {
      fecha: new Date().toISOString(),
      total: productos.length,
      productos: productos
    };

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lotionshop_productos_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    mostrarToast('Productos exportados correctamente.', 'success');
  } catch (error) {
    console.error('Error al exportar JSON:', error);
    mostrarToast('Error al exportar los productos.', 'error');
  }
}

/**
 * Importa productos desde un archivo JSON.
 * @param {Event} event - Evento de cambio del input file
 */
function importarJSON(event) {
  try {
    const archivo = event.target.files[0];
    if (!archivo) return;

    // Validar extensión
    if (!archivo.name.endsWith('.json')) {
      mostrarToast('El archivo debe ser de tipo JSON.', 'error');
      return;
    }

    const lector = new FileReader();
    lector.onload = function(e) {
      try {
        const datos = JSON.parse(e.target.result);

        // Validar estructura
        if (!datos.productos || !Array.isArray(datos.productos)) {
          mostrarToast('El archivo no tiene el formato correcto.', 'error');
          return;
        }

        // Confirmar sobrescritura
        const confirmado = window.confirm(
          `Se importarán ${datos.productos.length} productos.\n\n¿Deseas reemplazar los productos actuales?`
        );

        if (!confirmado) return;

        // Validar cada producto antes de importar
        const productosValidos = datos.productos.filter(p => {
          return p.nombre && p.precio && p.categoria && p.stock !== undefined;
        });

        if (productosValidos.length === 0) {
          mostrarToast('No se encontraron productos válidos en el archivo.', 'error');
          return;
        }

        // Asignar IDs únicos a los productos importados
        productosValidos.forEach(p => {
          p.id = generarId();
        });

        productos = productosValidos;
        guardarProductos();
        renderizarTabla();
        renderizarDashboard();
        mostrarToast(`${productosValidos.length} productos importados correctamente.`, 'success');
      } catch (parseError) {
        console.error('Error al parsear JSON:', parseError);
        mostrarToast('El archivo JSON no es válido.', 'error');
      }
    };

    lector.onerror = function() {
      mostrarToast('Error al leer el archivo.', 'error');
    };

    lector.readAsText(archivo);

    // Limpiar el input para permitir re-importar el mismo archivo
    event.target.value = '';
  } catch (error) {
    console.error('Error al importar JSON:', error);
    mostrarToast('Error al importar los productos.', 'error');
  }
}

/* ============================================================
 *  CONFIGURACIÓN DE LA TIENDA
 * ============================================================ */

/**
 * Carga la configuración de la tienda desde localStorage.
 */
function cargarConfig() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (datos) {
      const config = JSON.parse(datos);
      if (config && typeof config === 'object') {
        configTienda = { ...configTienda, ...config };
      }
    }
  } catch (error) {
    console.error('Error al cargar configuración:', error);
  }
}

/**
 * Guarda la configuración de la tienda en localStorage.
 * @returns {boolean} true si se guardó correctamente
 */
function guardarConfig() {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(configTienda));
    return true;
  } catch (error) {
    console.error('Error al guardar configuración:', error);
    mostrarToast('Error al guardar la configuración.', 'error');
    return false;
  }
}

/**
 * Abre el modal de configuración de la tienda.
 */
function abrirModalConfig() {
  try {
    document.getElementById('config-nombre').value = configTienda.nombre;
    document.getElementById('config-email').value = configTienda.email;
    document.getElementById('config-telefono').value = configTienda.telefono;
    document.getElementById('config-direccion').value = configTienda.direccion;

    document.getElementById('modal-config').classList.add('modal-visible');
    document.getElementById('overlay-config').classList.add('overlay-visible');
  } catch (error) {
    console.error('Error al abrir modal de configuración:', error);
  }
}

/**
 * Cierra el modal de configuración.
 */
function cerrarModalConfig() {
  try {
    document.getElementById('modal-config').classList.remove('modal-visible');
    document.getElementById('overlay-config').classList.remove('overlay-visible');
  } catch (error) {
    console.error('Error al cerrar modal de configuración:', error);
  }
}

/**
 * Guarda la configuración de la tienda desde el formulario.
 * @param {Event} event - Evento del formulario
 */
function guardarConfigForm(event) {
  try {
    event.preventDefault();

    const nombre = document.getElementById('config-nombre').value.trim();
    const email = document.getElementById('config-email').value.trim();
    const telefono = document.getElementById('config-telefono').value.trim();
    const direccion = document.getElementById('config-direccion').value.trim();

    // Validaciones básicas
    if (!nombre) {
      mostrarToast('El nombre de la tienda es obligatorio.', 'error');
      return;
    }

    if (!email || !email.includes('@')) {
      mostrarToast('Ingresa un email válido.', 'error');
      return;
    }

    configTienda = { nombre, email, telefono, direccion };

    if (guardarConfig()) {
      cerrarModalConfig();
      mostrarToast('Configuración guardada correctamente.', 'success');
    }
  } catch (error) {
    console.error('Error al guardar configuración:', error);
    mostrarToast('Error al guardar la configuración.', 'error');
  }
}

/* ============================================================
 *  INICIALIZACIÓN
 * ============================================================ */

/**
 * Inicializa el panel de administración.
 * Se ejecuta cuando el DOM está listo.
 */
function initAdmin() {
  try {
    // Cargar datos
    cargarProductos();
    cargarConfig();

    // Renderizar vista inicial
    renderizarTabla();
    renderizarDashboard();

    // Event Listeners - Búsqueda y filtros
    const buscador = document.getElementById('buscador-productos');
    if (buscador) {
      buscador.addEventListener('input', manejarBusqueda);
    }

    const filtroCat = document.getElementById('filtro-categoria');
    if (filtroCat) {
      filtroCat.addEventListener('change', manejarFiltroCategoria);
    }

    // Event Listeners - Botones principales
    const btnAgregar = document.getElementById('btn-agregar');
    if (btnAgregar) {
      btnAgregar.addEventListener('click', abrirModalAgregar);
    }

    const btnExportar = document.getElementById('btn-exportar');
    if (btnExportar) {
      btnExportar.addEventListener('click', exportarJSON);
    }

    const btnImportar = document.getElementById('btn-importar');
    const inputImportar = document.getElementById('input-importar');
    if (btnImportar && inputImportar) {
      btnImportar.addEventListener('click', () => inputImportar.click());
      inputImportar.addEventListener('change', importarJSON);
    }

    const btnLimpiar = document.getElementById('btn-limpiar-filtros');
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', limpiarFiltros);
    }

    const btnConfig = document.getElementById('btn-config');
    if (btnConfig) {
      btnConfig.addEventListener('click', abrirModalConfig);
    }

    // Event Listeners - Formularios
    const formProducto = document.getElementById('form-producto');
    if (formProducto) {
      formProducto.addEventListener('submit', manejarSubmitProducto);
    }

    const formConfig = document.getElementById('form-config');
    if (formConfig) {
      formConfig.addEventListener('submit', guardarConfigForm);
    }

    // Event Listeners - Cerrar modales con overlay
    const overlayModal = document.getElementById('overlay-modal');
    if (overlayModal) {
      overlayModal.addEventListener('click', cerrarModal);
    }

    const overlayConfig = document.getElementById('overlay-config');
    if (overlayConfig) {
      overlayConfig.addEventListener('click', cerrarModalConfig);
    }

    // Event Listeners - Cerrar modales con botón
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    if (btnCerrarModal) {
      btnCerrarModal.addEventListener('click', cerrarModal);
    }

    const btnCerrarConfig = document.getElementById('btn-cerrar-config');
    if (btnCerrarConfig) {
      btnCerrarConfig.addEventListener('click', cerrarModalConfig);
    }

    // Event Listener - Cerrar modales con tecla Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        cerrarModal();
        cerrarModalConfig();
      }
    });

    console.log('Panel de administración inicializado correctamente.');
  } catch (error) {
    console.error('Error al inicializar el panel:', error);
    mostrarToast('Error al inicializar el panel de administración.', 'error');
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}
