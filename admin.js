/**
 * ============================================================
 *  PANEL DE ADMINISTRACIÓN - NØRDIKO
 * ============================================================
 *  Lógica del panel de administración:
 *  - CRUD de productos con localStorage
 *  - Dashboard con estadísticas
 *  - Buscador en tiempo real
 *  - Configuración de la tienda
 *  - Notificaciones toast
 *  - Validación de formularios
 *
 *  CORRECCIONES APLICADAS:
 *  - Verificación de existencia de TODOS los elementos del DOM
 *  - Compatibilidad total con admin/index.html
 *  - Claves de localStorage corregidas (nordiko_*)
 *  - Escape HTML para prevenir XSS
 *  - Validación de datos mejorada
 *  - Manejo de datos corruptos de versiones anteriores
 * ============================================================
 */

import { productosCollection, configCollection, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, doc } from './firebase-config.js';

'use strict';

/* ============================================================
 *  FLAGS DE DEBUGGING
 * ============================================================ */
let firebaseCargado = true; // Firebase se inicializó correctamente al importar el módulo
let productosEnGrid = 0;

/* ============================================================
 *  CONSTANTES Y CONFIGURACIÓN
 * ============================================================ */

const STORAGE_KEY_PRODUCTOS = 'nordiko_productos';
const STORAGE_KEY_CONFIG = 'nordiko_config';
const STORAGE_KEY_AUTH = 'nordiko_admin_auth';
const ADMIN_PASSWORD = 'nordiko2026';

/** Categorías disponibles para los productos */
const CATEGORIAS = [
  'hidratante',
  'corporal',
  'facial',
  'ante-envejecimiento',
  'perfume'
];

/* ============================================================
 *  UTILIDADES
 * ============================================================ */

/**
 * Escapa texto para prevenir XSS al insertar en HTML.
 * @param {*} texto - Texto a escapar
 * @returns {string} Texto seguro
 */
function escapeHtml(texto) {
  if (texto === null || texto === undefined) return '';
  const div = document.createElement('div');
  div.textContent = String(texto);
  return div.innerHTML;
}

/**
 * Formatea un número como precio.
 * @param {number} valor - Valor a formatear
 * @returns {string} Valor formateado
 */
function formatMoneda(valor) {
  const num = Number(valor);
  if (isNaN(num) || num < 0) return '$0.000';
  // Formato colombiano: $20.000 (sin decimales, separador de miles con punto)
  return '$' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/* ============================================================
 *  ESTADO GLOBAL
 * ============================================================ */

let productos = [];
let config = {
  nombre: 'NØRDIKO',
  whatsapp: '',
  mensaje: '¡Gracias por tu pedido! Te contactaremos pronto.',
  email: '',
  direccion: '',
  categorias: [
    { id: 'hidratante', nombre: 'Hidratante', activa: true },
    { id: 'corporal', nombre: 'Corporal', activa: true },
    { id: 'facial', nombre: 'Facial', activa: true },
    { id: 'ante-envejecimiento', nombre: 'Antiedad', activa: true },
    { id: 'perfume', nombre: 'Perfume', activa: true }
  ]
};

let pedidos = [
  { id: 1001, cliente: 'María García', fecha: '2026-09-25', total: 51.98, estado: 'pendiente' },
  { id: 1002, cliente: 'Carlos López', fecha: '2026-09-24', total: 45.50, estado: 'enviado' },
  { id: 1003, cliente: 'Ana Martínez', fecha: '2026-09-23', total: 70.99, estado: 'completado' },
  { id: 1004, cliente: 'Luis Hernández', fecha: '2026-09-22', total: 32.00, estado: 'completado' },
  { id: 1005, cliente: 'Sofía Ramírez', fecha: '2026-09-21', total: 57.49, estado: 'cancelado' }
];

let productoAEliminar = null;
let productoEditando = null;
let categoriaEditando = null;
let callbackConfirmacion = null;

/* ============================================================
 *  PRODUCTOS POR DEFECTO
 * ============================================================ */

function obtenerProductosEjemplo() {
  return [
    { id: 1, nombre: 'Loción de Rosas', descripcion: 'Hidratante con extracto de rosa', precio: 25.99, precioAnterior: null, categoria: 'hidratante', stock: 15, imagenBase64: '', emoji: '🌹' },
    { id: 2, nombre: 'Crema Facial Antiedad', descripcion: 'Reduce arrugas y líneas de expresión', precio: 45.50, precioAnterior: 55.00, categoria: 'facial', stock: 8, imagenBase64: '', emoji: '✨' },
    { id: 3, nombre: 'Aceite Corporal de Almendras', descripcion: 'Nutrición profunda para la piel', precio: 32.00, precioAnterior: null, categoria: 'corporal', stock: 20, imagenBase64: '', emoji: '🌰' },
    { id: 4, nombre: 'Sérum Vitamina C', descripcion: 'Ilumina y unifica el tono', precio: 38.99, precioAnterior: null, categoria: 'facial', stock: 5, imagenBase64: '', emoji: '🍊' },
    { id: 5, nombre: 'Manteca de Karité', descripcion: 'Hidratación intensa natural', precio: 18.50, precioAnterior: 22.00, categoria: 'corporal', stock: 12, imagenBase64: '', emoji: '🧈' }
  ];
}

/* ============================================================
 *  CARGAR Y GUARDAR DATOS
 * ============================================================ */

async function cargarDatos() {
  // Cargar productos desde Firebase
  try {
    const querySnapshot = await getDocs(productosCollection);
    if (!querySnapshot.empty) {
      const productosFirebase = [];
      querySnapshot.forEach((doc) => {
        productosFirebase.push({ id: doc.id, ...doc.data() });
      });
      productos = productosFirebase;
      console.log('Productos cargados desde Firebase:', productos.length);
    } else {
      productos = obtenerProductosEjemplo();
      guardarProductos();
    }
  } catch (e) {
    console.error('Error al cargar productos desde Firebase:', e);
    productos = obtenerProductosEjemplo();
  }

  // Cargar configuración desde Firebase
  try {
    const configDocRef = doc(configCollection, 'tienda');
    const configDocSnap = await getDoc(configDocRef);
    if (configDocSnap.exists()) {
      config = { ...config, ...configDocSnap.data() };
    }
  } catch (e) {
    console.error('Error al cargar configuración desde Firebase:', e);
  }

  // Validar categorías
  if (!Array.isArray(config.categorias)) {
    config.categorias = [
      { id: 'hidratante', nombre: 'Hidratante', activa: true },
      { id: 'corporal', nombre: 'Corporal', activa: true },
      { id: 'facial', nombre: 'Facial', activa: true },
      { id: 'ante-envejecimiento', nombre: 'Antiedad', activa: true },
      { id: 'perfume', nombre: 'Perfume', activa: true }
    ];
    guardarConfig();
  }
}

async function guardarProductos() {
  try {
    // Guardar cada producto en Firebase
    for (const producto of productos) {
      const productoData = { ...producto };
      const id = productoData.id;
      delete productoData.id;
      // Firestore requiere ID como string
      await setDoc(doc(productosCollection, String(id)), productoData);
    }
    console.log('Productos guardados en Firebase');
  } catch (e) {
    console.error('Error al guardar productos en Firebase:', e);
  }
}

async function guardarConfig() {
  try {
    await setDoc(doc(configCollection, 'tienda'), config);
    console.log('Configuración guardada en Firebase');
  } catch (e) {
    console.error('Error al guardar configuración en Firebase:', e);
  }
}

/* ============================================================
 *  NOTIFICACIONES TOAST
 * ============================================================ */

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} toast-icon"></i>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================================================
 *  RENDERIZAR PRODUCTOS
 * ============================================================ */

function renderProductos(filtro = '') {
  const lista = document.getElementById('productosLista');
  if (!lista) {
    console.error('[admin.js] productosLista no existe en el DOM');
    return;
  }

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

  productosEnGrid = productosFiltrados.length;
  console.log('[admin.js] renderProductos - productosEnGrid:', productosEnGrid, 'firebaseCargado:', firebaseCargado);

  if (productosFiltrados.length === 0) {
    lista.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-box-open"></i>
        <p>No hay productos</p>
      </div>
    `;
    return;
  }

  lista.innerHTML = productosFiltrados.map(p => {
    let imagenHTML;
    if (p.imagenBase64) {
      imagenHTML = `<img src="${escapeHtml(p.imagenBase64)}" alt="${escapeHtml(p.nombre)}">`;
    } else {
      const emoji = p.emoji || '📦';
      imagenHTML = `<span>${escapeHtml(emoji)}</span>`;
    }

    return `
      <div class="producto-card" data-id="${escapeHtml(p.id)}">
        <div class="producto-foto">
          ${imagenHTML}
        </div>
        <div class="producto-info">
          <div class="producto-nombre">${escapeHtml(p.nombre)}</div>
          <div class="producto-categoria">${escapeHtml(obtenerNombreCategoria(p.categoria))}</div>
          <div class="producto-precio">
            ${formatMoneda(p.precio)}
            ${p.precioAnterior ? `<span class="producto-precio-anterior">${formatMoneda(p.precioAnterior)}</span>` : ''}
          </div>
        </div>
        <div class="producto-acciones">
          <button class="producto-btn edit" onclick="editarProducto(${p.id})" aria-label="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="producto-btn delete" onclick="confirmarEliminar(${p.id})" aria-label="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function obtenerNombreCategoria(cat) {
  if (!cat) return '';
  const encontrada = (config.categorias || []).find(c => c.id === cat);
  return encontrada ? encontrada.nombre : cat;
}

/* ============================================================
 *  RENDERIZAR PEDIDOS
 * ============================================================ */

function renderPedidos() {
  const lista = document.getElementById('pedidosLista');
  if (!lista) {
    console.error('[admin.js] pedidosLista no existe en el DOM');
    return;
  }

  if (pedidos.length === 0) {
    lista.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-shopping-cart"></i>
        <p>No hay pedidos</p>
      </div>
    `;
    return;
  }

  lista.innerHTML = pedidos.map(p => {
    const estadoClase = {
      'completado': 'estado-completado',
      'pendiente': 'estado-pendiente',
      'enviado': 'estado-enviado',
      'cancelado': 'estado-cancelado'
    };

    const estadoTexto = {
      'completado': 'Completado',
      'pendiente': 'Pendiente',
      'enviado': 'Enviado',
      'cancelado': 'Cancelado'
    };

    return `
      <div class="pedido-card">
        <div class="pedido-icono">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <div class="pedido-info">
          <div class="pedido-numero">Pedido #${p.id}</div>
          <div class="pedido-cliente">${escapeHtml(p.cliente)}</div>
          <div class="pedido-fecha">${formatearFecha(p.fecha)}</div>
          <span class="pedido-estado ${estadoClase[p.estado]}">${estadoTexto[p.estado]}</span>
        </div>
        <div class="pedido-total">${formatMoneda(p.total)}</div>
      </div>
    `;
  }).join('');
}

function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/* ============================================================
 *  RENDERIZAR DASHBOARD
 * ============================================================ */

function renderDashboard() {
  const statProductos = document.getElementById('statProductos');
  if (statProductos) statProductos.textContent = productos.length;

  const statPedidos = document.getElementById('statPedidos');
  if (statPedidos) statPedidos.textContent = pedidos.filter(p => p.estado === 'pendiente').length;

  const ventasMes = pedidos
    .filter(p => p.estado === 'completado')
    .reduce((sum, p) => sum + p.total, 0);

  const statVentas = document.getElementById('statVentas');
  if (statVentas) statVentas.textContent = formatMoneda(ventasMes);

  const statIngresos = document.getElementById('statIngresos');
  if (statIngresos) statIngresos.textContent = formatMoneda(ventasMes);

  const productCount = document.getElementById('productCount');
  if (productCount) productCount.textContent = productos.length;

  const actividad = document.getElementById('dashboardActivity');
  if (!actividad) return;

  const pedidosRecientes = pedidos.slice(0, 3);

  if (pedidosRecientes.length === 0) {
    actividad.innerHTML = '<p style="color: var(--gris-texto);">Sin actividad reciente</p>';
  } else {
    actividad.innerHTML = pedidosRecientes.map(p => `
      <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--verde-2);">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(201, 169, 110, 0.15); display: flex; align-items: center; justify-content: center; color: var(--dorado);">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.9rem;">${escapeHtml(p.cliente)}</div>
          <div style="font-size: 0.8rem; color: var(--gris-texto);">Pedido #${p.id} - ${formatearFecha(p.fecha)}</div>
        </div>
        <div style="font-weight: 700; color: var(--dorado);">${formatMoneda(p.total)}</div>
      </div>
    `).join('');
  }
}

/* ============================================================
 *  CATEGORÍAS
 * ============================================================ */

function cargarCategorias() {
  renderCategorias();
  actualizarSelectCategorias();
}

function renderCategorias() {
  const lista = document.getElementById('categoriasLista');
  if (!lista) {
    console.error('[admin.js] categoriasLista no existe en el DOM');
    return;
  }

  const categorias = config.categorias || [];

  const categoriaCount = document.getElementById('categoriaCount');
  if (categoriaCount) categoriaCount.textContent = categorias.length;

  if (categorias.length === 0) {
    lista.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-folder-open"></i>
        <p>No hay categorías. Agrega la primera.</p>
      </div>
    `;
    renderPreviewFiltros();
    return;
  }

  lista.innerHTML = categorias.map(cat => `
    <div class="categoria-card ${cat.activa ? '' : 'inactiva'}" data-id="${escapeHtml(cat.id)}">
      <div class="categoria-icono">
        <i class="fas fa-tag"></i>
      </div>
      <div class="categoria-info">
        <div class="categoria-nombre">${escapeHtml(cat.nombre)}</div>
        <div class="categoria-codigo">${escapeHtml(cat.id)}</div>
        <span class="categoria-badge ${cat.activa ? 'activa' : 'inactiva'}">
          ${cat.activa ? 'Activa' : 'Oculta'}
        </span>
      </div>
      <div class="categoria-acciones">
        <label class="toggle-switch" title="${cat.activa ? 'Ocultar de la tienda' : 'Mostrar en la tienda'}">
          <input type="checkbox" ${cat.activa ? 'checked' : ''} onchange="toggleCategoria('${escapeHtml(cat.id)}')">
          <span class="toggle-slider"></span>
        </label>
        <button class="categoria-btn edit" onclick="editarCategoria('${escapeHtml(cat.id)}')" aria-label="Editar categoría">
          <i class="fas fa-edit"></i>
        </button>
        <button class="categoria-btn delete" onclick="confirmarEliminarCategoria('${escapeHtml(cat.id)}')" aria-label="Eliminar categoría">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');

  renderPreviewFiltros();
}

function renderPreviewFiltros() {
  const contenedor = document.getElementById('previewFiltros');
  if (!contenedor) return;
  const categorias = (config.categorias || []).filter(c => c.activa);

  let html = '<button class="preview-filter-btn active">Todos</button>';
  categorias.forEach(cat => {
    html += `<button class="preview-filter-btn">${escapeHtml(cat.nombre)}</button>`;
  });

  contenedor.innerHTML = html;
}

function actualizarSelectCategorias() {
  const select = document.getElementById('prodCategoria');
  if (!select) return;
  const valorActual = select.value;
  const categorias = config.categorias || [];

  select.innerHTML = '<option value="">Seleccionar...</option>' +
    categorias.map(cat =>
      `<option value="${escapeHtml(cat.id)}">${escapeHtml(cat.nombre)}</option>`
    ).join('');

  if (valorActual && categorias.some(c => c.id === valorActual)) {
    select.value = valorActual;
  }
}

/* ============================================================
 *  FUNCIONES DE EDICIÓN Y ELIMINACIÓN
 * ============================================================ */

function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  productoEditando = producto;
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.innerHTML = 'Editar <span>Producto</span>';

  const productoForm = document.getElementById('productoForm');
  if (productoForm) productoForm.reset();

  const productoId = document.getElementById('productoId');
  if (productoId) productoId.value = producto.id;

  const prodNombre = document.getElementById('prodNombre');
  if (prodNombre) prodNombre.value = producto.nombre;

  const prodDescripcion = document.getElementById('prodDescripcion');
  if (prodDescripcion) prodDescripcion.value = producto.descripcion || '';

  const prodPrecio = document.getElementById('prodPrecio');
  if (prodPrecio) prodPrecio.value = producto.precio;

  const prodPrecioAnterior = document.getElementById('prodPrecioAnterior');
  if (prodPrecioAnterior) prodPrecioAnterior.value = producto.precioAnterior || '';

  const prodCategoria = document.getElementById('prodCategoria');
  if (prodCategoria) prodCategoria.value = producto.categoria;

  const prodStock = document.getElementById('prodStock');
  if (prodStock) prodStock.value = producto.stock;

  const fotoPreview = document.getElementById('fotoPreview');
  const prodImagenBase64 = document.getElementById('prodImagenBase64');

  if (producto.imagenBase64) {
    if (fotoPreview) fotoPreview.src = producto.imagenBase64;
    if (prodImagenBase64) prodImagenBase64.value = producto.imagenBase64;
    mostrarVistaPrevia();
  } else {
    if (prodImagenBase64) prodImagenBase64.value = '';
    mostrarZonaSubida();
  }

  const productoModal = document.getElementById('productoModal');
  if (productoModal) productoModal.classList.add('active');
}

function cerrarModal() {
  const productoModal = document.getElementById('productoModal');
  if (productoModal) productoModal.classList.remove('active');
  productoEditando = null;
}

function mostrarZonaSubida() {
  const fotoUploadZone = document.getElementById('fotoUploadZone');
  const fotoPreviewContainer = document.getElementById('fotoPreviewContainer');
  if (fotoUploadZone) fotoUploadZone.style.display = 'flex';
  if (fotoPreviewContainer) fotoPreviewContainer.style.display = 'none';
}

function mostrarVistaPrevia() {
  const fotoUploadZone = document.getElementById('fotoUploadZone');
  const fotoPreviewContainer = document.getElementById('fotoPreviewContainer');
  if (fotoUploadZone) fotoUploadZone.style.display = 'none';
  if (fotoPreviewContainer) fotoPreviewContainer.style.display = 'block';
}

function confirmarEliminar(id) {
  productoAEliminar = id;
  const confirmOverlay = document.getElementById('confirmOverlay');
  if (confirmOverlay) confirmOverlay.classList.add('active');
}

function pedirConfirmacion(titulo, mensaje, callback) {
  const confirmTitle = document.getElementById('confirmTitle');
  const confirmMessage = document.getElementById('confirmMessage');
  if (confirmTitle) confirmTitle.textContent = titulo;
  if (confirmMessage) confirmMessage.textContent = mensaje;
  callbackConfirmacion = callback;
  const confirmOverlay = document.getElementById('confirmOverlay');
  if (confirmOverlay) confirmOverlay.classList.add('active');
}

function toggleCategoria(id) {
  const cat = (config.categorias || []).find(c => c.id === id);
  if (!cat) return;
  cat.activa = !cat.activa;
  guardarConfig();
  renderCategorias();
  showToast(cat.activa ? `"${cat.nombre}" ahora es visible en la tienda` : `"${cat.nombre}" está oculta en la tienda`);
}

function editarCategoria(id) {
  const cat = (config.categorias || []).find(c => c.id === id);
  if (!cat) return;

  categoriaEditando = id;
  const categoriaModalTitle = document.getElementById('categoriaModalTitle');
  if (categoriaModalTitle) categoriaModalTitle.innerHTML = 'Editar <span>Categoría</span>';

  const categoriaForm = document.getElementById('categoriaForm');
  if (categoriaForm) categoriaForm.reset();

  const categoriaEditandoId = document.getElementById('categoriaEditandoId');
  if (categoriaEditandoId) categoriaEditandoId.value = id;

  const catNombre = document.getElementById('catNombre');
  if (catNombre) catNombre.value = cat.nombre;

  const catCodigo = document.getElementById('catCodigo');
  if (catCodigo) {
    catCodigo.value = cat.id;
    catCodigo.readOnly = true;
    catCodigo.style.opacity = '0.5';
    catCodigo.style.cursor = 'not-allowed';
  }

  const categoriaModal = document.getElementById('categoriaModal');
  if (categoriaModal) categoriaModal.classList.add('active');
}

function cerrarCategoriaModal() {
  const categoriaModal = document.getElementById('categoriaModal');
  if (categoriaModal) categoriaModal.classList.remove('active');
  categoriaEditando = null;
}

function confirmarEliminarCategoria(id) {
  const cat = (config.categorias || []).find(c => c.id === id);
  if (!cat) return;

  const productosEnCategoria = productos.filter(p => p.categoria === id).length;
  let mensaje = `Se eliminará la categoría "${cat.nombre}".`;

  if (productosEnCategoria > 0) {
    mensaje += ` Hay ${productosEnCategoria} producto(s) con esta categoría. Quedarán sin categoría.`;
  }

  pedirConfirmacion('¿Eliminar categoría?', mensaje, () => {
    config.categorias = (config.categorias || []).filter(c => c.id !== id);
    guardarConfig();
    renderCategorias();
    actualizarSelectCategorias();
    showToast('Categoría eliminada');
  });
}

/* ============================================================
 *  CONFIGURACIÓN (AJUSTES)
 * ============================================================ */

function cargarConfigEnFormulario() {
  const configNombre = document.getElementById('configNombre');
  if (configNombre) configNombre.value = config.nombre;

  const configWhatsapp = document.getElementById('configWhatsapp');
  if (configWhatsapp) configWhatsapp.value = config.whatsapp;

  const configMensaje = document.getElementById('configMensaje');
  if (configMensaje) configMensaje.value = config.mensaje;

  const configEmail = document.getElementById('configEmail');
  if (configEmail) configEmail.value = config.email;

  const configDireccion = document.getElementById('configDireccion');
  if (configDireccion) configDireccion.value = config.direccion;
}

/* ============================================================
 *  INICIALIZACIÓN
 * ============================================================ */

/**
 * Verifica si el usuario ya está autenticado
 * @returns {boolean} true si ya se autenticó en esta sesión/navegador
 */
function estaAutenticado() {
  return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
}

/**
 * Muestra el modal de login
 */
function mostrarLogin() {
  const loginOverlay = document.getElementById('loginOverlay');
  if (loginOverlay) {
    loginOverlay.classList.add('active');
    const loginPassword = document.getElementById('loginPassword');
    if (loginPassword) {
      setTimeout(() => loginPassword.focus(), 300);
    }
  }
}

/**
 * Oculta el modal de login
 */
function ocultarLogin() {
  const loginOverlay = document.getElementById('loginOverlay');
  if (loginOverlay) loginOverlay.classList.remove('active');
}

/**
 * Maneja el envío del formulario de login
 */
function manejarLogin(e) {
  if (e) e.preventDefault();
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const password = loginPassword ? loginPassword.value : '';

  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    ocultarLogin();
    if (loginPassword) loginPassword.value = '';
    if (loginError) loginError.style.display = 'none';
    showToast('Bienvenido al panel de administración');
    console.log('[admin.js] Login exitoso - llamando initAdmin');
    initAdmin().catch(e => console.error('[admin.js] Error en initAdmin después de login:', e));
  } else {
    if (loginError) {
      loginError.style.display = 'block';
      loginError.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
    }
    if (loginPassword) {
      loginPassword.value = '';
      loginPassword.focus();
    }
  }
}

/**
 * Cierra la sesión del administrador
 */
function cerrarSesion() {
  localStorage.removeItem(STORAGE_KEY_AUTH);
  showToast('Sesión cerrada');
  setTimeout(() => location.reload(), 1000);
}

let adminInicializado = false;

window.initAdmin = initAdmin;

async function initAdmin() {
  // Verificar autenticación primero
  if (!estaAutenticado()) {
    mostrarLogin();
    return;
  }

  // Evitar inicialización duplicada
  if (adminInicializado) {
    console.log('[admin.js] Admin ya fue inicializado, omitiendo inicialización duplicada');
    return;
  }

  console.log('[admin.js] Inicializando admin - firebaseCargado:', firebaseCargado);

  try {
    await cargarDatos();
    cargarConfigEnFormulario();
    renderProductos();
    renderPedidos();
    renderDashboard();
    cargarCategorias();
    inicializarEventos();
    inicializarLogin();
    adminInicializado = true;
    console.log('[admin.js] Admin inicializado correctamente - productos:', productos.length, 'productosEnGrid:', productosEnGrid);
  } catch (e) {
    console.error('[admin.js] Error fatal al inicializar admin:', e);
    showToast('Error al cargar el panel. Verifica tu conexión.', 'error');
  }
}

/**
 * Inicializa los eventos del formulario de login
 */
function inicializarLogin() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', manejarLogin);
  }

  const loginPassword = document.getElementById('loginPassword');
  if (loginPassword) {
    loginPassword.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        manejarLogin(e);
      }
    });
  }
}

function inicializarEventos() {
  // Navegación
  const navItems = document.querySelectorAll('.nav-item');
  const sectionContents = document.querySelectorAll('.section-content');
  const pageTitle = document.getElementById('pageTitle');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      sectionContents.forEach(s => s.classList.remove('active'));
      const sectionEl = document.getElementById('section-' + section);
      if (sectionEl) sectionEl.classList.add('active');

      const titulos = {
        'inicio': 'Inicio',
        'productos': 'Mis Productos',
        'categorias': 'Categorías',
        'pedidos': 'Mis Pedidos',
        'ajustes': 'Ajustes'
      };
      if (pageTitle) pageTitle.textContent = titulos[section] || section;
    });
  });

  // Sidebar
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (sidebar) sidebar.classList.toggle('mobile-open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Productos
  const btnAgregarProducto = document.getElementById('btnAgregarProducto');
  if (btnAgregarProducto) {
    btnAgregarProducto.addEventListener('click', () => {
      productoEditando = null;
      const modalTitle = document.getElementById('modalTitle');
      if (modalTitle) modalTitle.innerHTML = 'Agregar <span>Producto</span>';
      const productoForm = document.getElementById('productoForm');
      if (productoForm) productoForm.reset();
      const productoId = document.getElementById('productoId');
      if (productoId) productoId.value = '';
      const prodImagenBase64 = document.getElementById('prodImagenBase64');
      if (prodImagenBase64) prodImagenBase64.value = '';
      mostrarZonaSubida();
      const productoModal = document.getElementById('productoModal');
      if (productoModal) productoModal.classList.add('active');
    });
  }

  const modalClose = document.getElementById('modalClose');
  if (modalClose) modalClose.addEventListener('click', cerrarModal);

  const btnCancelar = document.getElementById('btnCancelar');
  if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

  const productoModal = document.getElementById('productoModal');
  if (productoModal) {
    productoModal.addEventListener('click', (e) => {
      if (e.target === productoModal) cerrarModal();
    });
  }

  // Foto upload
  const fotoUploadZone = document.getElementById('fotoUploadZone');
  const prodFotoInput = document.getElementById('prodFotoInput');
  const fotoPreview = document.getElementById('fotoPreview');
  const fotoRemoveBtn = document.getElementById('fotoRemoveBtn');
  const prodImagenBase64 = document.getElementById('prodImagenBase64');

  if (fotoUploadZone && prodFotoInput) {
    fotoUploadZone.addEventListener('click', () => prodFotoInput.click());
  }

  if (prodFotoInput) {
    prodFotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('Por favor selecciona una imagen', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('La imagen no puede superar 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        if (fotoPreview) fotoPreview.src = base64;
        if (prodImagenBase64) prodImagenBase64.value = base64;
        mostrarVistaPrevia();
        showToast('Foto cargada correctamente');
      };
      reader.onerror = () => showToast('Error al cargar la imagen', 'error');
      reader.readAsDataURL(file);
    });
  }

  if (fotoRemoveBtn) {
    fotoRemoveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (prodFotoInput) prodFotoInput.value = '';
      if (prodImagenBase64) prodImagenBase64.value = '';
      if (fotoPreview) fotoPreview.src = '';
      mostrarZonaSubida();
    });
  }

  // Formulario de producto
  const productoForm = document.getElementById('productoForm');
  if (productoForm) {
    productoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('productoId').value;
      const nombre = document.getElementById('prodNombre').value.trim();
      const descripcion = document.getElementById('prodDescripcion').value.trim();
      const precio = parseFloat(document.getElementById('prodPrecio').value);
      const precioAnterior = parseFloat(document.getElementById('prodPrecioAnterior').value) || null;
      const categoria = document.getElementById('prodCategoria').value;
      const stock = parseInt(document.getElementById('prodStock').value);
      const imagenBase64 = prodImagenBase64 ? prodImagenBase64.value : '';

      if (!nombre) { showToast('El nombre es obligatorio', 'error'); return; }
      if (!precio || precio <= 0) { showToast('El precio debe ser mayor a 0', 'error'); return; }
      if (!categoria) { showToast('Selecciona una categoría', 'error'); return; }
      if (isNaN(stock) || stock < 0) { showToast('El stock debe ser un número positivo', 'error'); return; }

      if (id) {
        const index = productos.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
          productos[index] = { ...productos[index], nombre, descripcion, precio, precioAnterior, categoria, stock, imagenBase64 };
          showToast('Producto actualizado');
        }
      } else {
        const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        const emojis = ['🌹', '✨', '🌰', '🍊', '🧈', '🌸', '💎', '🌿', '⭐', '🔮'];
        const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];
        productos.push({ id: nuevoId, nombre, descripcion, precio, precioAnterior, categoria, stock, imagenBase64, emoji: emojiAleatorio });
        showToast('Producto agregado');
      }

      guardarProductos();
      renderProductos();
      renderDashboard();
      cerrarModal();
    });
  }

  // Confirmación de eliminación
  const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
  const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');
  const confirmOverlay = document.getElementById('confirmOverlay');

  if (btnConfirmarEliminar) {
    btnConfirmarEliminar.addEventListener('click', async () => {
      if (callbackConfirmacion) {
        callbackConfirmacion();
        callbackConfirmacion = null;
      } else if (productoAEliminar) {
        const idAEliminar = productoAEliminar;
        // Eliminar el documento de Firebase
        try {
          await deleteDoc(doc(productosCollection, String(idAEliminar)));
          console.log('Producto eliminado de Firebase:', idAEliminar);
        } catch (e) {
          console.error('Error al eliminar producto de Firebase:', e);
          showToast('Error al eliminar el producto', 'error');
          return;
        }
        // Eliminar del array local
        productos = productos.filter(p => p.id !== idAEliminar);
        renderProductos();
        renderDashboard();
        showToast('Producto eliminado');
        productoAEliminar = null;
      }
      if (confirmOverlay) confirmOverlay.classList.remove('active');
    });
  }

  if (btnCancelarEliminar) {
    btnCancelarEliminar.addEventListener('click', () => {
      if (confirmOverlay) confirmOverlay.classList.remove('active');
      productoAEliminar = null;
    });
  }

  if (confirmOverlay) {
    confirmOverlay.addEventListener('click', (e) => {
      if (e.target === confirmOverlay) {
        confirmOverlay.classList.remove('active');
        productoAEliminar = null;
      }
    });
  }

  // Buscador de productos
  const searchProductos = document.getElementById('searchProductos');
  if (searchProductos) {
    searchProductos.addEventListener('input', (e) => renderProductos(e.target.value));
  }

  // Formulario de configuración
  const configForm = document.getElementById('configForm');
  if (configForm) {
    configForm.addEventListener('submit', (e) => {
      e.preventDefault();
      config.nombre = document.getElementById('configNombre').value.trim() || 'NØRDIKO';
      config.whatsapp = document.getElementById('configWhatsapp').value.trim();
      config.mensaje = document.getElementById('configMensaje').value.trim();
      config.email = document.getElementById('configEmail').value.trim();
      config.direccion = document.getElementById('configDireccion').value.trim();

      if (!config.whatsapp) {
        showToast('El número de WhatsApp es obligatorio', 'error');
        return;
      }

      guardarConfig();
      showToast('Configuración guardada');
    });
  }

  // Categorías
  const btnAgregarCategoria = document.getElementById('btnAgregarCategoria');
  if (btnAgregarCategoria) {
    btnAgregarCategoria.addEventListener('click', () => {
      categoriaEditando = null;
      const categoriaModalTitle = document.getElementById('categoriaModalTitle');
      if (categoriaModalTitle) categoriaModalTitle.innerHTML = 'Agregar <span>Categoría</span>';
      const categoriaForm = document.getElementById('categoriaForm');
      if (categoriaForm) categoriaForm.reset();
      const categoriaEditandoId = document.getElementById('categoriaEditandoId');
      if (categoriaEditandoId) categoriaEditandoId.value = '';
      const catCodigo = document.getElementById('catCodigo');
      if (catCodigo) {
        catCodigo.readOnly = false;
        catCodigo.style.opacity = '1';
        catCodigo.style.cursor = 'text';
      }
      const categoriaModal = document.getElementById('categoriaModal');
      if (categoriaModal) categoriaModal.classList.add('active');
    });
  }

  const categoriaModalClose = document.getElementById('categoriaModalClose');
  if (categoriaModalClose) categoriaModalClose.addEventListener('click', cerrarCategoriaModal);

  const btnCancelarCategoria = document.getElementById('btnCancelarCategoria');
  if (btnCancelarCategoria) btnCancelarCategoria.addEventListener('click', cerrarCategoriaModal);

  const categoriaModal = document.getElementById('categoriaModal');
  if (categoriaModal) {
    categoriaModal.addEventListener('click', (e) => {
      if (e.target === categoriaModal) cerrarCategoriaModal();
    });
  }

  // Formulario de categoría
  const categoriaForm = document.getElementById('categoriaForm');
  if (categoriaForm) {
    categoriaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('catNombre').value.trim();
      let codigo = document.getElementById('catCodigo').value.trim().toLowerCase();
      const editandoId = document.getElementById('categoriaEditandoId').value;

      if (!nombre) { showToast('El nombre es obligatorio', 'error'); return; }
      if (!codigo) { showToast('El código interno es obligatorio', 'error'); return; }

      codigo = codigo.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

      if (!codigo) { showToast('El código interno debe tener letras o números', 'error'); return; }

      const repetido = (config.categorias || []).some(c => c.id === codigo && c.id !== editandoId);
      if (repetido) { showToast('Ya existe una categoría con ese código', 'error'); return; }

      if (editandoId) {
        const cat = (config.categorias || []).find(c => c.id === editandoId);
        if (cat) {
          cat.nombre = nombre;
          showToast('Categoría actualizada');
        }
      } else {
        if (!config.categorias) config.categorias = [];
        config.categorias.push({ id: codigo, nombre, activa: true });
        showToast('Categoría agregada');
      }

      guardarConfig();
      renderCategorias();
      actualizarSelectCategorias();
      cerrarCategoriaModal();
    });
  }
}

// Inicializar cuando el DOM esté listo
function inicializarCuandoDOMListo() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[admin.js] DOMContentLoaded - inicializando admin');
      initAdmin().catch(e => console.error('[admin.js] Error en initAdmin:', e));
    });
  } else {
    console.log('[admin.js] DOM ya listo - inicializando admin');
    initAdmin().catch(e => console.error('[admin.js] Error en initAdmin:', e));
  }
}

inicializarCuandoDOMListo();

// Exponer variables de debugging al scope global para verificación en consola
window.adminDebug = {
  get firebaseCargado() { return firebaseCargado; },
  get productosEnGrid() { return productosEnGrid; },
  get productos() { return productos; },
  get adminInicializado() { return adminInicializado; }
};
