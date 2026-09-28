/**
 * ============================================================
 *  PANEL DE ADMINISTRACIÓN - NØRDIKO
 * ============================================================
 *  Lógica del panel de administración:
 *  - CRUD de productos con localStorage
 *  - Dashboard con estadísticas
 *  - Buscador en tiempo real
 *  - Configuración de la tienda
 *  - Sistema de temas
 *  - Notificaciones toast
 *  - Validación de formularios
 *
 *  MEJORAS APLICADAS:
 *  - Compatibilidad total con admin/index.html
 *  - Claves de localStorage corregidas (nordiko_*)
 *  - Escape HTML para prevenir XSS
 *  - Validación de datos mejorada
 *  - Eliminación de código muerto (renderizarTabla, etc.)
 * ============================================================
 */

'use strict';

/* ============================================================
 *  CONSTANTES Y CONFIGURACIÓN
 * ============================================================ */

const STORAGE_KEY_PRODUCTOS = 'nordiko_productos';
const STORAGE_KEY_CONFIG = 'nordiko_config';
const STORAGE_KEY_TEMA = 'nordiko_tema';

/** Categorías disponibles para los productos */
const CATEGORIAS = [
  'hidratante',
  'corporal',
  'facial',
  'ante-envejecimiento'
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
  if (isNaN(num) || num < 0) return '$0.00';
  return '$' + num.toFixed(2);
}

/**
 * Genera un ID único para un nuevo producto.
 * @returns {number} ID único
 */
function generarId() {
  const maxId = productos.reduce((max, p) => Math.max(max, p.id || 0), 0);
  return Math.max(Date.now(), maxId + 1);
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
    { id: 'ante-envejecimiento', nombre: 'Antiedad', activa: true }
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

function cargarDatos() {
  // Cargar configuración
  const configGuardada = localStorage.getItem(STORAGE_KEY_CONFIG);
  if (configGuardada) {
    try {
      config = { ...config, ...JSON.parse(configGuardada) };
    } catch (e) {
      console.error('Error al cargar configuración:', e);
    }
  }

  // Validar categorías: si la config guardada no contiene un array válido
  // (null, string, objeto, etc. por datos corruptos o versiones anteriores),
  // restaurar las categorías por defecto y reparar localStorage.
  // Sin esto, el contador de categorías muestra 0 aunque la tienda
  // siga mostrando categorías (filtros estáticos en index.html).
  if (!Array.isArray(config.categorias)) {
    config.categorias = [
      { id: 'hidratante', nombre: 'Hidratante', activa: true },
      { id: 'corporal', nombre: 'Corporal', activa: true },
      { id: 'facial', nombre: 'Facial', activa: true },
      { id: 'ante-envejecimiento', nombre: 'Antiedad', activa: true }
    ];
    guardarConfig();
  }

  // Cargar productos
  const productosGuardados = localStorage.getItem(STORAGE_KEY_PRODUCTOS);
  if (productosGuardados) {
    try {
      const datos = JSON.parse(productosGuardados);
      if (Array.isArray(datos)) {
        productos = datos;
      } else {
        productos = obtenerProductosEjemplo();
      }
    } catch (e) {
      console.error('Error al cargar productos:', e);
      productos = obtenerProductosEjemplo();
    }
  } else {
    productos = obtenerProductosEjemplo();
    guardarProductos();
  }
}

function guardarProductos() {
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(productos));
}

function guardarConfig() {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
}

/* ============================================================
 *  ELEMENTOS DEL DOM
 * ============================================================ */

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navItems = document.querySelectorAll('.nav-item');
const sectionContents = document.querySelectorAll('.section-content');
const pageTitle = document.getElementById('pageTitle');

/* ============================================================
 *  SISTEMA DE TEMAS
 * ============================================================ */

const TEMAS = {
  bosque: {
    primario: '#1a2e1a',
    primarioClaro: '#243824',
    primarioOscuro: '#0f1f0f',
    acento: '#c9a96e',
    acentoClaro: '#e0c896',
    acentoOscuro: '#a88b52',
    fondo: '#0a0a0a',
    fondoAlt: '#141210',
    fondoCard: '#1c1916',
    texto: '#f5f0e8',
    textoClaro: '#b8b0a0',
    textoMuted: '#7a7268',
    borde: '#3a342e',
    exito: '#6b8f5e',
    error: '#c0392b',
    advertencia: '#fbbf24'
  },
  cafe: {
    primario: '#3e2723',
    primarioClaro: '#5d4037',
    primarioOscuro: '#2d1a17',
    acento: '#d4a574',
    acentoClaro: '#e8c9a0',
    acentoOscuro: '#b8865c',
    fondo: '#1a1210',
    fondoAlt: '#251a17',
    fondoCard: '#2d201c',
    texto: '#f5f0e8',
    textoClaro: '#c4b8a8',
    textoMuted: '#8a7a6a',
    borde: '#4a3a32',
    exito: '#7a9a6d',
    error: '#c0392b',
    advertencia: '#fbbf24'
  },
  noche: {
    primario: '#0a0a0a',
    primarioClaro: '#1a1a2e',
    primarioOscuro: '#050508',
    acento: '#2563eb',
    acentoClaro: '#60a5fa',
    acentoOscuro: '#1d4ed8',
    fondo: '#050508',
    fondoAlt: '#0f0f1a',
    fondoCard: '#151525',
    texto: '#e2e8f0',
    textoClaro: '#94a3b8',
    textoMuted: '#64748b',
    borde: '#2a2a4a',
    exito: '#22c55e',
    error: '#ef4444',
    advertencia: '#f59e0b'
  },
  tierra: {
    primario: '#2d1f1a',
    primarioClaro: '#4a2c1a',
    primarioOscuro: '#1a100d',
    acento: '#c2410c',
    acentoClaro: '#f59e0b',
    acentoOscuro: '#9a3412',
    fondo: '#120a08',
    fondoAlt: '#1a100d',
    fondoCard: '#221510',
    texto: '#fef3c7',
    textoClaro: '#d4c4a8',
    textoMuted: '#8a7a68',
    borde: '#3d2a22',
    exito: '#84cc16',
    error: '#ef4444',
    advertencia: '#fbbf24'
  },
  personalizado: {
    primario: '#2a2a2a',
    primarioClaro: '#3a3a3a',
    primarioOscuro: '#1a1a1a',
    acento: '#c9a96e',
    acentoClaro: '#e0c896',
    acentoOscuro: '#a88b52',
    fondo: '#0a0a0a',
    fondoAlt: '#141414',
    fondoCard: '#1c1c1c',
    texto: '#ffffff',
    textoClaro: '#b0b0b0',
    textoMuted: '#707070',
    borde: '#3a3a3a',
    exito: '#4ade80',
    error: '#f87171',
    advertencia: '#fbbf24'
  }
};

let temaActual = 'bosque';
let customColores = {
  primario: '#1e3a5f',
  acento: '#e07a3f',
  fondo: '#0d1b2a',
  texto: '#f0e6d3'
};

function cargarTema() {
  const temaGuardado = localStorage.getItem(STORAGE_KEY_TEMA);
  if (temaGuardado) {
    try {
      const datos = JSON.parse(temaGuardado);
      temaActual = datos.tema || 'bosque';
      if (datos.customColores) {
        customColores = { ...customColores, ...datos.customColores };
      }
    } catch (e) {
      console.error('Error al cargar tema:', e);
    }
  }
  aplicarTema(temaActual);
}

function aplicarTema(nombreTema) {
  const tema = TEMAS[nombreTema];
  if (!tema) return;

  const colores = nombreTema === 'personalizado' ? {
    ...tema,
    primario: customColores.primario,
    acento: customColores.acento,
    fondo: customColores.fondo,
    texto: customColores.texto
  } : tema;

  const root = document.documentElement;
  root.style.setProperty('--verde-oscuro', colores.primario);
  root.style.setProperty('--verde-1', colores.primarioClaro);
  root.style.setProperty('--verde-2', colores.fondoCard);
  root.style.setProperty('--verde-3', colores.borde);
  root.style.setProperty('--dorado', colores.acento);
  root.style.setProperty('--dorado-claro', colores.acentoClaro);
  root.style.setProperty('--dorado-oscuro', colores.acentoOscuro);
  root.style.setProperty('--negro', colores.fondo);
  root.style.setProperty('--gris-1', colores.fondoCard);
  root.style.setProperty('--gris-2', colores.fondoCard);
  root.style.setProperty('--gris-3', colores.borde);
  root.style.setProperty('--blanco', colores.texto);
  root.style.setProperty('--gris-texto', colores.textoClaro);
  root.style.setProperty('--exito', colores.exito);
  root.style.setProperty('--error', colores.error);
  root.style.setProperty('--advertencia', colores.advertencia);

  // ============================================================
  // ACTUALIZAR VARIABLES DEL PREVIEW DE LA TIENDA
  // Estas variables controlan la vista previa en tiempo real
  // ============================================================
  root.style.setProperty('--preview-fondo', colores.fondo);
  root.style.setProperty('--preview-borde', colores.borde);
  root.style.setProperty('--preview-primario', colores.primario);
  root.style.setProperty('--preview-acento', colores.acento);
  root.style.setProperty('--preview-texto', colores.texto);
  root.style.setProperty('--preview-texto-claro', colores.textoClaro);
  root.style.setProperty('--preview-primario-texto', colores.primarioOscuro);
  root.style.setProperty('--preview-fondo-card', colores.fondoCard);

  // Actualizar tarjeta de tema activa en la UI
  document.querySelectorAll('.tema-card').forEach(card => {
    card.classList.toggle('active', card.dataset.tema === nombreTema);
  });

  // Actualizar variables y pickers SOLO si es tema personalizado
  if (nombreTema === 'personalizado') {
    root.style.setProperty('--custom-primario', customColores.primario);
    root.style.setProperty('--custom-acento', customColores.acento);
    root.style.setProperty('--custom-fondo', customColores.fondo);
    root.style.setProperty('--custom-texto', customColores.texto);

    const panel = document.getElementById('customColorsPanel');
    if (panel && panel.classList.contains('visible')) {
      const pickerPrimario = document.getElementById('customPrimario');
      const pickerAcento = document.getElementById('customAcento');
      const pickerFondo = document.getElementById('customFondo');
      const pickerTexto = document.getElementById('customTexto');
      if (pickerPrimario) pickerPrimario.value = customColores.primario;
      if (pickerAcento) pickerAcento.value = customColores.acento;
      if (pickerFondo) pickerFondo.value = customColores.fondo;
      if (pickerTexto) pickerTexto.value = customColores.texto;
    }
  }

  // Log para debugging
  console.log(`[aplicarTema] Tema "${nombreTema}" aplicado. Fondo: ${colores.fondo}, Acento: ${colores.acento}`);
}

/* ============================================================
 *  NOTIFICACIONES TOAST
 * ============================================================ */

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} toast-icon"></i>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  // Animar entrada
  setTimeout(() => toast.classList.add('show'), 10);

  // Remover después de 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================================================
 *  NAVEGACIÓN
 * ============================================================ */

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.dataset.section;

    // Actualizar nav activo
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');

    // Mostrar sección correspondiente
    sectionContents.forEach(s => s.classList.remove('active'));
    document.getElementById('section-' + section).classList.add('active');

    // Actualizar título
    const titulos = {
      'inicio': 'Inicio',
      'productos': 'Mis Productos',
      'pedidos': 'Mis Pedidos',
      'ajustes': 'Ajustes'
    };
    pageTitle.textContent = titulos[section] || section;

    // Cerrar menú móvil
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
  });
});

/* ============================================================
 *  MENÚ MÓVIL
 * ============================================================ */

mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('mobile-open');
  sidebarOverlay.classList.toggle('active');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('mobile-open');
  sidebarOverlay.classList.remove('active');
});

/* ============================================================
 *  RENDERIZAR PRODUCTOS
 * ============================================================ */

function renderProductos(filtro = '') {
  const lista = document.getElementById('productosLista');
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

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
    // Determinar qué mostrar: foto o emoji
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
        <div class="pedido-total">$${p.total.toFixed(2)}</div>
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
  // Estadísticas
  document.getElementById('statProductos').textContent = productos.length;
  document.getElementById('statPedidos').textContent = pedidos.filter(p => p.estado === 'pendiente').length;

  const ventasMes = pedidos
    .filter(p => p.estado === 'completado')
    .reduce((sum, p) => sum + p.total, 0);
  document.getElementById('statVentas').textContent = '$' + ventasMes.toFixed(2);
  document.getElementById('statIngresos').textContent = '$' + ventasMes.toFixed(2);

  // Badge de productos
  document.getElementById('productCount').textContent = productos.length;

  // Actividad reciente
  const actividad = document.getElementById('dashboardActivity');
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
        <div style="font-weight: 700; color: var(--dorado);">$${p.total.toFixed(2)}</div>
      </div>
    `).join('');
  }
}

/* ============================================================
 *  MODAL DE PRODUCTO
 * ============================================================ */

const productoModal = document.getElementById('productoModal');
const modalTitle = document.getElementById('modalTitle');
const productoForm = document.getElementById('productoForm');
const btnAgregarProducto = document.getElementById('btnAgregarProducto');
const btnCancelar = document.getElementById('btnCancelar');
const modalClose = document.getElementById('modalClose');

// Elementos de foto
const fotoUploadZone = document.getElementById('fotoUploadZone');
const fotoPreviewContainer = document.getElementById('fotoPreviewContainer');
const fotoPreview = document.getElementById('fotoPreview');
const fotoRemoveBtn = document.getElementById('fotoRemoveBtn');
const prodFotoInput = document.getElementById('prodFotoInput');
const prodImagenBase64 = document.getElementById('prodImagenBase64');

// Abrir modal para agregar
btnAgregarProducto.addEventListener('click', () => {
  productoEditando = null;
  modalTitle.innerHTML = 'Agregar <span>Producto</span>';
  productoForm.reset();
  document.getElementById('productoId').value = '';
  prodImagenBase64.value = '';
  mostrarZonaSubida();
  productoModal.classList.add('active');
});

// Cerrar modal
function cerrarModal() {
  productoModal.classList.remove('active');
  productoEditando = null;
}

modalClose.addEventListener('click', cerrarModal);
btnCancelar.addEventListener('click', cerrarModal);

// Cerrar modal al tocar fuera
productoModal.addEventListener('click', (e) => {
  if (e.target === productoModal) {
    cerrarModal();
  }
});

/* ============================================================
 *  SUBIR FOTO DESDE EL CELULAR
 * ============================================================ */

// Al tocar la zona de subida, abrir la galería
fotoUploadZone.addEventListener('click', () => {
  prodFotoInput.click();
});

// Cuando se selecciona una foto
prodFotoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Verificar que sea una imagen
  if (!file.type.startsWith('image/')) {
    showToast('Por favor selecciona una imagen', 'error');
    return;
  }

  // Verificar tamaño máximo (5MB)
  if (file.size > 5 * 1024 * 1024) {
    showToast('La imagen no puede superar 5MB', 'error');
    return;
  }

  // Usar FileReader para convertir a base64
  const reader = new FileReader();

  reader.onload = (event) => {
    const base64 = event.target.result;

    // Mostrar vista previa
    fotoPreview.src = base64;
    prodImagenBase64.value = base64;
    mostrarVistaPrevia();

    showToast('Foto cargada correctamente');
  };

  reader.onerror = () => {
    showToast('Error al cargar la imagen', 'error');
  };

  // Leer el archivo como base64
  reader.readAsDataURL(file);
});

// Quitar foto
fotoRemoveBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  prodFotoInput.value = '';
  prodImagenBase64.value = '';
  fotoPreview.src = '';
  mostrarZonaSubida();
});

// Mostrar zona de subida (sin foto)
function mostrarZonaSubida() {
  fotoUploadZone.style.display = 'flex';
  fotoPreviewContainer.style.display = 'none';
}

// Mostrar vista previa (con foto)
function mostrarVistaPrevia() {
  fotoUploadZone.style.display = 'none';
  fotoPreviewContainer.style.display = 'block';
}

/* ============================================================
 *  EDITAR PRODUCTO
 * ============================================================ */

function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  productoEditando = producto;
  modalTitle.innerHTML = 'Editar <span>Producto</span>';

  // Llenar formulario
  document.getElementById('productoId').value = producto.id;
  document.getElementById('prodNombre').value = producto.nombre;
  document.getElementById('prodDescripcion').value = producto.descripcion || '';
  document.getElementById('prodPrecio').value = producto.precio;
  document.getElementById('prodPrecioAnterior').value = producto.precioAnterior || '';
  document.getElementById('prodCategoria').value = producto.categoria;
  document.getElementById('prodStock').value = producto.stock;

  // Manejar foto
  if (producto.imagenBase64) {
    fotoPreview.src = producto.imagenBase64;
    prodImagenBase64.value = producto.imagenBase64;
    mostrarVistaPrevia();
  } else {
    prodImagenBase64.value = '';
    mostrarZonaSubida();
  }

  productoModal.classList.add('active');
}

/* ============================================================
 *  GUARDAR PRODUCTO
 * ============================================================ */

productoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('productoId').value;
  const nombre = document.getElementById('prodNombre').value.trim();
  const descripcion = document.getElementById('prodDescripcion').value.trim();
  const precio = parseFloat(document.getElementById('prodPrecio').value);
  const precioAnterior = parseFloat(document.getElementById('prodPrecioAnterior').value) || null;
  const categoria = document.getElementById('prodCategoria').value;
  const stock = parseInt(document.getElementById('prodStock').value);
  const imagenBase64 = prodImagenBase64.value;

  // Validaciones
  if (!nombre) {
    showToast('El nombre es obligatorio', 'error');
    return;
  }
  if (!precio || precio <= 0) {
    showToast('El precio debe ser mayor a 0', 'error');
    return;
  }
  if (!categoria) {
    showToast('Selecciona una categoría', 'error');
    return;
  }
  if (isNaN(stock) || stock < 0) {
    showToast('El stock debe ser un número positivo', 'error');
    return;
  }

  if (id) {
    // Editar producto existente
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      productos[index] = {
        ...productos[index],
        nombre,
        descripcion,
        precio,
        precioAnterior,
        categoria,
        stock,
        imagenBase64
      };
      showToast('Producto actualizado');
    }
  } else {
    // Agregar nuevo producto
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const emojis = ['🌹', '✨', '🌰', '🍊', '🧈', '🌸', '💎', '🌿', '⭐', '🔮'];
    const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];

    productos.push({
      id: nuevoId,
      nombre,
      descripcion,
      precio,
      precioAnterior,
      categoria,
      stock,
      imagenBase64,
      emoji: emojiAleatorio
    });
    showToast('Producto agregado');
  }

  guardarProductos();
  renderProductos();
  renderDashboard();
  cerrarModal();
});

/* ============================================================
 *  ELIMINAR PRODUCTO
 * ============================================================ */

const confirmOverlay = document.getElementById('confirmOverlay');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

function confirmarEliminar(id) {
  productoAEliminar = id;
  confirmOverlay.classList.add('active');
}

btnConfirmarEliminar.addEventListener('click', () => {
  if (productoAEliminar) {
    productos = productos.filter(p => p.id !== productoAEliminar);
    guardarProductos();
    renderProductos();
    renderDashboard();
    showToast('Producto eliminado');
  }
  confirmOverlay.classList.remove('active');
  productoAEliminar = null;
});

btnCancelarEliminar.addEventListener('click', () => {
  confirmOverlay.classList.remove('active');
  productoAEliminar = null;
});

// Cerrar confirmación al tocar fuera
confirmOverlay.addEventListener('click', (e) => {
  if (e.target === confirmOverlay) {
    confirmOverlay.classList.remove('active');
    productoAEliminar = null;
  }
});

/* ============================================================
 *  BUSCADOR DE PRODUCTOS
 * ============================================================ */

document.getElementById('searchProductos').addEventListener('input', (e) => {
  renderProductos(e.target.value);
});

/* ============================================================
 *  CONFIGURACIÓN (AJUSTES)
 * ============================================================ */

const configForm = document.getElementById('configForm');

// Cargar configuración en el formulario
function cargarConfigEnFormulario() {
  document.getElementById('configNombre').value = config.nombre;
  document.getElementById('configWhatsapp').value = config.whatsapp;
  document.getElementById('configMensaje').value = config.mensaje;
  document.getElementById('configEmail').value = config.email;
  document.getElementById('configDireccion').value = config.direccion;
}

// Guardar configuración
configForm.addEventListener('submit', (e) => {
  e.preventDefault();

  config.nombre = document.getElementById('configNombre').value.trim() || 'NØRDIKO';
  config.whatsapp = document.getElementById('configWhatsapp').value.trim();
  config.mensaje = document.getElementById('configMensaje').value.trim();
  config.email = document.getElementById('configEmail').value.trim();
  config.direccion = document.getElementById('configDireccion').value.trim();

  // Validar WhatsApp
  if (!config.whatsapp) {
    showToast('El número de WhatsApp es obligatorio', 'error');
    return;
  }

  guardarConfig();
  showToast('Configuración guardada');
});

/* ============================================================
 *  SISTEMA DE TEMAS - UI
 * ============================================================ */

function initTemas() {
  // Manejar selección de tema — con guardado automático
  document.querySelectorAll('.tema-card').forEach(card => {
    card.addEventListener('click', () => {
      const tema = card.dataset.tema;

      if (tema === 'personalizado') {
        // Mostrar panel de colores personalizados
        const panel = document.getElementById('customColorsPanel');
        if (panel) {
          panel.classList.toggle('visible');
        }
      } else {
        // Ocultar panel personalizado si está visible
        const panel = document.getElementById('customColorsPanel');
        if (panel) {
          panel.classList.remove('visible');
        }
      }

      temaActual = tema;
      aplicarTema(tema);

      // Guardar automáticamente al seleccionar un tema
      guardarTema();

      // Feedback visual: animación en la tarjeta seleccionada
      card.classList.add('pulse');
      setTimeout(() => card.classList.remove('pulse'), 300);

      // Actualizar tarjeta activa
      document.querySelectorAll('.tema-card').forEach(c => {
        c.classList.toggle('active', c.dataset.tema === tema);
      });
    });
  });
}

// Manejar color pickers personalizados
const colorPickers = [
  { picker: 'customPrimario', hex: 'hexPrimario', key: 'primario' },
  { picker: 'customAcento', hex: 'hexAcento', key: 'acento' },
  { picker: 'customFondo', hex: 'hexFondo', key: 'fondo' },
  { picker: 'customTexto', hex: 'hexTexto', key: 'texto' }
];

colorPickers.forEach(({ picker, hex, key }) => {
  const input = document.getElementById(picker);
  const hexDisplay = document.getElementById(hex);

  if (input && hexDisplay) {
    input.addEventListener('input', () => {
      customColores[key] = input.value;
      hexDisplay.textContent = input.value.toUpperCase();
      if (temaActual === 'personalizado') {
        aplicarTema('personalizado');
      }
      // Guardado automático con debounce (espera 500ms después del último cambio)
      clearTimeout(input._saveTimeout);
      input._saveTimeout = setTimeout(() => {
        guardarTema();
      }, 500);
    });
  }
});

// Guardar tema en localStorage
function guardarTema() {
  try {
    localStorage.setItem(STORAGE_KEY_TEMA, JSON.stringify({
      tema: temaActual,
      customColores: customColores
    }));
  } catch (e) {
    console.warn('No se pudo guardar el tema:', e);
    showToast('No se pudo guardar el tema', 'error');
  }
}

// Guardar tema
document.getElementById('btnGuardarTema').addEventListener('click', () => {
  guardarTema();
  showToast('Tema guardado correctamente');
});

// ============================================================
// MODAL DE VISTA PREVIA DE LA TIENDA
// ============================================================

const btnVerPreview = document.getElementById('btnVerPreview');
const previewModalOverlay = document.getElementById('previewModalOverlay');
const previewModalClose = document.getElementById('previewModalClose');

function abrirPreviewModal() {
  if (previewModalOverlay) {
    previewModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function cerrarPreviewModal() {
  if (previewModalOverlay) {
    previewModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (btnVerPreview) {
  btnVerPreview.addEventListener('click', abrirPreviewModal);
}

if (previewModalClose) {
  previewModalClose.addEventListener('click', cerrarPreviewModal);
}

if (previewModalOverlay) {
  previewModalOverlay.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      cerrarPreviewModal();
    }
  });
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarPreviewModal();
  }
});

// Restablecer tema — con confirmación
const btnRestablecerTema = document.getElementById('btnRestablecerTema');
if (btnRestablecerTema) {
  btnRestablecerTema.addEventListener('click', () => {
    pedirConfirmacion(
      '¿Restablecer tema?',
      'Se volverá al tema por defecto (Bosque). Se perderán los colores personalizados.',
      restablecerTema
    );
  });
}

function restablecerTema() {
  temaActual = 'bosque';
  customColores = {
    primario: '#1e3a5f',
    acento: '#e07a3f',
    fondo: '#0d1b2a',
    texto: '#f0e6d3'
  };
  aplicarTema('bosque');

  try {
    localStorage.removeItem(STORAGE_KEY_TEMA);
  } catch (e) {
    console.warn('No se pudo eliminar el tema guardado:', e);
  }

  // Ocultar panel personalizado
  const panel = document.getElementById('customColorsPanel');
  if (panel) {
    panel.classList.remove('visible');
  }

  showToast('Tema restablecido al valor por defecto');
}

/* ============================================================
 *  FUNCIONES DE WHATSAPP (para index.html)
 * ============================================================ */

/**
 * Genera el mensaje de WhatsApp con el pedido
 * @param {Array} items - Array de productos con cantidad
 * @param {Object} cliente - Datos del cliente
 * @returns {string} - Mensaje formateado para WhatsApp
 */
function generarMensajeWhatsApp(items, cliente) {
  const nombreNegocio = config.nombre || 'NØRDIKO';

  let mensaje = `Hola ${nombreNegocio}, quiero hacer un pedido:\n\n`;

  let total = 0;
  items.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    mensaje += `${item.emoji || '📦'} ${item.nombre} x${item.cantidad} - $${subtotal.toFixed(2)}\n`;
  });

  mensaje += `\nTotal: $${total.toFixed(2)}\n\n`;
  mensaje += `Nombre: ${cliente.nombre}\n`;
  mensaje += `Teléfono: ${cliente.telefono}\n`;
  mensaje += `Dirección: ${cliente.direccion}\n\n`;

  if (config.mensaje) {
    mensaje += `${config.mensaje}\n`;
  }

  mensaje += '¡Gracias!';

  return mensaje;
}

/**
 * Abre WhatsApp con el mensaje prellenado
 * @param {string} numero - Número de WhatsApp (sin +57)
 * @param {string} mensaje - Mensaje a enviar
 */
function abrirWhatsApp(numero, mensaje) {
  // Limpiar número (espacios, guiones, paréntesis)
  const numeroLimpio = numero.replace(/[\s\-\(\)]/g, '');

  // Codificar mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  // URL de WhatsApp
  const url = `https://wa.me/57${numeroLimpio}?text=${mensajeCodificado}`;

  // Abrir en nueva pestaña
  window.open(url, '_blank');
}

/* ============================================================
 *  CATEGORÍAS
 * ============================================================ */

const categoriaModal = document.getElementById('categoriaModal');
const categoriaForm = document.getElementById('categoriaForm');
const btnAgregarCategoria = document.getElementById('btnAgregarCategoria');
const btnCancelarCategoria = document.getElementById('btnCancelarCategoria');
const categoriaModalClose = document.getElementById('categoriaModalClose');
const categoriaModalTitle = document.getElementById('categoriaModalTitle');

let categoriaEditando = null;
let callbackConfirmacion = null;

// Sistema de confirmación genérico (productos y categorías)
function pedirConfirmacion(titulo, mensaje, callback) {
  const confirmTitle = document.getElementById('confirmTitle');
  const confirmMessage = document.getElementById('confirmMessage');
  confirmTitle.textContent = titulo;
  confirmMessage.textContent = mensaje;
  callbackConfirmacion = callback;
  confirmOverlay.classList.add('active');
}

// Renderizar lista de categorías
function renderCategorias() {
  const lista = document.getElementById('categoriasLista');
  const categorias = config.categorias || [];

  // Actualizar badge del menú
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

// Renderizar preview de filtros como se ven en la tienda
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

// Actualizar el select de categorías en el formulario de producto
function actualizarSelectCategorias() {
  const select = document.getElementById('prodCategoria');
  if (!select) return;
  const valorActual = select.value;
  const categorias = config.categorias || [];

  select.innerHTML = '<option value="">Seleccionar...</option>' +
    categorias.map(cat =>
      `<option value="${escapeHtml(cat.id)}">${escapeHtml(cat.nombre)}</option>`
    ).join('');

  // Mantener el valor seleccionado si aún existe
  if (valorActual && categorias.some(c => c.id === valorActual)) {
    select.value = valorActual;
  }
}

// Abrir modal para agregar categoría
if (btnAgregarCategoria) {
  btnAgregarCategoria.addEventListener('click', () => {
    categoriaEditando = null;
    categoriaModalTitle.innerHTML = 'Agregar <span>Categoría</span>';
    categoriaForm.reset();
    document.getElementById('categoriaEditandoId').value = '';
    const catCodigo = document.getElementById('catCodigo');
    catCodigo.readOnly = false;
    catCodigo.style.opacity = '1';
    catCodigo.style.cursor = 'text';
    categoriaModal.classList.add('active');
  });
}

// Cerrar modal de categoría
function cerrarCategoriaModal() {
  categoriaModal.classList.remove('active');
  categoriaEditando = null;
}

if (categoriaModalClose) categoriaModalClose.addEventListener('click', cerrarCategoriaModal);
if (btnCancelarCategoria) btnCancelarCategoria.addEventListener('click', cerrarCategoriaModal);

if (categoriaModal) {
  categoriaModal.addEventListener('click', (e) => {
    if (e.target === categoriaModal) {
      cerrarCategoriaModal();
    }
  });
}

// Guardar categoría (crear o actualizar)
if (categoriaForm) {
  categoriaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('catNombre').value.trim();
    let codigo = document.getElementById('catCodigo').value.trim().toLowerCase();
    const editandoId = document.getElementById('categoriaEditandoId').value;

    // Validaciones
    if (!nombre) {
      showToast('El nombre es obligatorio', 'error');
      return;
    }
    if (!codigo) {
      showToast('El código interno es obligatorio', 'error');
      return;
    }

    // Limpiar código: solo letras, números y guiones
    codigo = codigo.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    if (!codigo) {
      showToast('El código interno debe tener letras o números', 'error');
      return;
    }

    // Verificar que el código no esté repetido (excepto si es la misma categoría que se edita)
    const repetido = (config.categorias || []).some(c => c.id === codigo && c.id !== editandoId);
    if (repetido) {
      showToast('Ya existe una categoría con ese código', 'error');
      return;
    }

    if (editandoId) {
      // Editar categoría existente (el código interno NO cambia para no romper productos)
      const cat = (config.categorias || []).find(c => c.id === editandoId);
      if (cat) {
        cat.nombre = nombre;
        showToast('Categoría actualizada');
      }
    } else {
      // Agregar nueva categoría
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

// Abrir modal para editar categoría (solo se puede cambiar el nombre)
function editarCategoria(id) {
  const cat = (config.categorias || []).find(c => c.id === id);
  if (!cat) return;

  categoriaEditando = id;
  categoriaModalTitle.innerHTML = 'Editar <span>Categoría</span>';
  categoriaForm.reset();
  document.getElementById('categoriaEditandoId').value = id;
  document.getElementById('catNombre').value = cat.nombre;
  document.getElementById('catCodigo').value = cat.id;
  document.getElementById('catCodigo').readOnly = true;
  document.getElementById('catCodigo').style.opacity = '0.5';
  document.getElementById('catCodigo').style.cursor = 'not-allowed';
  categoriaModal.classList.add('active');
}

// Activar / desactivar categoría
function toggleCategoria(id) {
  const cat = (config.categorias || []).find(c => c.id === id);
  if (!cat) return;

  cat.activa = !cat.activa;
  guardarConfig();
  renderCategorias();
  showToast(cat.activa ? `"${cat.nombre}" ahora es visible en la tienda` : `"${cat.nombre}" está oculta en la tienda`);
}

// Confirmar eliminación de categoría
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

// Actualizar confirmación para usar el sistema genérico
btnConfirmarEliminar.addEventListener('click', () => {
  if (callbackConfirmacion) {
    callbackConfirmacion();
    callbackConfirmacion = null;
  }
  confirmOverlay.classList.remove('active');
});



/* ============================================================
 *  INICIALIZACIÓN
 * ============================================================ */

function initAdmin() {
  cargarDatos();
  cargarTema();
  cargarConfigEnFormulario();
  renderProductos();
  renderPedidos();
  renderDashboard();
  renderCategorias();
  actualizarSelectCategorias();
  initTemas();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}
