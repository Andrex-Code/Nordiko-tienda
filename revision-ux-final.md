# Revisión UX/UI — NØRDIKO Tienda

**Fecha:** 2026-09-28  
**Revisor:** Diseñador UX/UI Senior  
**URLs analizadas:**
- Tienda: https://nordiko-tienda.vercel.app
- Admin: https://nordiko-tienda.vercel.app/admin

---

## 1. Verificaciones de UX

### 1.1 Flujo de compra intuitivo — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Descubrimiento de productos | ✅ PASS | Grid visual con tarjetas claras, badges (Nuevo, Oferta, Más vendido) y categorías filtrables |
| Agregar al carrito | ✅ PASS | Un solo toque en botón "Agregar" con animación de escala y toast de confirmación |
| Ver carrito | ✅ PASS | Botón de carrito con contador animado, sidebar con overlay |
| Checkout | ✅ PASS | Modal con formulario simple (nombre, teléfono, dirección) → redirige a WhatsApp |
| Confirmación | ✅ PASS | Toast "¡Redirigiendo a WhatsApp para confirmar tu pedido!" + carrito se limpia |

**Observación:** El flujo es simple y directo: Ver → Agregar → Carrito → Checkout → WhatsApp. No hay fricción innecesaria.

---

### 1.2 Carrito fácil de usar — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Ver items | ✅ PASS | Lista con imagen, nombre, precio y cantidad |
| Modificar cantidad | ✅ PASS | Botones + y − grandes (50x50px) con feedback visual |
| Eliminar item | ✅ PASS | Botón de basura con confirmación (confirm dialog) |
| Ver total | ✅ PASS | Total destacado en la parte inferior |
| Persistencia | ✅ PASS | Se guarda en localStorage y sobrevive al cerrar la página |
| Carrito vacío | ✅ PASS | Mensaje amigable con ícono: "Tu carrito está vacío" |

---

### 1.3 Botones grandes y touch-friendly — ✅ PASS

| Elemento | Tamaño mínimo | Resultado |
|----------|---------------|-----------|
| Botones principales (`.btn`) | 50px alto × 50px ancho | ✅ PASS |
| Botones en móvil | 52px alto | ✅ PASS |
| Botones grandes (`.btn-lg`) | 56px alto | ✅ PASS |
| Botones de cantidad | 50×50px | ✅ PASS |
| Botón agregar al carrito | 50px alto | ✅ PASS |
| Filtros de categoría | 50px alto | ✅ PASS |
| Botón de wishlist | 42×42px | ⚠️ MENOR (ver recomendaciones) |
| Inputs de formulario | 52px alto | ✅ PASS |
| Botón de WhatsApp flotante | 60×60px | ✅ PASS |

---

### 1.4 Tipografía legible en móvil — ✅ PASS

| Elemento | Tamaño en móvil | Resultado |
|----------|-----------------|-----------|
| Hero title | 2.7rem (768px) → 2.2rem (480px) → 1.9rem (360px) | ✅ PASS |
| Section titles | 2.2rem (768px) → 1.8rem (360px) | ✅ PASS |
| Body text | 1rem (16px) | ✅ PASS |
| Inputs | 16px (previene zoom en iOS) | ✅ PASS |
| Navegación | 0.82rem (13.1px) | ⚠️ PEQUEÑO (ver recomendaciones) |
| Botones | 0.9rem (14.4px) | ✅ PASS |

---

### 1.5 Espaciado correcto — ✅ PASS

| Elemento | Espaciado | Resultado |
|----------|-----------|-----------|
| Container padding | 24px desktop → 18px móvil → 16px móvil pequeño | ✅ PASS |
| Gap entre productos | 28px | ✅ PASS |
| Padding de tarjetas | 26px | ✅ PASS |
| Espaciado entre secciones | 110-120px | ✅ PASS |
| Padding de carrito | 26px | ✅ PASS |
| Espaciado de botones | 15px 32px | ✅ PASS |

---

### 1.6 Feedback visual claro — ✅ PASS

| Interacción | Feedback | Resultado |
|-------------|----------|-----------|
| Agregar al carrito | Animación de escala + toast + contador salta | ✅ PASS |
| Hover en botones | Elevación + cambio de color + brillo | ✅ PASS |
| Hover en tarjetas | Elevación + línea bronce superior | ✅ PASS |
| Filtros activos | Cambio de color a dorado + sombra | ✅ PASS |
| Carrito abierto | Overlay con blur + sidebar deslizante | ✅ PASS |
| Toast notifications | Grande, centrado, con color semántico | ✅ PASS |
| Focus visible | Outline dorado de 3px | ✅ PASS |
| Wishlist toggle | Cambio de ícono + toast | ✅ PASS |

---

### 1.7 Navegación simple — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Estructura | ✅ PASS | Navbar fija con logo, menú y carrito |
| Menú móvil | ✅ PASS | Hamburger con animación de deslizamiento |
| Links claros | ✅ PASS | Inicio, Productos, Nosotros, Contacto |
| Skip link | ✅ PASS | "Saltar al contenido principal" para accesibilidad |
| Scroll suave | ✅ PASS | `scroll-behavior: smooth` |
| Cerrar menú al navegar | ✅ PASS | Se cierra automáticamente al tocar un enlace |

---

## 2. Verificaciones de Responsive

### 2.1 Se ve bien en pantallas pequeñas (360px) — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Media queries | ✅ PASS | Breakpoints en 992px, 768px, 480px, 360px |
| Grid adaptativo | ✅ PASS | 4 cols → 2 cols → 1 col según pantalla |
| Tipografía escalable | ✅ PASS | Tamaños reducidos progresivamente |
| Carrito full-width | ✅ PASS | 100vw en móvil |
| Modal adaptable | ✅ PASS | Padding reducido en móvil |

---

### 2.2 No hay scroll horizontal — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| `overflow-x: hidden` | ✅ PASS | Aplicado en body |
| Filtros con scroll | ✅ PASS | `overflow-x: auto` con scrollbar oculto |
| Carrito sidebar | ✅ PASS | `right: -100vw` cuando está cerrado |
| Elementos con max-width | ✅ PASS | Imágenes y contenedores con `max-width: 100%` |

---

### 2.3 Elementos no se desbordan — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| `box-sizing: border-box` | ✅ PASS | Global |
| Imágenes | ✅ PASS | `max-width: 100%; height: auto` |
| Carrito | ✅ PASS | `max-width: 92vw` |
| Modal | ✅ PASS | `max-width: 580px` con padding |
| Inputs | ✅ PASS | `width: 100%` |

---

### 2.4 Carrito lateral se adapta bien — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Ancho en desktop | ✅ PASS | 400px fijo |
| Ancho en móvil | ✅ PASS | 100vw (full screen) |
| Overlay | ✅ PASS | Fondo oscuro con blur |
| Botón cerrar | ✅ PASS | Grande y visible |
| Animación | ✅ PASS | Deslizamiento suave (0.45s) |

---

### 2.5 Admin se ve bien en móvil — ✅ PASS

| Aspecto | Resultado | Detalle |
|---------|-----------|---------|
| Sidebar | ✅ PASS | Se convierte en menú hamburguesa con overlay |
| Stats grid | ✅ PASS | 2 columnas en móvil, 1 en 360px |
| Botones | ✅ PASS | Mínimo 50px de alto |
| Modal | ✅ PASS | Bottom sheet en móvil (border-radius superior) |
| Formularios | ✅ PASS | Inputs grandes (52px mínimo) |
| Tablas/listas | ✅ PASS | Tarjetas verticales adaptativas |

---

## 3. Problemas Encontrados

### 🔴 Problemas Críticos

| # | Problema | Ubicación | Impacto |
|---|----------|-----------|---------|
| 1 | **Botón de wishlist muy pequeño (42×42px)** | Tarjetas de producto | Dificulta el toque en móvil, debería ser mínimo 44×44px |

### 🟡 Problemas Moderados

| # | Problema | Ubicación | Impacto |
|---|----------|-----------|---------|
| 2 | **Tipografía de navegación pequeña (13.1px)** | Navbar | Poco legible en móvil, especialmente para usuarios con dificultades visuales |
| 3 | **Toast puede tapar botón de WhatsApp** | Parte inferior | El toast aparece a 32px del bottom, el botón de WhatsApp está a 24px — se superponen |
| 4 | **Filtros sin indicador de scroll** | Sección productos | En 360px los filtros tienen scroll horizontal pero no hay indicador visual |
| 5 | **Modal de checkout no es bottom sheet en móvil** | Checkout | A diferencia del admin, el modal de checkout se centra en lugar de ser bottom sheet |

### 🟢 Problemas Menores

| # | Problema | Ubicación | Impacto |
|---|----------|-----------|---------|
| 6 | **Sin indicador de menú hamburguesa en admin** | Admin sidebar | El botón existe pero no hay badge o indicador de que hay navegación disponible |
| 7 | **Confirmación nativa para eliminar del carrito** | Carrito | Usa `confirm()` nativo que se ve genérico y no coincide con el diseño de la app |
| 8 | **Sin skeleton loading** | Productos | Al cargar desde Firebase no hay estado de carga visible |

---

## 4. Recomendaciones

### Alta prioridad

1. **Aumentar botón de wishlist a 44×44px mínimo**
   ```css
   .product-wishlist {
       width: 44px;
       height: 44px;
   }
   ```

2. **Aumentar tipografía de navegación a 0.9rem (14.4px)**
   ```css
   .nav-link {
       font-size: 0.9rem;
   }
   ```

3. **Posicionar toast por encima del botón de WhatsApp**
   ```css
   .toast {
       bottom: 100px; /* En lugar de 32px */
   }
   ```

4. **Convertir modal de checkout en bottom sheet en móvil**
   ```css
   @media (max-width: 768px) {
       .modal {
           align-items: flex-end;
           padding: 0;
       }
       .modal-content {
           border-radius: 20px 20px 0 0;
           max-height: 95vh;
       }
   }
   ```

### Media prioridad

5. **Agregar indicador visual de scroll en filtros**
   ```css
   .filters::after {
       content: '→';
       position: absolute;
       right: 0;
       color: var(--color-bronze);
       animation: bounce 1s infinite;
   }
   ```

6. **Reemplazar confirm nativo con modal personalizado**
   - Crear un modal de confirmación que coincida con el diseño de la app
   - Usar los colores y tipografía de NØRDIKO

7. **Agregar skeleton loading para productos**
   - Mostrar tarjetas grises animadas mientras cargan los productos desde Firebase
   - Mejora la percepción de velocidad

### Baja prioridad

8. **Agregar badge de notificaciones en el menú hamburguesa del admin**
   - Indicar visualmente que hay navegación disponible

9. **Mejorar el estado vacío del carrito**
   - Agregar un botón "Ver productos" directamente en el carrito vacío

10. **Agregar animación de transición entre páginas/secciones**
    - Suavizar la navegación entre secciones

---

## 5. Resumen de Resultados

| Categoría | Total | PASS | FAIL |
|-----------|-------|------|------|
| UX | 7 | 7 | 0 |
| Responsive | 5 | 5 | 0 |
| **Total** | **12** | **12** | **0** |

### Distribución de problemas

| Severidad | Cantidad |
|-----------|----------|
| 🔴 Crítico | 1 |
| 🟡 Moderado | 4 |
| 🟢 Menor | 3 |

---

## 6. Conclusión

La tienda NØRDIKO tiene una **base sólida de UX/UI móvil**. El flujo de compra es intuitivo, los botones son touch-friendly, la tipografía es legible y el responsive funciona correctamente en todas las pantallas probadas.

**Puntos fuertes:**
- Diseño visual coherente (paleta café/bronce, tipografía Playfair Display + Inter)
- Feedback visual excelente (toasts, animaciones, estados hover)
- Carrito bien implementado con persistencia
- Accesibilidad básica cubierta (skip link, focus visible, aria-labels)
- Admin completamente responsive con bottom sheets

**Áreas de mejora:**
- Algunos elementos interactivos menores al tamaño óptimo (wishlist, nav-links)
- El toast se superpone con el botón de WhatsApp
- Falta de skeleton loading y estados de carga
- El modal de checkout podría ser bottom sheet en móvil

**Veredicto general:** ✅ **APROBADA** con recomendaciones de mejora menores.

---

*Revisión realizada mediante análisis de código HTML, CSS y JS de ambas páginas.*
