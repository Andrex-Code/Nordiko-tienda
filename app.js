/**
 * ============================================
 * NØRDIKO — TIENDA MÓVIL INTUITIVA
 * ============================================
 *
 * Diseñada para usuarios no técnicos en Android.
 * Todo se puede usar con una mano, con botones grandes
 * y feedback inmediato.
 *
 * PRINCIPIOS:
 * - Móvil primero: todo al alcance del pulgar
 * - Botones grandes: mínimo 50px de alto
 * - Un solo toque para agregar al carrito
 * - Confirmaciones claras antes de acciones importantes
 * - Cero jerga técnica: textos simples en español
 * - Animaciones suaves que se sienten fluidas
 * - Si algo falla, mensaje claro y amigable
 *
 * MEJORAS APLICADAS:
 * - Escape HTML para prevenir XSS
 * - IIFE para evitar contaminación del namespace global
 * - Validación de datos de localStorage
 * - formatearPrecio robusto (maneja NaN y negativos)
 * - Lazy loading en imágenes
 */

(function () {
    'use strict';

    // ============================================
    // 0. UTILIDAD — ESCAPE HTML (Anti-XSS)
    // ============================================

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

    // ============================================
    // 1. DATOS POR DEFECTO — 12 PRODUCTOS NØRDIKO
    // ============================================

    const productosDefault = [
        {
            id: 1,
            nombre: "Hidratante Montaña",
            categoria: "hidratante",
            descripcion: "Frescura de las montañas del Eje Cafetero. Absorción rápida, sin grasa.",
            precio: 350,
            icono: "🏔️",
            badge: "bestseller"
        },
        {
            id: 2,
            nombre: "Loción Corporal Cumbre",
            categoria: "corporal",
            descripcion: "Nutrición intensa con manteca de karité y café arábica. Para llegar más alto.",
            precio: 320,
            icono: "⛰️",
            badge: ""
        },
        {
            id: 3,
            nombre: "Sérum Facial Origen",
            categoria: "facial",
            descripcion: "Vitamina C y extracto de uva de la región. Energía para tu piel.",
            precio: 480,
            icono: "🍇",
            badge: "new"
        },
        {
            id: 4,
            nombre: "Antiedad Legado",
            categoria: "ante-envejecimiento",
            descripcion: "Colágeno marino y café arábica. Lo que perdura, lo que se nota.",
            precio: 550,
            precioAnterior: 650,
            icono: "🏛️",
            badge: "sale"
        },
        {
            id: 5,
            nombre: "Hidratante Bosque",
            categoria: "hidratante",
            descripcion: "Aloe vera y eucalipto. Calma y protege las pieles exigentes.",
            precio: 290,
            icono: "🌲",
            badge: ""
        },
        {
            id: 6,
            nombre: "Loción Corporal Café",
            categoria: "corporal",
            descripcion: "Café arábica puro de origen. Nutrición que despierta los sentidos.",
            precio: 340,
            icono: "☕",
            badge: ""
        },
        {
            id: 7,
            nombre: "Crema Facial Noche",
            categoria: "facial",
            descripcion: "Retinol y ceramidas. Regeneración mientras duermes.",
            precio: 620,
            icono: "🌙",
            badge: "new"
        },
        {
            id: 8,
            nombre: "Reafirmante Estatus",
            categoria: "ante-envejecimiento",
            descripcion: "Coenzima Q10 y elastina. Firmeza, presencia, confianza.",
            precio: 580,
            precioAnterior: 700,
            icono: "💎",
            badge: "sale"
        },
        {
            id: 9,
            nombre: "Hidratante Aroma",
            categoria: "hidratante",
            descripcion: "Manzanilla y lavanda. Suavidad para pieles sensibles.",
            precio: 310,
            icono: "🌿",
            badge: ""
        },
        {
            id: 10,
            nombre: "Loción Corporal Tierra",
            categoria: "corporal",
            descripcion: "Manteca de karité y cacao. Nutrición profunda, raíces profundas.",
            precio: 360,
            icono: "🌍",
            badge: ""
        },
        {
            id: 11,
            nombre: "Gel Facial Fresco",
            categoria: "facial",
            descripcion: "Ácido hialurónico y menta. Hidratación ligera, refrescante.",
            precio: 450,
            icono: "💧",
            badge: "bestseller"
        },
        {
            id: 12,
            nombre: "Aftershave Clásico",
            categoria: "corporal",
            descripcion: "Cuidado post-afeitado con extracto de café. Sin alcohol, máximo confort.",
            precio: 280,
            icono: "🪒",
            badge: ""
        }
    ];

    // ============================================
    // 2. CARGAR PRODUCTOS DESDE LOCALSTORAGE
    // ============================================

    /**
     * Carga los productos guardados en el teléfono.
     * Si no hay productos guardados o hay un error,
     * usa los 12 productos por defecto.
     * Valida que cada producto tenga los campos mínimos.
     */
    function cargarProductos() {
        try {
            const productosGuardados = localStorage.getItem('nordiko_productos');
            if (productosGuardados) {
                const productos = JSON.parse(productosGuardados);
                // Verificar que sea un array válido con productos bien formados
                if (Array.isArray(productos) && productos.length > 0) {
                    return productos.filter(p =>
                        p && p.id && p.nombre && p.precio && p.categoria
                    );
                }
            }
        } catch (e) {
            // Si algo falla, avisar suavemente y continuar con los datos por defecto
            console.warn('No se pudieron cargar los productos guardados. Usando los de siempre.');
        }
        return productosDefault;
    }

    // ============================================
    // 3. ESTADO DE LA APLICACIÓN
    // ============================================

    let productos = cargarProductos();
    let carrito = [];
    let filtroActual = 'todos';
    let busquedaActual = '';

    // ============================================
    // 4. ELEMENTOS DEL DOM
    // ============================================

    const productsGrid = document.getElementById('productsGrid');
    const cartBtn = document.getElementById('cartBtn');
    const cartCount = document.getElementById('cartCount');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const modalClose = document.getElementById('modalClose');
    const modalTotal = document.getElementById('modalTotal');
    const toast = document.getElementById('toast');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsletterForm = document.getElementById('newsletterForm');
    const contactForm = document.getElementById('contactForm');
    const checkoutForm = document.getElementById('checkoutForm');

    // ============================================
    // 5. FUNCIONES AUXILIARES
    // ============================================

    /**
     * Convierte el código de categoría a un nombre bonito y simple.
     */
    function obtenerNombreCategoria(categoria) {
        const nombres = {
            'hidratante': 'Hidratante',
            'corporal': 'Corporal',
            'facial': 'Facial',
            'ante-envejecimiento': 'Antiedad'
        };
        return nombres[categoria] || categoria;
    }

    /**
     * Convierte el código de badge a texto simple en español.
     */
    function obtenerTextoBadge(badge) {
        const textos = {
            'sale': 'Oferta',
            'new': 'Nuevo',
            'bestseller': 'Más vendido'
        };
        return textos[badge] || '';
    }

    /**
     * Formatea un número como precio en pesos colombianos.
     * Maneja NaN y números negativos de forma segura.
     * Formato colombiano: $350.000 (sin decimales, separador de miles con punto)
     */
    function formatearPrecio(precio) {
        const num = Number(precio);
        if (isNaN(num) || num < 0) return '$0.000';
        // Formato colombiano: $350.000 (sin decimales, separador de miles con punto)
        return '$' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // ============================================
    // 6. NOTIFICACIONES (TOAST) — GRANDES Y CLARAS
    // ============================================

    /**
     * Muestra un mensaje grande y claro en la parte baja de la pantalla.
     * Desaparece solo después de unos segundos.
     *
     * @param {string} mensaje - Texto simple y directo
     * @param {string} tipo - 'success' (verde) o 'error' (rojo)
     */
    function mostrarToast(mensaje, tipo = 'success') {
        // Limpiar cualquier toast anterior que esté visible
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
        }

        toast.textContent = mensaje;
        toast.className = `toast ${tipo} show`;

        // Desaparecer después de 3.5 segundos
        toast.timeoutId = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // ============================================
    // 7. RENDERIZAR PRODUCTOS — TARJETAS GRANDES
    // ============================================

    /**
     * Dibuja las tarjetas de productos en la pantalla.
     * Cada tarjeta tiene un botón grande de "Agregar" fácil de tocar.
     * NOTA: Todo el contenido dinámico se escapa con escapeHtml() para prevenir XSS.
     */
    function renderizarProductos(filtro = 'todos', busqueda = '') {
        // Filtrar por categoría
        let productosFiltrados = filtro === 'todos'
            ? productos
            : productos.filter(p => p.categoria === filtro);

        // Filtrar por búsqueda (sin importar mayúsculas)
        if (busqueda.trim() !== '') {
            const termino = busqueda.toLowerCase().trim();
            productosFiltrados = productosFiltrados.filter(p =>
                p.nombre.toLowerCase().includes(termino) ||
                p.descripcion.toLowerCase().includes(termino)
            );
        }

        // Si no hay productos, mostrar mensaje amigable
        if (productosFiltrados.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #888;">
                    <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 16px; display: block;"></i>
                    <p style="font-size: 1.1rem; margin-bottom: 8px;">No encontramos productos</p>
                    <p style="font-size: 0.9rem;">Intenta con otra palabra o categoría</p>
                </div>
            `;
            return;
        }

        // Dibujar cada tarjeta de producto — TODO escapeado con escapeHtml()
        productsGrid.innerHTML = productosFiltrados.map(producto => {
            const textoBadge = obtenerTextoBadge(producto.badge);
            const badgeHTML = textoBadge
                ? `<span class="product-badge ${producto.badge}">${textoBadge}</span>`
                : '';

            const imagenHTML = producto.imagen
                ? `<img src="${escapeHtml(producto.imagen)}" alt="${escapeHtml(producto.nombre)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
                : `<span style="font-size: 5rem;">${escapeHtml(producto.icono || '🧴')}</span>`;

            const precioAnteriorHTML = producto.precioAnterior
                ? `<span class="old-price">${formatearPrecio(producto.precioAnterior)}</span>`
                : '';

            return `
                <div class="product-card" data-id="${escapeHtml(producto.id)}">
                    <div class="product-image">
                        ${badgeHTML}
                        <button class="product-wishlist" data-wishlist-id="${escapeHtml(producto.id)}" aria-label="Me gusta">
                            <i class="far fa-heart"></i>
                        </button>
                        ${imagenHTML}
                    </div>
                    <div class="product-info">
                        <div class="product-category">${escapeHtml(obtenerNombreCategoria(producto.categoria))}</div>
                        <h3 class="product-name">${escapeHtml(producto.nombre)}</h3>
                        <p class="product-desc">${escapeHtml(producto.descripcion)}</p>
                        <div class="product-footer">
                            <div class="product-price">
                                ${formatearPrecio(producto.precio)}
                                ${precioAnteriorHTML}
                            </div>
                            <button class="add-to-cart" data-id="${escapeHtml(producto.id)}" aria-label="Agregar al carrito">
                                <i class="fas fa-plus"></i>
                                <span style="font-size: 0.75rem; font-weight: 700; margin-left: 4px;">Agregar</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Agregar eventos a los botones de "Agregar"
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                agregarAlCarrito(id, e.currentTarget);
            });
        });

        // Agregar eventos a los botones de favoritos
        document.querySelectorAll('.product-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('active');
                const icon = e.currentTarget.querySelector('i');
                if (e.currentTarget.classList.contains('active')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    mostrarToast('Lo guardaste en tus favoritos', 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            });
        });
    }

    // ============================================
    // 8. CARRITO — SIMPLE Y CON ANIMACIONES
    // ============================================

    /**
     * Agrega un producto al carrito con animación de "vuelo".
     * Un solo toque y listo.
     */
    function agregarAlCarrito(id, boton) {
        const producto = productos.find(p => p.id === id);
        if (!producto) {
            mostrarToast('Ups, no encontramos ese producto', 'error');
            return;
        }

        // Verificar si ya está en el carrito
        const itemExistente = carrito.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        // Animación: el botón se agranda brevemente
        if (boton) {
            boton.style.transform = 'scale(1.2)';
            boton.style.transition = 'transform 0.15s ease';
            setTimeout(() => {
                boton.style.transform = 'scale(1)';
            }, 150);
        }

        // Animación: el contador del carrito "salta"
        cartCount.style.transform = 'scale(1.4)';
        cartCount.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);

        actualizarCarrito();
        guardarCarrito();

        // Toast grande y claro
        mostrarToast(`${producto.nombre} agregado al carrito`, 'success');
    }

    /**
     * Elimina un producto del carrito con confirmación.
     * Pregunta antes de borrar para no perderlo por accidente.
     */
    function eliminarDelCarrito(id) {
        const item = carrito.find(item => item.id === id);
        if (!item) return;

        // Confirmación simple y clara
        if (confirm(`¿Quieres quitar "${item.nombre}" del carrito?`)) {
            carrito = carrito.filter(item => item.id !== id);
            actualizarCarrito();
            mostrarToast('Producto quitado del carrito', 'success');
        }
    }

    /**
     * Cambia la cantidad de un producto en el carrito.
     * Botones + y - grandes para usar con el pulgar.
     */
    function cambiarCantidad(id, delta) {
        const item = carrito.find(item => item.id === id);
        if (item) {
            item.cantidad += delta;
            if (item.cantidad <= 0) {
                // Si llega a cero, preguntar si quiere quitarlo
                eliminarDelCarrito(id);
            } else {
                actualizarCarrito();
            }
        }
    }

    /**
     * Actualiza la vista del carrito: items, total y contador.
     * NOTA: Todo el contenido dinámico se escapa con escapeHtml() para prevenir XSS.
     */
    function actualizarCarrito() {
        // Calcular cuántos productos hay en total
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = totalItems;

        // Dibujar los items del carrito
        if (carrito.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <p style="font-size: 1.1rem; margin-bottom: 8px;">Tu carrito está vacío</p>
                    <p style="font-size: 0.9rem; color: #888;">¡Agrega productos para comenzar!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = carrito.map(item => {
                const imagenHTML = item.imagen
                    ? `<img src="${escapeHtml(item.imagen)}" alt="${escapeHtml(item.nombre)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`
                    : `<span style="font-size: 2.5rem;">${escapeHtml(item.icono || '🧴')}</span>`;

                return `
                    <div class="cart-item" data-cart-id="${escapeHtml(item.id)}">
                        <div class="cart-item-image">
                            ${imagenHTML}
                        </div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${escapeHtml(item.nombre)}</div>
                            <div class="cart-item-price">${formatearPrecio(item.precio)}</div>
                            <div class="cart-item-qty">
                                <button class="qty-btn" data-action="decrease" data-id="${escapeHtml(item.id)}" aria-label="Quitar uno">−</button>
                                <span style="font-size: 1.1rem; font-weight: 700; min-width: 30px; text-align: center;">${item.cantidad}</span>
                                <button class="qty-btn" data-action="increase" data-id="${escapeHtml(item.id)}" aria-label="Agregar uno">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" data-action="remove" data-id="${escapeHtml(item.id)}" aria-label="Quitar del carrito">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');

            // Agregar eventos a los botones del carrito (delegación de eventos)
            cartItems.querySelectorAll('.qty-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.id);
                    const action = btn.dataset.action;
                    cambiarCantidad(id, action === 'increase' ? 1 : -1);
                });
            });

            cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.dataset.id);
                    eliminarDelCarrito(id);
                });
            });
        }

        // Calcular y mostrar el total
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        cartTotal.textContent = formatearPrecio(total);
        modalTotal.textContent = formatearPrecio(total);
        
        // Guardar carrito en localStorage
        guardarCarrito();
    }

    // ============================================
    // 9. SIDEBAR DEL CARRITO — FÁCIL DE USAR
    // ============================================

    // ============================================
    // 8.1 PERSISTENCIA DEL CARRITO
    // ============================================

    function guardarCarrito() {
        try {
            localStorage.setItem('nordiko_carrito', JSON.stringify(carrito));
        } catch (e) {
            console.warn('No se pudo guardar el carrito:', e);
        }
    }

    function cargarCarrito() {
        try {
            const carritoGuardado = localStorage.getItem('nordiko_carrito');
            if (carritoGuardado) {
                const datos = JSON.parse(carritoGuardado);
                if (Array.isArray(datos)) {
                    // Validar que cada item tenga los campos mínimos
                    carrito = datos.filter(item => item && item.id && item.nombre && item.precio);
                }
            }
        } catch (e) {
            console.warn('No se pudo cargar el carrito:', e);
            carrito = [];
        }
    }

    function abrirCarrito() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function cerrarCarrito() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', abrirCarrito);
    cartClose.addEventListener('click', cerrarCarrito);
    cartOverlay.addEventListener('click', cerrarCarrito);

    // ============================================
    // 10. FILTROS — BOTONES GRANDES Y SIMPLES
    // ============================================

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar "activo" de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Poner "activo" solo al que se tocó
            btn.classList.add('active');
            // Guardar el filtro y volver a dibujar
            filtroActual = btn.dataset.filter;
            renderizarProductos(filtroActual, busquedaActual);
        });
    });

    // ============================================
    // 11. BUSCADOR — ENCONTRAR PRODUCTOS RÁPIDO
    // ============================================

    /**
     * Busca productos mientras el usuario escribe.
     * Filtra en tiempo real, sin necesidad de tocar "buscar".
     */
    function buscarProductos(termino) {
        busquedaActual = termino;
        renderizarProductos(filtroActual, busquedaActual);
    }

    // Si existe un campo de búsqueda en la página, conectarlo
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            buscarProductos(e.target.value);
        });
    }

    // ============================================
    // 12. MODAL DE CHECKOUT — SIMPLE Y CLARO
    // ============================================

    checkoutBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            mostrarToast('Tu carrito está vacío. Agrega algo primero.', 'error');
            return;
        }
        cerrarCarrito();
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /**
     * Procesa el pedido enviándolo por WhatsApp.
     * Pide nombre, teléfono y dirección, luego abre WhatsApp con el pedido.
     */
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener datos del cliente
        const nombre = document.getElementById('customerName').value.trim();
        const telefono = document.getElementById('customerPhone').value.trim();
        const direccion = document.getElementById('customerAddress').value.trim();
        const notas = document.getElementById('customerNotes').value.trim();

        if (!nombre || !telefono || !direccion) {
            mostrarToast('Por favor completa todos los campos', 'error');
            return;
        }

        // Validar teléfono colombiano (10 dígitos, puede empezar con 3 o 57)
        const telefonoLimpio = telefono.replace(/[\s\-\(\)\+]/g, '');
        if (!(/^[3][0-9]{9}$/.test(telefonoLimpio) || /^57[3][0-9]{9}$/.test(telefonoLimpio))) {
            mostrarToast('Ingresa un teléfono válido (10 dígitos, ej: 3001234567)', 'error');
            return;
        }

        // Obtener número de WhatsApp configurado
        let config = {};
        try {
            const configGuardada = localStorage.getItem('nordiko_config');
            if (configGuardada) {
                config = JSON.parse(configGuardada);
            }
        } catch (e) {
            console.warn('Error cargando configuración:', e);
        }

        const whatsappNumber = config.whatsapp || '573001234567';

        // Construir mensaje de WhatsApp
        let mensaje = `Hola NØRDIKO, quiero hacer un pedido:%0A%0A`;

        carrito.forEach(item => {
            mensaje += `${item.icono || ''} ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}%0A`;
        });

        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        mensaje += `%0A💰 Total: $${total.toFixed(2)}%0A%0A`;
        mensaje += `👤 Nombre: ${nombre}%0A`;
        mensaje += `📱 Teléfono: ${telefono}%0A`;
        mensaje += `📍 Dirección: ${direccion}%0A`;

        if (notas) {
            mensaje += `📝 Notas: ${notas}%0A`;
        }

        mensaje += `%0A¡Gracias! 🙌`;

        // Abrir WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensaje}`;
        window.open(whatsappURL, '_blank');

        // Limpiar carrito
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        mostrarToast('¡Redirigiendo a WhatsApp para confirmar tu pedido!', 'success');
    });

    // ============================================
    // 13. NAVBAR — MENÚ HAMBURGUESA EN MÓVIL
    // ============================================

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al tocar un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ============================================
    // 14. FORMULARIOS — NEWSLETTER Y CONTACTO
    // ============================================

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        newsletterForm.reset();
        mostrarToast('¡Gracias por suscribirte! Revisa tu correo para el cupón.', 'success');
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('contactName').value.trim();
        const telefono = document.getElementById('contactPhone').value.trim();
        const mensaje = document.getElementById('contactMessage').value.trim();
        
        if (!nombre || !mensaje) {
            mostrarToast('Por favor completa tu nombre y mensaje', 'error');
            return;
        }
        
        // Obtener número de WhatsApp configurado
        let config = {};
        try {
            const configGuardada = localStorage.getItem('nordiko_config');
            if (configGuardada) {
                config = JSON.parse(configGuardada);
            }
        } catch (e) {
            console.warn('Error cargando configuración:', e);
        }
        
        const whatsappNumber = config.whatsapp || '573128439577';
        
        // Construir mensaje de WhatsApp
        let wppMensaje = `Hola NØRDIKO, me gustaría contactarlos:%0A%0A`;
        wppMensaje += `👤 Nombre: ${nombre}%0A`;
        if (telefono) {
            wppMensaje += `📱 Teléfono: ${telefono}%0A`;
        }
        wppMensaje += `📝 Mensaje: ${mensaje}%0A%0A`;
        wppMensaje += `¡Gracias! 🙌`;
        
        // Abrir WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${wppMensaje}`;
        window.open(whatsappURL, '_blank');
        
        contactForm.reset();
        mostrarToast('¡Redirigiendo a WhatsApp!', 'success');
    });

    // ============================================
    // 15. TECLA ESC — CERRAR VENTANAS
    // ============================================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarCarrito();
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });



    // ============================================
    // 17. INICIALIZACIÓN
    // ============================================

    // Cargar carrito guardado antes de renderizar
    cargarCarrito();

    // Dibujar productos al cargar
    renderizarProductos();

    // Dibujar carrito (cargado o vacío)
    actualizarCarrito();

    // Exponer funciones globales para footer y navegación
    window.setFilter = setFilter;
    window.showLegal = showLegal;

    // ============================================
    // 18. FUNCIONES AUXILIARES PARA FOOTER Y NAVEGACIÓN
    // ============================================

    /**
     * Establece el filtro de productos y hace scroll a la sección de productos.
     * @param {string} filtro - Categoría a filtrar
     */
    function setFilter(filtro) {
        filtroActual = filtro;
        
        // Actualizar botones de filtro
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filtro);
        });
        
        // Renderizar productos con el filtro
        renderizarProductos(filtroActual, busquedaActual);
        
        // Hacer scroll a productos
        const productosSection = document.getElementById('productos');
        if (productosSection) {
            productosSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Muestra el modal de legal (privacidad, términos, cookies).
     * @param {string} tipo - Tipo de documento legal
     */
    function showLegal(tipo) {
        const titulos = {
            privacidad: 'Aviso de Privacidad',
            terminos: 'Términos y Condiciones',
            cookies: 'Política de Cookies'
        };
        
        const contenidos = {
            privacidad: `
                <h4>1. Datos que recopilamos</h4>
                <p>Recopilamos tu nombre, teléfono y dirección únicamente para procesar tu pedido.</p>
                
                <h4>2. Uso de los datos</h4>
                <p>Usamos tu información solo para: procesar pedidos, coordinar entregas y soporte al cliente.</p>
                
                <h4>3. Protección</h4>
                <p>Tus datos se almacenan de forma segura y nunca se comparten con terceros.</p>
                
                <h4>4. Contacto</h4>
                <p>Para ejercer tus derechos sobre tus datos, escríbenos por WhatsApp.</p>
            `,
            terminos: `
                <h4>1. Pedidos</h4>
                <p>Los pedidos se confirman por WhatsApp. El pago se acuerda directamente con el vendedor.</p>
                
                <h4>2. Entregas</h4>
                <p>Realizamos entregas personales en el Eje Cafetero. Envío gratis en pedidos desde $50.000.</p>
                
                <h4>3. Devoluciones</h4>
                <p>Aceptamos devoluciones dentro de los 7 días si el producto tiene defectos de fabricación.</p>
                
                <h4>4. Garantía</h4>
                <p>Todos los productos tienen garantía de satisfacción. Si no te gusta, te devolvemos el dinero.</p>
            `,
            cookies: `
                <h4>1. ¿Qué son las cookies?</h4>
                <p>Las cookies son archivos pequeños que se guardan en tu teléfono para mejorar tu experiencia.</p>
                
                <h4>2. Uso en NØRDIKO</h4>
                <p>Usamos cookies para: recordar tu carrito y analizar el uso.</p>
                
                <h4>3. Control</h4>
                <p>Puedes desactivar las cookies desde la configuración de tu navegador, pero algunas funciones pueden no funcionar.</p>
            `
        };
        
        // Crear modal si no existe
        let modal = document.getElementById('legalModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal';
            modal.id = 'legalModal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close" onclick="document.getElementById('legalModal').classList.remove('active')" aria-label="Cerrar">&times;</button>
                    <h2 id="legalTitle"></h2>
                    <div id="legalContent" style="max-height: 60vh; overflow-y: auto; line-height: 1.8; color: var(--color-text-light); font-size: 0.95rem;"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        // Llenar contenido
        document.getElementById('legalTitle').textContent = titulos[tipo] || 'Legal';
        document.getElementById('legalContent').innerHTML = contenidos[tipo] || '<p>Contenido no disponible.</p>';
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Cerrar al tocar fuera
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };
    }

})();
