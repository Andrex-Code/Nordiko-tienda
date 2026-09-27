# Estrategia SEO — Tienda de Lociones Premium

**Fecha:** Septiembre 2026  
**Objetivo:** Posicionar la tienda como referente en lociones premium, aumentar tráfico orgánico y convertir visitas en ventas.

---

## 1. Investigación de Palabras Clave

### 1.1 Keywords Principales (Head Terms)
Volumen alto, competencia alta. Objetivo: posicionar en 6-12 meses.

| Keyword | Volumen mensual (aprox.) | Intención | Prioridad |
|---------|--------------------------|-----------|-----------|
| loción hidratante | 12,000 | Transaccional | Alta |
| crema corporal | 9,500 | Transaccional | Alta |
| loción corporal premium | 3,200 | Comercial | Alta |
| loción para hombre | 2,800 | Transaccional | Media |
| crema hidratante natural | 2,400 | Informativa | Media |
| loción corporal mujer | 2,100 | Transaccional | Media |

### 1.2 Keywords Long-Tail (Cola Larga)
Volumen medio-bajo, competencia baja. Objetivo: posicionar en 1-3 meses.

| Keyword | Volumen mensual | Intención |
|---------|-----------------|-----------|
| loción hidratante para hombre piel seca | 880 | Transaccional |
| crema corporal premium con ingredientes naturales | 720 | Comercial |
| mejor loción para piel seca invierno | 650 | Informativa |
| loción corporal sin químicos dañinos | 540 | Comercial |
| loción hidratante vegana y cruelty free | 480 | Transaccional |
| crema corporal para piel sensible | 420 | Transaccional |
| loción corporal con aceite de argán | 390 | Transaccional |
| loción para después del baño premium | 350 | Transaccional |
| crema corporal anti edad | 310 | Comercial |
| loción corporal aromaterapia relajante | 280 | Transaccional |

### 1.3 Keywords por Intención de Búsqueda

**Informativas (Top of Funnel):**
- ¿Qué loción es mejor para piel seca?
- Beneficios de la crema corporal natural
- Diferencia entre loción y crema corporal
- Cómo elegir la loción adecuada para tu tipo de piel

**Comerciales (Middle of Funnel):**
- Mejores lociones premium 2026
- Loción hidratante premium opiniones
- Comparativa cremas corporales de lujo
- Loción corporal premium precio

**Transaccionales (Bottom of Funnel):**
- Comprar loción hidratante online
- Loción corporal premium envío gratis
- Oferta crema corporal natural
- Loción para hombre comprar

---

## 2. SEO On-Page

### 2.1 Optimización de Títulos (Title Tags)

**Fórmula:** [Keyword Principal] | [Beneficio/USP] | [Marca]

**Ejemplos:**
- Loción Hidratante Premium para Piel Seca | 72h Hidratación | [Marca]
- Crema Corporal Natural con Aceite de Argán | Vegana | [Marca]
- Loción Corporal para Hombre | Fórmula Premium | [Marca]

**Reglas:**
- Máximo 60 caracteres
- Keyword principal al inicio
- Incluir beneficio diferenciador
- Marca al final

### 2.2 Meta Descripciones

**Fórmula:** [Beneficio] + [Ingredientes/USP] + [CTA]

**Ejemplos:**
- "Descubre nuestra loción hidratante premium con ácido hialurónico. 72h de hidratación, piel suave y radiante. Envío gratis en 24h. ¡Compra ahora!"
- "Crema corporal natural vegana con aceite de argán y manteca de karité. Piel nutrida y radiante. Descubre la diferencia premium."

**Reglas:**
- 150-160 caracteres
- Incluir keyword principal
- CTA claro (Compra, Descubre, Prueba)
- Diferenciador único

### 2.3 URLs (Slugs)

**Estructura:** `https://tienda.com/categoria/keyword-principal`

**Ejemplos:**
- `/lotion-hidratante-premium`
- `/crema-corporal-natural`
- `/loción-para-hombre`
- `/loción-corporal-vegana`

**Reglas:**
- Guiones para separar palabras
- Sin caracteres especiales
- Cortas y descriptivas
- Sin stop words (de, la, para, con)

### 2.4 Encabezados (H1-H6)

**Estructura recomendada para páginas de producto:**

```
H1: Loción Hidratante Premium [Nombre Producto]
  H2: Beneficios de [Nombre Producto]
    H3: Hidratación profunda 72h
    H3: Ingredientes naturales
    H3: Resultados visibles
  H2: Cómo usar
  H2: Ingredientes
  H2: Opiniones de clientes
  H2: Productos relacionados
```

### 2.5 Optimización de Imágenes

- **Alt text descriptivo:** "Loción hidratante premium con ácido hialurónico en frasco ámbar"
- **Nombres de archivo:** `loción-hidratante-premium-acido-hialuronico.jpg`
- **Formato:** WebP con fallback a JPG
- **Compresión:** Máximo 150KB por imagen
- **Dimensiones:** 1200x1200px para productos

### 2.6 Contenido de Páginas de Producto

Cada página de producto debe incluir:
- Descripción única de 300-500 palabras
- Lista de beneficios con viñetas
- Ingredientes destacados
- Modo de uso
- FAQ (3-5 preguntas)
- Reseñas de clientes
- Productos relacionados

---

## 3. SEO Técnico

### 3.1 Velocidad del Sitio

**Objetivos:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Acciones:**
- Comprimir imágenes (WebP)
- Implementar lazy loading
- Minificar CSS/JS
- Usar CDN (Cloudflare o similar)
- Hosting optimizado para WordPress/WooCommerce o Shopify
- Eliminar plugins/scripts innecesarios

### 3.2 Mobile-First

- Diseño responsive obligatorio
- Botones de mínimo 44x44px
- Texto legible sin zoom (mínimo 16px)
- Formularios optimizados para móvil
- Velocidad móvil prioritaria
- Test con Google Mobile-Friendly Test

### 3.3 Schema Markup (Datos Estructurados)

**Tipos de schema a implementar:**

```json
// Producto
{
  "@type": "Product",
  "name": "Loción Hidratante Premium",
  "image": "...",
  "description": "...",
  "brand": { "@type": "Brand", "name": "[Marca]" },
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}

// FAQ
{
  "@type": "FAQPage",
  "mainEntity": [...]
}

// BreadcrumbList
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### 3.4 Sitemap y Indexación

- Sitemap XML actualizado automáticamente
- Enviar a Google Search Console
- Robots.txt optimizado
- Canonical URLs configuradas
- Paginación con rel="next" y rel="prev"
- Eliminar contenido duplicado (thin content)

### 3.5 Arquitectura del Sitio

```
Inicio
├── Categorías
│   ├── Loción Hidratante
│   ├── Crema Corporal
│   ├── Loción para Hombre
│   ├── Loción Natural/Vegana
│   └── Ofertas
├── Blog
│   ├── Cuidado de la Piel
│   ├── Ingredientes
│   ├── Rutinas
│   └── Tendencias
├── Sobre Nosotros
├── Contacto
└── FAQ
```

---

## 4. Estrategia de Blog — 15 Artículos SEO

### Artículo 1: "Las 10 Mejores Lociones Premium para Piel Seca en 2026"
**Keyword:** mejores lociones premium 2026  
**Intención:** Comercial  
**Contenido:** Comparativa de 10 lociones premium, criterios de selección, pros y contras de cada una, recomendación final. Incluir imágenes de productos y tabla comparativa.

### Artículo 2: "Guía Completa: Cómo Elegir la Loción Adecuada para tu Tipo de Piel"
**Keyword:** cómo elegir la loción adecuada  
**Intención:** Informativa  
**Contenido:** Tipos de piel (seca, grasa, mixta, sensible), ingredientes recomendados para cada una, errores comunes, checklist de compra.

### Artículo 3: "Loción Hidratante para Hombre: Guía de Compra 2026"
**Keyword:** loción hidratante para hombre  
**Intención:** Transaccional  
**Contenido:** Diferencias entre productos masculinos y femeninos, ingredientes clave, top 5 lociones para hombre, rutina básica de cuidado masculino.

### Artículo 4: "Beneficios de la Crema Corporal Natural vs. Convencional"
**Keyword:** crema corporal natural beneficios  
**Intención:** Informativa  
**Contenido:** Comparación ingredientes naturales vs químicos, beneficios para la piel, impacto ambiental, marcas recomendadas.

### Artículo 5: "Rutina de Cuidado Corporal para una Piel Radiante"
**Keyword:** rutina cuidado corporal  
**Intención:** Informativa  
**Contenido:** Pasos diarios (exfoliación, hidratación, protección), frecuencia recomendada, productos para cada paso, tips de aplicación.

### Artículo 6: "Loción Corporal Vegana y Cruelty Free: La Guía Definitiva"
**Keyword:** loción corporal vegana cruelty free  
**Intención:** Comercial  
**Contenido:** Qué significa vegano y cruelty free, certificaciones a buscar, marcas recomendadas, lista de ingredientes a evitar.

### Artículo 7: "Ácido Hialurónico en Loción Corporal: Qué Es y Por Qué Lo Necesitas"
**Keyword:** loción con ácido hialurónico  
**Intención:** Informativa  
**Contenido:** Qué es el ácido hialurónico, beneficios para la piel, cómo funciona en lociones, concentraciones recomendadas, productos destacados.

### Artículo 8: "Loción Corporal con Aceite de Argán: Beneficios y Mejores Opciones"
**Keyword:** loción corporal con aceite de argán  
**Intención:** Transaccional  
**Contenido:** Propiedades del aceite de argán, beneficios para piel y cabello, top 5 lociones con argán, cómo identificar producto de calidad.

### Artículo 9: "Piel Seca en Invierno: Cómo Protegerla con la Loción Correcta"
**Keyword:** loción piel seca invierno  
**Intención:** Informativa  
**Contenido:** Por qué la piel se reseca en invierno, ingredientes esenciales, rutina de invierno, errores que empeoran la sequedad.

### Artículo 10: "Diferencia entre Loción, Crema y Body Milk: ¿Cuál Elegir?"
**Keyword:** diferencia entre loción y crema corporal  
**Intención:** Informativa  
**Contenido:** Texturas, concentración de ingredientes, cuándo usar cada una, tipo de piel recomendado, tabla comparativa.

### Artículo 11: "Loción Corporal Anti-Edad: Ingredientes que Sí Funcionan"
**Keyword:** crema corporal anti edad  
**Intención:** Comercial  
**Contenido:** Ingredientes con evidencia científica (retinol, péptidos, vitamina C), cómo funcionan, productos recomendados, rutina anti-edad corporal.

### Artículo 12: "Cómo Leer la Etiqueta de una Loción: Ingredientes que Debes Evitar"
**Keyword:** ingredientes loción evitar  
**Intención:** Informativa  
**Contenido:** INCI explicado, ingredientes controvertidos (parabenos, ftalatos, sulfatos), alternativas seguras, lista de limpieza.

### Artículo 13: "Loción Corporal Aromaterapia: Aromas para Relajarte"
**Keyword:** loción corporal aromaterapia  
**Intención:** Transaccional  
**Contenido:** Beneficios de la aromaterapia, aceites esenciales populares (lavanda, eucalipto, cítricos), lociones recomendadas, uso antes de dormir.

### Artículo 14: "Maternidad y Cuidado Corporal: Lociones Seguras durante el Embarazo"
**Keyword:** loción corporal embarazo segura  
**Intención:** Informativa  
**Contenido:** Ingredientes a evitar en el embarazo, cambios en la piel durante gestación, lociones recomendadas, rutina de prevención de estrías.

### Artículo 15: "Tendencias en Cuidado Corporal 2026: Lo que Viene"
**Keyword:** tendencias cuidado corporal 2026  
**Intención:** Informativa  
**Contenido:** Ingredientes en auge (bakuchiol, CBD, probióticos), sostenibilidad, personalización, tecnología en cuidado de la piel.

---

## 5. Link Building — Estrategia de Backlinks

### 5.1 Objetivos de Autoridad
- Domain Rating (DR) objetivo: 40+ en 12 meses
- Backlinks de calidad: 50-100 por trimestre
- Dominios referentes únicos: 30+ por trimestre

### 5.2 Estrategias de Link Building

**1. Guest Blogging (Artículos Invitados)**
- Blogs de belleza y cuidado personal
- Medios de lifestyle y wellness
- Fichas de producto en directorios especializados
- **Target:** 2-3 artículos por mes

**2. Colaboraciones con Influencers**
- Micro-influencers de belleza (10K-100K seguidores)
- Reseñas honestas con link a la tienda
- Códigos de descuento personalizados
- **Target:** 5-10 colaboraciones por mes

**3. Prensa y Medios (PR)**
- Comunicados de prensa para lanzamientos
- Artículos en medios de belleza (Vogue, Glamour, Elle)
- Entrevistas con el fundador
- **Target:** 1-2 menciones en medios por mes

**4. Link Bait (Contenido Enlazable)**
- Guías descargables gratuitas
- Infografías sobre cuidado de la piel
- Estudios o datos originales
- Herramientas interactivas (test de tipo de piel)

**5. Directorios y Listados**
- Google My Business
- Directorios de productos naturales/veganos
- Páginas de asociaciones de cosmética natural
- Yelp, Trustpilot

**6. Construcción de Relaciones**
- Programas de afiliados
- Alianzas con marcas complementarias
- Patrocinios de eventos de belleza
- Colaboraciones con dermatólogos y expertos

### 5.3 Calidad sobre Cantidad

**Backlinks ideales:**
- Dominios con DR 30+
- Contenido relevante (belleza, salud, lifestyle)
- Tráfico orgánico real
- Enlaces dofollow
- Anchor text natural y variado

**Backlinks a evitar:**
- Granjas de enlaces
- Sitios de spam o baja calidad
- Enlaces pagados no declarados
- Sitios no relevantes

---

## 6. SEO Local

### 6.1 Google Business Profile (Google My Business)

**Optimización:**
- Nombre: [Marca] — Tienda de Lociones Premium
- Categoría principal: Tienda de cosméticos
- Categorías secundarias: Tienda de productos de belleza, Tienda de regalos
- Descripción: 750 caracteres con keywords locales
- Horario: Actualizado y consistente
- Fotos: Logo, interior, productos, equipo (mínimo 10)
- Atributos: Accesibilidad, Wi-Fi, métodos de pago

**Acciones mensuales:**
- Publicar 2-4 posts (Google Posts)
- Reseñas a todas las reseñas (positivas y negativas)
- Actualizar fotos trimestralmente
- Responder preguntas de clientes

### 6.2 Búsquedas Locales (Local Pack)

**Keywords locales a optimizar:**
- loción premium en [ciudad]
- tienda de cosméticos en [ciudad]
- crema corporal natural cerca de mí
- loción para hombre [ciudad]

**Acciones:**
- Crear landing pages por ciudad/barrio
- Incluir dirección y mapa en el footer
- Schema LocalBusiness implementado
- NAP (Name, Address, Phone) consistente en todo el directorio web

### 6.3 Reseñas y Reputación

**Objetivo:** 4.5+ estrellas, 100+ reseñas en 6 meses

**Estrategia:**
- Email post-compra solicitando reseña
- Incentivo: descuento en próxima compra (sin condicionar reseña positiva)
- Responder todas las reseñas en < 24h
- Plantilla de respuesta personalizada

### 6.4 Directorios Locales

- Google Business Profile
- Yelp
- Foursquare
- Directorios de comercios locales
- Páginas amarillas digitales
- Asociaciones de comercio local

---

## 7. Calendario de Contenido — 3 Meses

### Mes 1: Octubre 2026 — Fundación

| Semana | Fecha | Tipo | Título/Tema | Keyword Objetivo |
|--------|-------|------|-------------|------------------|
| 1 | 5 Oct | Blog | Las 10 Mejores Lociones Premium para Piel Seca en 2026 | mejores lociones premium 2026 |
| 1 | 7 Oct | Producto | Lanzamiento: Nueva loción hidratante premium | loción hidratante premium |
| 2 | 12 Oct | Blog | Guía Completa: Cómo Elegir la Loción Adecuada | cómo elegir la loción adecuada |
| 2 | 14 Oct | Redes | Reel: Rutina de noche con loción | — |
| 3 | 19 Oct | Blog | Loción Hidratante para Hombre: Guía de Compra 2026 | loción hidratante para hombre |
| 3 | 21 Oct | Email | Newsletter: Ofertas de otoño | — |
| 4 | 26 Oct | Blog | Beneficios de la Crema Corporal Natural vs. Convencional | crema corporal natural beneficios |
| 4 | 28 Oct | Redes | Carousel: 5 beneficios de hidratar tu piel | — |

### Mes 2: Noviembre 2026 — Autoridad

| Semana | Fecha | Tipo | Título/Tema | Keyword Objetivo |
|--------|-------|------|-------------|------------------|
| 1 | 2 Nov | Blog | Rutina de Cuidado Corporal para una Piel Radiante | rutina cuidado corporal |
| 1 | 4 Nov | Producto | Black Friday: Ofertas anticipadas | ofertas loción corporal |
| 2 | 9 Nov | Blog | Loción Corporal Vegana y Cruelty Free | loción corporal vegana cruelty free |
| 2 | 11 Nov | Redes | Video: Test de tipo de piel | — |
| 3 | 16 Nov | Blog | Ácido Hialurónico en Loción Corporal | loción con ácido hialurónico |
| 3 | 18 Nov | Email | Newsletter: Black Friday | — |
| 4 | 23 Nov | Blog | Loción Corporal con Aceite de Argán | loción corporal con aceite de argán |
| 4 | 25 Nov | Redes | Unboxing: Pedido especial Black Friday | — |
| 4 | 30 Nov | Blog | Piel Seca en Invierno: Cómo Protegerla | loción piel seca invierno |

### Mes 3: Diciembre 2026 — Conversión

| Semana | Fecha | Tipo | Título/Tema | Keyword Objetivo |
|--------|-------|------|-------------|------------------|
| 1 | 2 Dic | Blog | Diferencia entre Loción, Crema y Body Milk | diferencia entre loción y crema corporal |
| 1 | 4 Dic | Producto | Loción Corporal Anti-Edad: Ingredientes que Sí Funcionan | crema corporal anti edad |
| 2 | 9 Dic | Blog | Cómo Leer la Etiqueta de una Loción | ingredientes loción evitar |
| 2 | 11 Dic | Redes | Reel: 3 errores al aplicar loción | — |
| 3 | 16 Dic | Blog | Loción Corporal Aromaterapia: Aromas para Relajarte | loción corporal aromaterapia |
| 3 | 18 Dic | Email | Newsletter: Ideas de regalo | — |
| 4 | 23 Dic | Blog | Maternidad y Cuidado Corporal: Lociones Seguras | loción corporal embarazo segura |
| 4 | 26 Dic | Redes | Post: Resumen del año | — |
| 4 | 30 Dic | Blog | Tendencias en Cuidado Corporal 2026 | tendencias cuidado corporal 2026 |

---

## 8. Competencia SEO

### 8.1 Análisis de Competidores

**Competidores directos a analizar:**
1. **The Body Shop** — DR 75, dominio de autoridad alta. keywords: "body shop loción", "body shop ofertas", "body shop más vendidos"
2. **L'Occitane** — DR 72, fuerte en ingredientes naturales. keywords: "loción l'occitane", "crema l'occitane almendra", "l'occitane ofertas"
3. **Kiehl's** — DR 70, posicionamiento premium. keywords: "kiehl's loción", "crema kiehl's", "kiehl's ultras facial"
4. **Caudalie** — DR 68, enfoque en ingredientes naturales. keywords: "caudalie loción", "caudalie vinoperfect", "caudalie ofertas"
5. **Fresh (LVMH)** — DR 62, keywords: "fresh loción", "fresh soy face", "fresh ofertas"
6. **Clinique** — DR 74, keywords: "clinique loción", "clinique hidratante", "clinique dramatically different"
7. **Aveda** — DR 65, keywords: "aveda loción", "aveda hand relief", "aveda ofertas"
8. **Natura** — DR 60, keywords: "natura loción", "natura ekos", "natura ofertas"
9. **Sephora Collection** — DR 70, keywords: "sephora loción", "sephora body cream", "sephora ofertas"
10. **Marcas emergentes (Drunk Elephant, Tatcha, Glow Recipe)** — DR 30-50, oportunidad de superar

### 8.2 Keywords de la Competencia

**Keywords que posicionan los competidores:**

| Keyword | The Body Shop | L'Occitane | Kiehl's | Oportunidad |
|---------|---------------|------------|---------|-------------|
| loción corporal | ✓ | ✓ | ✓ | Alta competencia |
| crema corporal premium | ✓ | ✓ | ✓ | Media |
| loción natural | ✓ | ✓ | — | Media |
| loción para hombre | ✓ | — | ✓ | Baja |
| loción vegana | ✓ | — | — | Baja |
| crema anti edad corporal | — | ✓ | ✓ | Media |
| loción piel seca | ✓ | ✓ | ✓ | Alta |

### 8.3 Brechas de Oportunidad

**Keywords donde la competencia es débil:**
- Loción hidratante para hombre piel seca
- Crema corporal premium con ingredientes naturales
- Loción corporal sin químicos dañinos
- Loción corporal vegana y cruelty free
- Loción corporal aromaterapia relajante
- Loción corporal anti edad
- Loción para después del baño premium

### 8.4 Estrategia Diferenciadora

- **Enfoque en nicho:** Lociones premium con ingredientes naturales y veganos
- **Contenido profundo:** Guías detalladas que la competencia no tiene
- **Experiencia de usuario:** Sitio rápido, diseño premium, contenido visual
- **Prueba social:** Reseñas reales, casos de éxito, user-generated content

---

## 9. Métricas y KPIs

### 9.1 Métricas Clave a Medir

**Tráfico:**
- Sesiones orgánicas mensuales
- Usuarios únicos
- Páginas por sesión
- Tasa de rebote

**Posicionamiento:**
- Keywords posicionadas (top 10, top 20, top 50)
- Posición promedio
- Impresiones en Google Search Console
- CTR (Click-Through Rate)

**Conversión:**
- Tasa de conversión de ventas
- Ingresos por tráfico orgánico
- Valor promedio del pedido
- Tasa de abandono de carrito

**Engagement:**
- Tiempo en página
- Páginas vistas por sesión
- Compartidos en redes sociales
- Comentarios en blog

**SEO Técnico:**
- Core Web Vitals (LCP, FID, CLS)
- Errores de rastreo
- Páginas indexadas
- Velocidad de carga

### 9.2 Herramientas de Medición

| Herramienta | Uso | Frecuencia |
|-------------|-----|------------|
| Google Analytics 4 | Tráfico, conversión, engagement | Diaria |
| Google Search Console | Posicionamiento, impresiones, CTR | Diaria |
| Ahrefs / SEMrush | Backlinks, keywords competencia | Semanal |
| Screaming Frog | Auditoría técnica | Mensual |
| PageSpeed Insights | Velocidad | Mensual |
| Hotjar | Mapas de calor, grabaciones | Mensual |

### 9.3 Frecuencia de Revisión

**Diario:**
- Revisión de alertas de Search Console
- Monitoreo de caídas de tráfico

**Semanal:**
- Revisión de posicionamiento de keywords
- Análisis de contenido publicado
- Monitoreo de backlinks nuevos

**Mensual:**
- Informe completo de rendimiento
- Análisis de competencia
- Revisión de Core Web Vitals
- Ajustes de estrategia

**Trimestral:**
- Auditoría SEO completa
- Revisión de objetivos y KPIs
- Análisis de ROI
- Planificación del siguiente trimestre

### 9.4 KPIs Objetivo (12 meses)

| Métrica | Inicio | Mes 6 | Mes 12 |
|----------|--------|-------|--------|
| Tráfico orgánico mensual | 5,000 | 15,000 | 35,000 |
| Keywords top 10 | 20 | 80 | 200 |
| Domain Rating | 15 | 30 | 45 |
| Tasa de conversión | 1.5% | 2.5% | 3.5% |
| Ingresos orgánicos | €3,000/mes | €10,000/mes | €25,000/mes |
| Backlinks | 50 | 200 | 500 |

---

## Resumen de Acciones Prioritarias

### Mes 1 — Fundación
- [ ] Investigación de keywords completa
- [ ] Optimización on-page de 10 páginas principales
- [ ] Implementación de schema markup
- [ ] Creación y envío de sitemap
- [ ] Configuración de Google Business Profile
- [ ] Publicación de 4 artículos de blog
- [ ] Auditoría técnica inicial

### Mes 2 — Crecimiento
- [ ] Campaña de link building (guest blogging)
- [ ] Colaboraciones con influencers
- [ ] Optimización de velocidad
- [ ] Publicación de 4 artículos de blog
- [ ] Creación de landing pages locales
- [ ] Programa de reseñas de clientes

### Mes 3 — Escala
- [ ] Análisis de resultados y ajustes
- [ ] Expansión de keywords long-tail
- [ ] Contenido link bait (infografías, guías)
- [ ] Publicación de 4 artículos de blog
- [ ] Optimización de conversión (CRO)
- [ ] Planificación del siguiente trimestre

---

**Documento creado:** Septiembre 2026  
**Próxima revisión:** Octubre 2026  
**Responsable:** Equipo SEO y Contenidos
