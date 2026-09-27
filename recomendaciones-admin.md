# Recomendaciones de Funciones — Panel de Administración NØRDIKO

> **Fecha:** Septiembre 2026  
> **Consultor:** Especialista en negocios digitales para pequeños emprendimientos  
> **Cliente:** Daniel — NØRDIKO, La Virginia, Risaralda, Colombia  
> **Contexto:** Loción masculina premium, venta por WhatsApp (312 843 9577), sin conocimiento técnico, usuario Android, presupuesto limitado

---

## Resumen Ejecutivo

El panel actual de NØRDIKO es funcional para operaciones básicas (productos, categorías, ajustes). Sin embargo, para que Daniel pueda **vender más fácilmente**, **mejorar su negocio** y **no complicarse la vida**, necesita funciones que automaticen tareas repetitivas, le tomen menos tiempo administrando y le ayuden a vender más mientras duerme.

Las recomendaciones están organizadas en tres prioridades:

- **P0 — Críticas:** Sin estas, Daniel pierde ventas o tiempo valioso todos los días.
- **P1 — Muy útiles:** Mejoran significativamente la operación y la experiencia del cliente.
- **P2 — Futuras:** Listas para cuando el negocio crezca (envíos, más categorías, equipos).

---

## P0 — FUNCIONES PRIORITARIAS (Implementar YA)

### 1. Gestión de Pedidos con Estados y Notificaciones

**Qué es:** Una sección de pedidos donde Daniel vea cada pedido con su estado (Pendiente → Enviado → Entregado → Cancelado), datos del cliente, productos y total.

**Por qué es crítica:**
- Hoy los pedidos son datos "quemados" en el código (`let pedidos = [...]` en `admin.js`). Daniel NO puede marcar un pedido como entregado, ni editarlo, ni ver el historial real.
- Sin un registro de pedidos reales, Daniel no sabe qué vendió, cuándo, ni a quién.
- Es imposible hacer seguimiento a un cliente sin saber qué compró antes.

**Cómo debería funcionar:**
- Lista de pedidos con filtros por estado y fecha.
- Al hacer clic en un pedido: detalle completo (cliente, WhatsApp, productos, total, dirección).
- Botón para cambiar estado con un toque (ej: "Marcar como enviado").
- Los pedidos se guardan en `localStorage` como los productos.

**Esfuerzo:** Medio. Es la función que más impacto tiene en el día a día.

---

### 2. Copia de Seguridad (Exportar / Importar Datos)

**Qué es:** Un botón que descargue un archivo con todos los datos de la tienda (productos, categorías, configuración) y otro para restaurarlos.

**Por qué es crítica:**
- TODO está en `localStorage`. Si Daniel cambia de celular, limpia el navegador, o el almacenamiento se borra, **pierde todo**.
- En Android, el `localStorage` puede limpiarse solo cuando el sistema necesita espacio.
- Sin backup, un descuido puede costarle horas de trabajo reconstruyendo el catálogo.

**Cómo debería funcionar:**
- Botón "Descargar copia de seguridad" → descarga un archivo `.json`.
- Botón "Restaurar copia" → sube el archivo y restaura todo.
- Ideal: opción de exportar también como Excel/CSV para ver en celular.

**Esfuerzo:** Bajo. Dos botones y unas líneas de código. Retorno enorme.

---

### 3. Alertas de Stock Bajo

**Qué es:** Un aviso visual en el dashboard y en la lista de productos cuando un producto tiene menos de 5 unidades (o el mínimo que Daniel defina).

**Por qué es crítica:**
- Si un producto se agota y Daniel no lo sabe, rechaza pedidos o cancela ventas.
- En un negocio pequeño, cada venta perdida es significativa.
- El dashboard actual muestra estadísticas generales pero NO alertas accionables.

**Cómo debería funcionar:**
- En el dashboard: tarjeta roja/amarilla "3 productos con stock bajo".
- En la lista de productos: badge rojo "¡Quedan 2!".
- Configurable: Daniel define el mínimo por producto o global.

**Esfuerzo:** Bajo. Solo mostrar un indicador basado en el campo `stock` que ya existe.

---

### 4. Pedido Rápido por WhatsApp con Lista de Productos

**Qué es:** Un botón en cada pedido que abra WhatsApp con el mensaje ya armado con los productos, precios y datos del cliente.

**Por qué es crítica:**
- Hoy Daniel debe copiar y pegar texto manualmente para responder cada pedido.
- Un mensaje pre-armado ahorra 2-3 minutos por pedido, lo que sumado a 10 pedidos diarios son 30 minutos.
- Reduce errores al escribir (precios, nombres).

**Cómo debería funcionar:**
- En cada pedido, botón "Enviar por WhatsApp" → abre WhatsApp con mensaje tipo:
  ```
  ¡Gracias por tu pedido, [Nombre]!
  
  Tu pedido:
  • Hidratante Montaña x1 — $350
  • Sérum Facial Origen x2 — $960
  
  Total: $1,310
  
  ¿Te parece bien si te lo envío hoy?
  ```

**Esfuerzo:** Bajo. Solo construir el mensaje y abrir el enlace de WhatsApp.

---

### 5. Categorías con Ícono Visual y Orden Personalizado

**Qué es:** Permitir asignarle un emoji o ícono a cada categoría y cambiar el orden en que aparecen en la tienda.

**Por qué es útil:**
- Daniel quiere vender relojes, gorras y ropa en el futuro. Cada categoría necesita un ícono distintivo (⌚ 🧢 👕).
- El orden de las categorías define qué ve primero el cliente. "Loción" debería estar primero, no última.
- Hoy las categorías son texto plano sin identidad visual.

**Cómo debería funcionar:**
- En Categorías: campo para emoji/ícono + opción de arrastrar para reordenar.
- En la tienda: cada categoría muestra su ícono junto al nombre.

**Esfuerzo:** Bajo. Solo un campo adicional y orden en el array.

---

### 6. Precio con Descuento Visible (Precio Anterior Tachado)

**Qué es:** Mostrar el precio original tachado junto al precio con descuento en la tienda, de forma automática.

**Por qué es útil:**
- Daniel ya tiene el campo `precioAnterior` en los datos, pero no se muestra visualmente como promoción.
- Un precio tachado crea urgencia y percepción de ahorro.
- Impulsa ventas sin complicar el formulario de producto.

**Cómo debería funcionar:**
- Si `precioAnterior` > `precio`, mostrar: ~~$650~~ → **$550**.
- Badge de "¡Oferta!" o "¡Ahorra $100!".
- Opcional: mostrar porcentaje de descuento.

**Esfuerzo:** Bajo. El campo ya existe, solo falta la visualización.

---

### 7. Cambiar Orden de Productos en la Tienda

**Qué es:** Permitir a Daniel arragar y soltar productos para cambiar el orden en que aparecen en la tienda.

**Por qué es útil:**
- El producto más vendido debería estar primero.
- Cuando lance un nuevo producto, puede ponerlo de inmediato en los primeros lugares.
- Hoy el orden es el de agregado, no el de importancia comercial.

**Cómo debería funcionar:**
- En la lista de productos del admin: opción de arrastrar para reordenar.
- En la tienda: los productos aparecen en el orden definido.
- Alternativa simple: campo numérico "Posición" (1, 2, 3...).

**Esfuerzo:** Bajo. Solo guardar un campo de orden.

---

### 8. Modo Catálogo Offline (PDF de Productos)

**Qué es:** Un botón que genere un PDF con el catálogo completo de productos (foto, nombre, precio, descripción) para enviar por WhatsApp o imprimir.

**Por qué es útil:**
- Daniel puede enviar el catálogo completo a un cliente sin que tenga que navegar la web.
- Ideal para ferias, mercados o clientes que no usan smartphone.
- WhatsApp Business permite catálogo, pero un PDF es más flexible.

**Cómo debería funcionar:**
- Botón "Descargar catálogo PDF" en el dashboard o sección productos.
- El PDF incluye logo, productos con foto, precios y datos de contacto.

**Esfuerzo:** Medio. Requiere librería de PDF (jsPDF ya funciona en navegador).

---

### 9. Soporte y Ayuda Integrada

**Qué es:** Un botón de ayuda en cada sección que explique qué hace y cómo usarla.

**Por qué es útil:**
- Daniel no es técnico. Cuando no sabe qué hacer, necesita ayuda inmediata.
- Evita que el proyecto quede abandonado por frustración.
- Puede ser tan simple como un modal con texto.

**Cómo debería funcionar:**
- Icono "?" en la esquina superior de cada modal/sección.
- Al hacer clic: modal con explicación simple en español.

**Esfuerzo:** Bajo. Solo texto y un modal reutilizable.

---

### 10. Validación y Confirmaciones Amigables

**Qué es:** Al guardar o eliminar algo, un mensaje claro de confirmación antes de proceder.

**Por qué es útil:**
- Evita errores costosos (eliminar un producto sin querer).
- Le da confianza a Daniel para usar el panel sin miedo.
- Los mensajes deben ser claros: "¿Seguro que deseas eliminar 'Hidratante Montaña'? Esta acción no se puede deshacer."

**Cómo debería funcionar:**
- Antes de eliminar: confirmación con el nombre del producto.
- Al guardar: notificación de éxito "¡Producto guardado correctamente!".
- Al salir sin guardar: aviso "Tienes cambios sin guardar. ¿Deseas salir?"

**Esfuerzo:** Bajo. Solo condicionales y modales de confirmación.

---

## P1 — FUNCIONES ÚTILES (Implementar pronto)

### 11. Personalización de Temas sin Código

**Qué es:** Un panel de colores donde Daniel pueda elegir los colores de su tienda sin tocar código.

**Por qué es útil:**
- Quiere que su tienda se vea única y profesional.
- Los 5 temas actuales están bien, pero no hay opción de crear uno propio fácilmente.
- Sin esto, depende de alguien técnico para cada cambio de color.

**Cómo debería funcionar:**
- En Ajustes, sección "Colores de mi tienda".
- Selector de color para: fondo, botones, texto, acento.
- Vista previa en tiempo real.
- Botón "Guardar tema".

**Esfuerzo:** Medio. Ya existe la base (variables CSS), solo hace falta la interfaz.

---

### 12. Registro de Clientes (CRM Básico)

**Qué es:** Una sección donde Daniel guarde datos de sus clientes recurrentes (nombre, WhatsApp, dirección, cumpleaños, notas).

**Por qué es útil:**
- Podrá saber quién compra más, qué le gusta, y cuándo contactarlo.
- Cumpleaños: puede enviar un mensaje de felicitación con descuento.
- Notas: "Le gusta el aroma a café", "Prefiere envío los viernes".

**Cómo debería funcionar:**
- Lista de clientes con botón "Nuevo cliente".
- Campos: nombre, WhatsApp, dirección, cumpleaños, notas.
- Al hacer pedido, buscar cliente por nombre (autocompletar).

**Esfuerzo:** Medio. Similar a productos pero más simple.

---

### 13. Promociones y Descuentos

**Qué es:** Una sección para crear códigos de descuento u ofertas especiales (ej: "10% en tu primera compra", "2x1 en lociones corporales").

**Por qué es útil:**
- Impulsa ventas y fideliza clientes.
- Atrae nuevos clientes con ofertas de lanzamiento.
- Sin esto, Daniel debe negociar descuentos manualmente por WhatsApp.

**Cómo debería funcionar:**
- Crear promoción: nombre, tipo (% o $), valor, fecha inicio/fín, productos aplicables.
- En el carrito: campo para ingresar código de descuento.
- Badge en productos en oferta: "¡10% de descuento!".

**Esfuerzo:** Medio-alto. Requiere lógica en el carrito.

---

### 14. Historial de Ventas y Estadísticas Avanzadas

**Qué es:** Un dashboard mejorado con gráficas de ventas por mes, productos más vendidos, y comparación de períodos.

**Por qué es útil:**
- Daniel puede ver qué productos son los más populares y promover más esos.
- Sabrá qué meses son más fuertes y planear inventario.
- Las decisiones de negocio se basan en datos, no en intuición.

**Cómo debería funcionar:**
- Gráfica de barras: ventas por mes.
- Top 5 productos más vendidos.
- Filtro por rango de fecha (últimos 7 días, 30 días, etc.).

**Esfuerzo:** Medio. Ya hay base (dashboard actual), solo necesita más datos y visualización.

---

### 15. Múltiples Fotos por Producto

**Qué es:** Permitir subir 2-3 fotos por producto (no solo una).

**Por qué es útil:**
- Un ángulo no es suficiente para mostrar un producto.
- Foto del empaque, foto del producto en uso, foto de ingredientes.
- Aumenta la confianza del cliente y reduce preguntas por WhatsApp.

**Cómo debería funcionar:**
- En el formulario de producto, área para subir múltiples fotos.
- La primera foto es la principal, las demás son adicionales.
- En la tienda: carrusel de fotos por producto.

**Esfuerzo:** Bajo-medio. Solo cambiar de una imagen a un array de imágenes.

---

### 16. Plantillas de Mensajes Predefinidos

**Qué es:** Mensajes predefinidos que Daniel usa frecuentemente (ej: "Pedido recibido", "Enviado", "Entregado", "Gracias por tu compra").

**Por qué es útil:**
- Ahorra tiempo en escribir los mismos mensajes una y otra vez.
- Da una imagen profesional y consistente.
- Ideal para cuando tiene muchos pedidos y no puede personalizar cada mensaje.

**Cómo debería funcionar:**
- Sección "Mis mensajes" en Ajustes.
- Crear mensaje: nombre + contenido.
- En pedidos, botón "Enviar mensaje" → selecciona plantilla → envía por WhatsApp.

**Esfuerzo:** Bajo. Solo un CRUD de textos y un botón.

---

### 17. Configuración de Horarios y Envíos

**Qué es:** Una sección donde Daniel configure: días/horarios de atención, zonas de cobertura (La Virginia + futuros municipios), y costos de envío.

**Por qué es útil:**
- Cuando empiece a enviar, necesita saber a qué zonas entrega y cuánto cobrar.
- Puede poner "Envío gratis en pedidos superiores a $X".
- Los clientes saben cuándo esperar su pedido.

**Cómo debería funcionar:**
- Configuración: días de atención (checkbox), horarios (selector de hora).
- Zonas: lista de municipios con costo de envío.
- En carrito: calculadora de envío por zona.

**Esfuerzo:** Bajo-medio.

---

### 18. Integración con Redes Sociales (Enlaces)

**Qué es:** Mostrar botones de redes sociales en la tienda y la opción de conectar con Instagram para mostrar fotos.

**Por qué es útil:**
- Daniel puede traer seguidores de Instagram a la tienda.
- Próximamente: vender por Instagram Shopping.
- La prueba social (fotos reales, seguidores) aumenta la confianza.

**Cómo debería funcionar:**
- En Ajustes: campos para URL de Instagram, Facebook, TikTok.
- En la tienda: iconos de redes sociales en el footer.
- Futuramente: feed de Instagram embebido.

**Esfuerzo:** Bajo. Solo campos de URL e iconos.

---

### 19. Búsqueda de Pedidos

**Qué es:** Un buscador en la sección de pedidos para encontrar por nombre de cliente, número de pedido, o WhatsApp.

**Por qué es útil:**
- Cuando tiene muchos pedidos, encontrar uno específico toma tiempo.
- Un cliente pregunta "¿cómo va mi pedido?" — Daniel necesita encontrarlo rápido.

**Cómo debería funcionar:**
- Input de búsqueda en la sección pedidos.
- Filtra en tiempo real por nombre, WhatsApp, o ID.

**Esfuerzo:** Bajo. Similar al buscador de productos que ya existe.

---

### 20. Registro Manual de Pedidos desde WhatsApp

**Qué es:** Un formulario simple donde Daniel pegue el texto del pedido que le enviaron por WhatsApp y el panel lo estructure automáticamente.

**Por qué es útil:**
- Hoy los pedidos le llegan por WhatsApp pero el panel no los recibe.
- Si pudiera pegar el texto del pedido y que el panel lo organizara, ahorraría tiempo de digitar.
- Podría ver estadísticas reales de pedidos.

**Cómo debería funcionar:**
- Botón "Nuevo pedido desde WhatsApp".
- Daniel pega el mensaje que le enviaron.
- El panel intenta reconocer: nombre, productos, total, dirección.
- Daniel confirma y guarda.

**Esfuerzo:** Alto. Requiere interpretar texto libre. Alternativa más simple: formulario de pedido manual.

---

## P2 — FUNCIONES FUTURAS (Cuando el negocio crezca)

### 21. Gestión de Inventario Múltiple (Almacenes)

**Cuándo:** Cuando tenga un local físico y venda online + presencial.  
**Por qué:** Necesitará saber cuánto stock tiene en cada lugar para no vender de más.

---

### 22. Cuentas de Usuario y Permisos

**Cuándo:** Cuando tenga empleados o alguien que le ayude.  
**Por qué:** Cada persona debe tener su cuenta con permisos específicos (ej: solo ver pedidos, no eliminar productos).

---

### 23. Integración con Pasarelas de Pago

**Cuándo:** Cuando quiera recibir pagos con tarjeta online (Wompi, Mercado Pago, etc.).  
**Por qué:** Los clientes podrán pagar sin salir de la tienda, reduciendo la fricción del pedido por WhatsApp.

---

### 24. Facturación Electrónica

**Cuándo:** Cuando el negocio crezca y necesite emitir facturas formales (en Colombia, facturación electrónica).  
**Por qué:** Obligación legal para ciertos niveles de venta y requisito para clientes empresariales.

---

### 25. Marketing por WhatsApp (Envío Masivo)

**Cuándo:** Cuando tenga 50+ clientes registrados.  
**Por qué:** Podrá enviar ofertas a todos con un solo clic (con consentimiento previo).

---

### 26. Análisis de Rentabilidad

**Cuándo:** Cuando quiera saber cuánto gana realmente por producto.  
**Por qué:** Precio - costo - envío - comisiones = ganancia real. Sin esto, puede estar vendiendo mucho pero ganando poco.

---

### 27. Multi-idioma

**Cuándo:** Cuando quiera vender a otros países.  
**Por qué:** Inglés o portugués ampliarían el mercado potencial.

---

### 28. API para Integraciones

**Cuándo:** Cuando quiera conectar con contabilidad, logística, u otras herramientas.  
**Por qué:** Automatización avanzada cuando el negocio requiera sistemas profesionales.

---

## Resumen de Prioridades

| # | Función | Prioridad | Esfuerzo | Impacto |
|---|---------|-----------|----------|---------|
| 1 | Gestión de Pedidos con Estados | **P0** | Medio | ★★★★★ |
| 2 | Copia de Seguridad | **P0** | Bajo | ★★★★★ |
| 3 | Alertas de Stock Bajo | **P0** | Bajo | ★★★★☆ |
| 4 | Pedido Rápido por WhatsApp | **P0** | Bajo | ★★★★☆ |
| 5 | Categorías con Ícono y Orden | **P0** | Bajo | ★★★★☆ |
| 6 | Precio con Descuento Visible | **P0** | Bajo | ★★★★☆ |
| 7 | Cambiar Orden de Productos | **P0** | Bajo | ★★★☆☆ |
| 8 | Catálogo PDF | **P0** | Medio | ★★★☆☆ |
| 9 | Soporte Integrado | **P0** | Bajo | ★★★☆☆ |
| 10 | Confirmaciones Amigables | **P0** | Bajo | ★★★☆☆ |
| 11 | Personalización de Temas | P1 | Medio | ★★★★☆ |
| 12 | Registro de Clientes | P1 | Medio | ★★★★★ |
| 13 | Promociones y Descuentos | P1 | Medio-Alto | ★★★★★ |
| 14 | Estadísticas Avanzadas | P1 | Medio | ★★★★☆ |
| 15 | Múltiples Fotos | P1 | Bajo-Medio | ★★★☆☆ |
| 16 | Plantillas de Mensajes | P1 | Bajo | ★★★☆☆ |
| 17 | Configuración de Envíos | P1 | Bajo-Medio | ★★★★☆ |
| 18 | Redes Sociales | P1 | Bajo | ★★★☆☆ |
| 19 | Búsqueda de Pedidos | P1 | Bajo | ★★★☆☆ |
| 20 | Reconocimiento de Pedidos | P1 | Alto | ★★★★☆ |
| 21-28 | Funciones Futuras | P2 | — | — |

---

## Recomendación Final

**Para el primer mes**, Daniel debería implementar las funciones **P0** (prioritarias). Son de bajo o medio esfuerzo y resuelven los problemas más urgentes: no perder datos, no perder ventas por falta de stock, y ahorrar tiempo en la administración diaria.

**En el segundo mes**, las funciones **P1** le permitirán profesionalizar la operación, conocer mejor a sus clientes y vender más.

**Las funciones P2** deben esperar a que el negocio las necesite. No implementarlas antes es una decisión inteligente: Daniel necesita dominar lo básico antes de complicarse con funcionalidades avanzadas.

> **Principio rector:** Cada nueva función debe hacer la vida de Daniel **más fácil**, no más difícil. Si algo requiere un manual de 10 páginas, es demasiado complicado para su negocio hoy.

---

*Documento creado para NØRDIKO — Septiembre 2026*
