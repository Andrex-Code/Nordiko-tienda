# Guía Completa de Despliegue — Tienda "Belleza Natural"

> **Versión:** 1.0  
> **Última actualización:** Septiembre 2026  
> **Proyecto:** Belleza Natural — Tienda de lociones artesanales  
> **Tipo de sitio:** Sitio web estático (HTML + CSS + JavaScript)

---

## Tabla de Contenidos

1. [Opciones de Hosting — Comparativa](#1-opciones-de-hosting--comparativa)
2. [Paso a Paso por Plataforma](#2-paso-a-paso-por-plataforma)
3. [Dominio Personalizado](#3-dominio-personalizado)
4. [SSL / HTTPS](#4-ssl--https)
5. [Optimización del Sitio](#5-optimización-del-sitio)
6. [Backup de Datos](#6-backup-de-datos)
7. [Mantenimiento](#7-mantenimiento)
8. [Escalabilidad](#8-escalabilidad)
9. [Desglose de Costos](#9-desglose-de-costos)
10. [Checklist Final](#10-checklist-final)

---

## 1. Opciones de Hosting — Comparativa

### Resumen Rápido

| Plataforma | Precio Inicial | SSL | Dominio Personalizado | Facilidad | Ideal Para |
|---|---|---|---|---|---|
| **GitHub Pages** | Gratis | ✅ Automático | ✅ Sí | ⭐⭐⭐ | Desarrolladores, presupuesto $0 |
| **Netlify** | Gratis | ✅ Automático | ✅ Sí | ⭐⭐⭐⭐⭐ | Principiantes, despliegue rápido |
| **Vercel** | Gratis | ✅ Automático | ✅ Sí | ⭐⭐⭐⭐ | Principiantes, rendimiento alto |
| **Cloudflare Pages** | Gratis | ✅ Automático | ✅ Sí | ⭐⭐⭐⭐ | Máxima velocidad global |
| **Hosting Tradicional** | ~$3–15 USD/mes | ✅ (cPanel) | ✅ Sí | ⭐⭐⭐ | Soporte telefónico, correo corporativo |

---

### Detalle de Cada Plataforma

#### 🟢 GitHub Pages (Gratis)

**Ventajas:**
- 100% gratuito para repositorios públicos
- SSL automático
- Integración directa con GitHub (control de versiones)
- Ideal si ya usas Git

**Desventajas:**
- Solo contenido estático (no backend)
- Límite de 1 GB por repositorio y 100 GB/mes de ancho de banda
- Requiere conocimientos básicos de Git

**URL resultante:** `https://tuusuario.github.io/belleza-natural/`

---

#### 🔵 Netlify (Gratis)

**Ventajas:**
- Plan gratuito muy generoso (100 GB/mes ancho de banda)
- Despliegue por arrastrar y soltar (drag-and-drop) — **no necesitas Git**
- SSL automático
- Formularios, funciones serverless y previsualizaciones incluidas
- Panel de control muy amigable

**Desventajas:**
- Límite de 300 minutos de build por mes en plan gratuito
- Ancho de banda limitado a 100 GB/mes

**URL resultante:** `https://belleza-natural.netlify.app/`

---

#### 🟣 Vercel (Gratis)

**Ventajas:**
- Plan gratuito con 100 GB de ancho de banda
- Despliegue ultrarrápido (CDN global)
- Integración con Git (GitHub, GitLab, Bitbucket)
- SSL automático
- Excelente rendimiento

**Desventajas:**
- Límite de 100 GB/mes en plan gratuito
- Funciones serverless con límites en plan gratuito

**URL resultante:** `https://belleza-natural.vercel.app/`

---

#### 🟠 Cloudflare Pages (Gratis)

**Ventajas:**
- Ancho de banda **ilimitado** en plan gratuito
- CDN global de Cloudflare (uno de los más rápidos del mundo)
- SSL automático
- Builds ilimitados
- Muy seguro (protección DDoS incluida)

**Desventajas:**
- Requiere vincular un repositorio Git
- Panel un poco más técnico que Netlify/Vercel

**URL resultante:** `https://belleza-natural.pages.dev/`

---

#### 🔴 Hosting Tradicional (Hostgator, SiteGround, etc.)

**Ventajas:**
- Soporte telefónico y por chat
- Correo corporativo incluido (hola@bellezanatural.com)
- cPanel fácil de usar
- Base de datos MySQL si la necesitas en el futuro

**Desventajas:**
- Costo mensual/anual
- Rendimiento inferior a las opciones cloud
- Requiere configuración manual de SSL
- Escalabilidad limitada

**Precio típico:** $3–15 USD/mes

---

### 🏆 Recomendación para "Belleza Natural"

| Etapa | Plataforma Recomendada | Razón |
|---|---|---|
| **Lanzamiento** | Netlify | Fácil, gratis, sin necesidad de Git |
| **Crecimiento** | Cloudflare Pages | Ancho de banda ilimitado, velocidad |
| **Madurez** | Vercel o Cloudflare | Rendimiento óptimo, escalabilidad |

---

## 2. Paso a Paso por Plataforma

### Opción A: Netlify (Recomendada para principiantes)

#### Paso 1: Preparar los archivos

1. Abre la carpeta del proyecto: `C:\Users\pipev\OneDrive\Documentos\Proyecto predeterminado`
2. Verifica que estos archivos estén presentes:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `admin.html`
   - `admin.js`
   - `team-status.html`
   - `team-brain.json`

#### Paso 2: Crear cuenta en Netlify

1. Ve a [https://www.netlify.com](https://www.netlify.com)
2. Haz clic en **"Sign up"** (registrarse)
3. Regístrate con tu correo electrónico o cuenta de GitHub
4. Confirma tu correo electrónico

#### Paso 3: Desplegar por arrastrar y soltar (método más fácil)

1. Inicia sesión en Netlify
2. En el panel principal, busca la sección **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
3. Abre el Explorador de Windows y ve a la carpeta del proyecto
4. **Arrastra toda la carpeta** "Proyecto predeterminado" y suéltala en esa zona de Netlify
5. Espera unos segundos — Netlify subirá los archivos automáticamente
6. ¡Listo! Tu sitio estará en `https://nombre-aleatorio.netlify.app`

#### Paso 4: Cambiar el nombre del sitio

1. En el panel de Netlify, haz clic en **"Site configuration"** (Configuración del sitio)
2. En **"Site details"**, haz clic en **"Change site name"**
3. Escribe: `belleza-natural`
4. Tu sitio quedará en: `https://belleza-natural.netlify.app`

#### Paso 5: Verificar el sitio

1. Abre `https://belleza-natural.netlify.app` en tu navegador
2. Verifica que:
   - La página cargue correctamente
   - Los productos se muestren
   - El carrito funcione
   - El panel de administración (`/admin.html`) funcione

---

### Opción B: Vercel

#### Paso 1: Crear cuenta en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Regístrate con tu correo o cuenta de GitHub

#### Paso 2: Importar el proyecto

**Método A — Desde Git (recomendado):**
1. Primero sube tu proyecto a GitHub (ver sección GitHub Pages para instrucciones)
2. En Vercel, haz clic en **"Add New..." → "Project"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un sitio estático
5. Haz clic en **"Deploy"**

**Método B — Desde tu computadora:**
1. Descarga e instala [Node.js](https://nodejs.org) (versión LTS)
2. Abre una terminal (CMD o PowerShell) en la carpeta del proyecto
3. Ejecuta:
   ```bash
   npm install -g vercel
   vercel
   ```
4. Sigue las instrucciones en pantalla
5. ¡Listo!

#### Paso 3: Configurar nombre

1. En el panel de Vercel, ve a **"Settings" → "Domains"**
2. El sitio estará en `https://belleza-natural.vercel.app`

---

### Opción C: Cloudflare Pages

#### Paso 1: Crear cuenta en Cloudflare

1. Ve a [https://www.cloudflare.com](https://www.cloudflare.com)
2. Haz clic en **"Sign up"**
3. Regístrate con tu correo

#### Paso 2: Crear un nuevo sitio

1. En el panel de Cloudflare, busca **"Workers & Pages"** en el menú lateral
2. Haz clic en **"Create"**
3. Selecciona la pestaña **"Pages"**
4. Haz clic en **"Connect to Git"** (conecta tu repositorio de GitHub)
5. Selecciona el repositorio del proyecto
6. Configura:
   - **Project name:** `belleza-natural`
   - **Build command:** (dejar vacío — es un sitio estático)
   - **Output directory:** (dejar vacío o `/`)
7. Haz clic en **"Save and Deploy"**

#### Paso 3: Verificar

1. El sitio estará en `https://belleza-natural.pages.dev`
2. Cloudflare asigna automáticamente un subdominio `.pages.dev`

---

### Opción D: GitHub Pages

#### Paso 1: Crear cuenta en GitHub

1. Ve a [https://github.com](https://github.com)
2. Haz clic en **"Sign up"**
3. Regístrate con tu correo

#### Paso 2: Crear un repositorio

1. Inicia sesión en GitHub
2. Haz clic en el botón **"+"** (esquina superior derecha) → **"New repository"**
3. Configura:
   - **Repository name:** `belleza-natural`
   - **Public** (público — necesario para plan gratuito)
   - Marca **"Add a README file"**
4. Haz clic en **"Create repository"**

#### Paso 3: Subir los archivos

1. En la página del repositorio, haz clic en **"uploading an existing file"**
2. Arrastra todos los archivos del proyecto:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `admin.html`
   - `admin.js`
   - `team-status.html`
   - `team-brain.json`
3. Haz clic en **"Commit changes"**

#### Paso 4: Activar GitHub Pages

1. En el repositorio, ve a **"Settings"** (Configuración)
2. En el menú lateral, haz clic en **"Pages"**
3. En **"Source"**, selecciona **"Deploy from a branch"**
4. En **"Branch"**, selecciona `main` y carpeta `/ (root)`
5. Haz clic en **"Save"**
6. Espera 1-2 minutos
7. Tu sitio estará en: `https://TU-USUARIO.github.io/belleza-natural/`

---

### Opción E: Hosting Tradicional (Hostgator, SiteGround, etc.)

#### Paso 1: Contratar un plan

1. Visita [https://www.hostgator.com](https://www.hostgator.com) o [https://www.siteground.com](https://www.siteground.com)
2. Selecciona un plan básico (Startup o Single)
3. Completa el proceso de compra

#### Paso 2: Acceder a cPanel

1. Recibirás un correo con los datos de acceso a cPanel
2. Inicia sesión en cPanel (normalmente `https://tudominio.com:2083`)

#### Paso 3: Subir archivos

1. En cPanel, busca **"File Manager"** (Administrador de archivos)
2. Navega a la carpeta `public_html`
3. Haz clic en **"Upload"** (Subir)
4. Sube todos los archivos del proyecto
5. Asegúrate de que `index.html` esté directamente en `public_html` (no en una subcarpeta)

#### Paso 4: Configurar SSL

1. En cPanel, busca **"SSL/TLS Status"**
2. Haz clic en **"Run AutoSSL"**
3. Espera a que se genere el certificado (puede tardar unos minutos)
4. Activa **"Force HTTPS"** en la configuración del dominio

---

## 3. Dominio Personalizado

### ¿Qué es un dominio?

Es la dirección web de tu tienda, por ejemplo: **www.bellezanatural.com**

### ¿Dónde comprar un dominio?

| Proveedor | Precio aprox. (.com) | Precio approx. (.mx) | Notas |
|---|---|---|---|
| **Namecheap** | ~$10 USD/año | ~$25 USD/año | Buen precio, fácil de usar |
| **GoDaddy** | ~$12 USD/año | ~$30 USD/año | El más conocido |
| **Google Domains** | ~$12 USD/año | — | (Redirigido a Squarespace) |
| **Cloudflare** | ~$10 USD/año | — | Precio de costo, sin markup |
| **DonDominio** | ~$12 USD/año | ~$20 USD/año | Soporte en español |

### Paso a paso para comprar y configurar

#### Paso 1: Comprar el dominio

1. Ve a [https://www.namecheap.com](https://www.namecheap.com) (recomendado)
2. Busca `bellezanatural.com` en el buscador
3. Si está disponible, agrégalo al carrito
4. Completa la compra (necesitarás una tarjeta de crédito o PayPal)
5. Recibirás un correo de confirmación

#### Paso 2: Configurar el dominio en Netlify (ejemplo)

1. En el panel de Netlify, ve a **"Site configuration" → "Domain management"**
2. Haz clic en **"Add custom domain"**
3. Escribe: `bellezanatural.com`
4. Netlify te pedirá configurar los DNS

#### Paso 3: Configurar los DNS (Nameservers)

**En Namecheap:**
1. Inicia sesión en Namecheap
2. Ve a **"Domain List"** → **"Manage"** junto a tu dominio
3. Busca la sección **"Nameservers"**
4. Selecciona **"Custom DNS"**
5. Ingresa los nameservers de Netlify:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
6. Guarda los cambios

**En Cloudflare:**
1. En el panel de Cloudflare, ve a **"Workers & Pages" → tu sitio → "Custom domains"**
2. Haz clic en **"Set up a custom domain"**
3. Escribe tu dominio
4. Cloudflare te mostrará los registros DNS que debes agregar
5. Si tu dominio está en Cloudflare, se configura automáticamente

#### Paso 4: Esperar la propagación

- Los DNS pueden tardar **de 5 minutos a 48 horas** en propagarse
- Generalmente es de 15-30 minutos
- Puedes verificar el estado en [https://www.whatsmydns.net](https://www.whatsmydns.net)

#### Paso 5: Verificar

1. Abre `https://bellezanatural.com` en tu navegador
2. Debería mostrar tu tienda
3. Si no funciona, espera unas horas y vuelve a intentar

---

## 4. SSL / HTTPS

### ¿Qué es SSL/HTTPS?

SSL (Secure Sockets Layer) es un certificado que encripta la conexión entre el navegador y tu sitio. El **HTTPS** (con la "S" de seguro) indica que la conexión es segura.

### ¿Por qué es importante?

- 🔒 **Seguridad:** Protege los datos de tus clientes (información de pago, datos personales)
- 🔍 **SEO:** Google posiciona mejor los sitios con HTTPS
- ✅ **Confianza:** Los clientes ven el candado 🔒 en la barra de direcciones
- ⚠️ **Obligatorio:** Sin HTTPS, los navegadores marcan tu sitio como "No seguro"

### Configuración por plataforma

#### Netlify (SSL automático)

1. En **"Site configuration" → "Domain management"**
2. Busca la sección **"HTTPS"**
3. Haz clic en **"Verify DNS configuration"**
4. Haz clic en **"Provision certificate"**
5. Netlify obtiene un certificado SSL gratuito de Let's Encrypt automáticamente
6. Activa **"Force HTTPS"** para redirigir todo el tráfico a HTTPS

#### Vercel (SSL automático)

- Vercel proporciona SSL automáticamente para todos los sitios
- No requiere configuración adicional
- El certificado se renueva automáticamente

#### Cloudflare Pages (SSL automático)

- Cloudflare proporciona SSL automáticamente
- Ve a **"SSL/TLS" → "Overview"** y selecciona **"Full (strict)"**
- Activa **"Always Use HTTPS"**

#### GitHub Pages (SSL automático)

1. En **"Settings" → "Pages"**
2. Marca la casilla **"Enforce HTTPS"**
3. GitHub proporciona el certificado automáticamente

#### Hosting tradicional (cPanel)

1. En cPanel, busca **"SSL/TLS Status"**
2. Haz clic en **"Run AutoSSL"**
3. Espera a que se genere el certificado
4. Busca **"Force HTTPS Redirect"** y actívalo

### Verificar que SSL funciona

1. Abre tu sitio en el navegador
2. Busca el ícono de **candado 🔒** en la barra de direcciones
3. Haz clic en el candado — debe decir "Conexión segura"
4. También puedes verificar en [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/)

---

## 5. Optimización del Sitio

### 5.1 Compresión de Imágenes

Las imágenes son los archivos más pesados de un sitio web. Optimizarlos mejora drásticamente la velocidad.

#### Herramientas gratuitas de compresión

| Herramienta | URL | Uso |
|---|---|---|
| **TinyPNG** | [https://tinypng.com](https://tinypng.com) | Comprime PNG y JPEG |
| **Squoosh** | [https://squoosh.app](https://squoosh.app) | Compresión avanzada (Google) |
| **ImageOptim** | [https://imageoptim.com](https://imageoptim.com) | Para Mac |
| **Caesium** | [https://saerasoft.com/caesium](https://saerasoft.com/caesium) | Para Windows |

#### Recomendaciones

- Usa formato **WebP** para las imágenes de productos (es más ligero que JPEG/PNG)
- Tamaño recomendado para imágenes de productos: **800x800 píxeles**
- Tamaño recomendado para banners/hero: **1920x1080 píxeles**
- Compresión objetivo: menos de **200 KB** por imagen

#### Cómo convertir a WebP

1. Ve a [https://squoosh.app](https://squoosh.app)
2. Arrastra tu imagen
3. En el panel derecho, selecciona **WebP** como formato
4. Ajusta la calidad (70-80% es ideal)
5. Haz clic en el botón de descarga
6. Reemplaza la imagen original

### 5.2 Caché del Navegador

La caché permite que los archivos se guarden en el navegador del visitante para que no tengan que descargarse cada vez.

#### Agregar headers de caché en Netlify

Crea un archivo llamado `_headers` en la raíz del proyecto:

```
# Cachear imágenes por 30 días
/assets/*
  Cache-Control: public, max-age=2592000

# Cachear CSS y JS por 7 días
/*.css
  Cache-Control: public, max-age=604800

/*.js
  Cache-Control: public, max-age=604800

# No cachear HTML
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

#### Agregar headers de caché en Cloudflare

1. En el panel de Cloudflare, ve to **"Caching" → "Configuration"**
2. Configura:
   - **Browser Cache TTL:** 4 hours (o más)
   - **Always Online:** On

### 5.3 CDN (Content Delivery Network)

Una CDN es una red de servidores en todo el mundo que sirven tu sitio desde el servidor más cercano al visitante.

| Plataforma | CDN incluido | Notas |
|---|---|---|
| **Netlify** | ✅ Sí (CDN global) | Automático |
| **Vercel** | ✅ Yes (Edge Network) | Automático |
| **Cloudflare Pages** | ✅ Yes (Cloudflare CDN) | El más rápido del mercado |
| **GitHub Pages** | ✅ Yes (Fastly CDN) | Automático |
| **Hosting tradicional** | ❌ No (a menos que configures Cloudflare gratis) | Requiere configuración adicional |

**Recomendación:** Si usas hosting tradicional, puedes crear una cuenta gratuita en Cloudflare y configurar su CDN gratuito para mejorar la velocidad.

### 5.4 Optimización de Fuentes (Fonts)

El proyecto usa Google Fonts (Playfair Display e Inter). Para optimizar:

1. **Preconectar** a Google Fonts (ya está en el HTML)
2. **Usar `display=swap`** para que el texto sea visible mientras cargan las fuentes
3. Considera descargar las fuentes localmente si quieres máxima velocidad

### 5.5 Minificación de CSS y JS

La minificación elimina espacios y comentarios para reducir el tamaño de los archivos.

#### Herramientas

- **CSS:** [https://cssminifier.com](https://cssminifier.com)
- **JS:** [https://javascript-minifier.com](https://javascript-minifier.com)

#### Nota sobre este proyecto

Netlify, Vercel y Cloudflare Pages **minifican automáticamente** los archivos en sus planes gratuitos. No necesitas hacer nada manualmente.

### 5.6 Verificar la velocidad

Usa estas herramientas para medir el rendimiento:

| Herramienta | URL |
|---|---|
| **Google PageSpeed Insights** | [https://pagespeed.web.dev](https://pagespeed.web.dev) |
| **GTmetrix** | [https://gtmetrix.com](https://gtmetrix.com) |
| **Pingdom** | [https://tools.pingdom.com](https://tools.pingdom.com) |

**Objetivo:** Puntuación de **80+** en móvil y **90+** en escritorio.

---

## 6. Backup de Datos

### 6.1 ¿Qué datos tiene la tienda?

La tienda "Belleza Natural" usa **localStorage** del navegador para almacenar:

| Dato | Clave en localStorage | Descripción |
|---|---|---|
| **Productos** | `belleza_productos` | Catálogo de productos (nombre, precio, categoría, etc.) |
| **Carrito** | (no persistente) | El carrito se pierde al cerrar el navegador |
| **Datos de contacto** | (no se guardan) | Los formularios no envían datos a ningún servidor |

### 6.2 Limitación importante

> ⚠️ **El localStorage es local:** Los datos se guardan en el navegador de CADA cliente individualmente. No hay una base de datos central.

Esto significa que:
- Si un cliente agrega productos al carrito, solo se guarda en SU navegador
- Si el administrador cambia productos desde `admin.html`, solo se guarda en SU navegador
- **No hay sincronización** entre diferentes clientes

### 6.3 Cómo hacer backup del catálogo de productos

#### Método 1: Exportar desde el panel de administración

1. Abre `admin.html` en tu navegador
2. Busca la opción de **"Exportar"** o **"Backup"** (si está implementada)
3. Descarga el archivo JSON

#### Método 2: Exportar manualmente desde el navegador

1. Abre tu tienda en el navegador
2. Presiona **F12** para abrir las herramientas de desarrollador
3. Ve a la pestaña **"Application"** (Aplicación)
4. En el menú lateral, expande **"Local Storage"**
5. Haz clic en la URL de tu sitio
6. Busca la clave `belleza_productos`
7. Copia el valor (es un JSON)
8. Pégalo en un archivo de texto y guárdalo como `backup-productos.json`

#### Método 3: Usar un script de backup

Crea un archivo llamado `backup.html` en la carpeta del proyecto:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Backup - Belleza Natural</title>
</head>
<body>
    <h1>Backup de Datos</h1>
    <button onclick="exportar()">Exportar Productos</button>
    <button onclick="importar()">Importar Productos</button>
    <input type="file" id="fileInput" accept=".json" style="display:none;">
    <pre id="output"></pre>

    <script>
        function exportar() {
            const datos = localStorage.getItem('belleza_productos');
            if (!datos) {
                alert('No hay productos guardados');
                return;
            }
            const blob = new Blob([datos], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'backup-belleza-natural-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        function importar() {
            document.getElementById('fileInput').click();
        }

        document.getElementById('fileInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const datos = JSON.parse(e.target.result);
                    localStorage.setItem('belleza_productos', JSON.stringify(datos));
                    document.getElementById('output').textContent = 'Importación exitosa: ' + datos.length + ' productos';
                } catch (err) {
                    alert('Error al importar: ' + err.message);
                }
            };
            reader.readAsText(file);
        });
    </script>
</body>
</html>
```

### 6.4 Backup del código fuente

#### Opción A: GitHub (recomendado)

1. Sube tu proyecto a GitHub (ver instrucciones en la sección GitHub Pages)
2. GitHub guarda una copia de todos los archivos
3. Puedes descargar el repositorio en cualquier momento como ZIP

#### Opción B: Copia de seguridad manual

1. Crea una carpeta llamada `backups` en tu computadora
2. Cada vez que hagas cambios importantes:
   - Copia toda la carpeta del proyecto
   - Pégala en `backups/YYYY-MM-DD/` (por ejemplo, `backups/2026-09-27/`)
3. También puedes usar servicios como Google Drive, OneDrive o Dropbox

#### Opción C: OneDrive (ya lo tienes)

Tu proyecto está en `C:\Users\pipev\OneDrive\Documentos\Proyecto predeterminado` — **OneDrive ya está haciendo backup automático** de tus archivos. ¡Aprovecha esto!

### 6.5 Calendario de backup recomendado

| Frecuencia | Qué respaldar | Dónde |
|---|---|---|
| **Semanal** | Código fuente (archivos) | GitHub o OneDrive |
| **Mensual** | Catálogo de productos (JSON) | Descarga manual + OneDrive |
| **Antes de cambios importantes** | Todo el proyecto | Copia completa en OneDrive |
| **Trimestral** | Verificar que los backups funcionen | Restaurar de prueba |

---

## 7. Mantenimiento

### 7.1 Tareas recurrentes

#### Semanales

- [ ] Revisar que el sitio cargue correctamente
- [ ] Probar el carrito de compras
- [ ] Probar el formulario de contacto
- [ ] Probar el formulario de newsletter
- [ ] Verificar que no haya errores en la consola del navegador (F12 → Console)

#### Mensuales

- [ ] Revisar estadísticas de visitas (Netlify/Vercel/Cloudflare tienen analytics)
- [ ] Verificar que el SSL siga activo
- [ ] Revisar comentarios o mensajes de clientes
- [ ] Actualizar productos si es necesario
- [ ] Hacer backup del catálogo de productos

#### Trimestrales

- [ ] Revisar y actualizar precios
- [ ] Agregar nuevos productos de temporada
- [ ] Revisar la velocidad del sitio (PageSpeed Insights)
- [ ] Actualizar testimonios de clientes
- [ ] Revisar enlaces rotos

#### Anuales

- [ ] Renovar el dominio (~$10-15 USD/año)
- [ ] Renovar el hosting (si es de pago)
- [ ] Revisar la estrategia de precios
- [ ] Actualizar el diseño si es necesario
- [ ] Revisar la competencia

### 7.2 Actualizar productos

1. Abre `admin.html` en tu navegador
2. Inicia sesión (si hay autenticación)
3. Edita, agrega o elimina productos
4. Los cambios se guardan en localStorage
5. **Importante:** Los cambios solo se guardan en TU navegador. Para que los clientes vean los cambios, necesitas actualizar el archivo `app.js` con los nuevos datos por defecto.

### 7.3 Actualizar el sitio después de cambios

#### En Netlify (drag-and-drop)

1. Ve al panel de Netlify
2. Arrastra la carpeta del proyecto actualizada a la zona de despliegue
3. ¡Listo!

#### En GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **"uploading an existing file"**
3. Sube los archivos actualizados
4. Haz clic en **"Commit changes"**

#### En hosting tradicional

1. Conéctate por FTP (usando FileZilla) o usa el File Manager de cPanel
2. Sube los archivos actualizados
3. Sobreescribe los archivos existentes

### 7.4 Monitoreo de uptime

Usa estas herramientas gratuitas para saber si tu sitio está caído:

| Herramienta | URL | Plan gratuito |
|---|---|---|
| **UptimeRobot** | [https://uptimerobot.com](https://uptimerobot.com) | 50 monitoreos, cada 5 min |
| **StatusCake** | [https://www.statuscake.com](https://www.statuscake.com) | 10 monitoreos |
| **Freshping** | [https://www.freshworks.com/freshping/](https://www.freshworks.com/freshping/) | 50 monitoreos, cada 1 min |

**Recomendación:** Configura UptimeRobot para recibir una alerta por correo o WhatsApp si tu sitio se cae.

---

## 8. Escalabilidad

### 8.1 Señales de que necesitas escalar

- Más de **1,000 visitas por mes**
- Más de **50 productos** en el catálogo
- Necesitas **procesar pagos** reales (no solo simular)
- Necesitas **base de datos central** (que todos los clientes vean los mismos datos)
- Necesitas **correo corporativo** (hola@bellezanatural.com)
- Necesitas **múltiples usuarios** administradores

### 8.2 Opciones de escalabilidad

#### Nivel 1: Mejorar el hosting (cuando superes los límites del plan gratuito)

| Plataforma | Plan | Precio | Cuándo migrar |
|---|---|---|---|
| **Netlify Pro** | $19 USD/mes | Cuando necesites más ancho de banda o funciones avanzadas |
| **Vercel Pro** | $20 USD/mes | Cuando necesites más rendimiento o funciones serverless |
| **Cloudflare Pages** | Ilimitado | No tiene límites prácticos en plan gratuito |

#### Nivel 2: Agregar backend (cuando necesites base de datos)

| Solución | Precio | Uso |
|---|---|---|
| **Firebase (Google)** | Gratis hasta 50,000 lecturas/día | Base de datos en tiempo real, autenticación |
| **Supabase** | Gratis hasta 500 MB | Base de datos PostgreSQL, autenticación |
| **MongoDB Atlas** | Gratis hasta 512 MB | Base de datos NoSQL |

#### Nivel 3: Migrar a e-commerce completo

| Plataforma | Precio | Ventajas |
|---|---|---|
| **Shopify** | $29 USD/mes | La más fácil, todo incluido |
| **WooCommerce** | Gratis (requiere hosting WordPress) | Muy flexible, miles de plugins |
| **Tiendanube** | Desde $25 USD/mes | Popular en Latinoamérica |
| **Mercado Shop** | Gratis | Integrado con Mercado Libre |

### 8.3 Migración a Shopify (cuando estés lista)

Cuando tu negocio crezca y necesites:
- Procesar pagos reales (tarjetas, PayPal, OXXO)
- Manejar inventario real
- Generar facturas
- Integrarte con paqueterías

**Pasos:**
1. Crea una cuenta en [https://www.shopify.com](https://www.shopify.com)
2. Elige una plantilla (tema) para tu tienda
3. Importa tus productos (puedes hacerlo manualmente o con CSV)
4. Configura los métodos de pago
5. Configura los envíos
6. Apunta tu dominio a Shopify
7. ¡Lanza tu nueva tienda!

### 8.4 Arquitectura recomendada para crecimiento

```
Fase 1 (Ahora):     Sitio estático → Netlify/Cloudflare Pages
                         ↓
Fase 2 (6-12 meses):  + Firebase para base de datos
                      + Procesador de pagos (Stripe/Mercado Pago)
                         ↓
Fase 3 (1-2 años):    + Backend completo (Node.js, Python)
                      + Aplicación móvil
                         ↓
Fase 4 (2+ años):     Migración a Shopify o plataforma enterprise
```

---

## 9. Desglose de Costos

### 9.1 Costos por opción (en USD)

#### Opción 1: GitHub Pages (100% gratis)

| Concepto | Costo mensual | Costo anual |
|---|---|---|
| Hosting | $0 | $0 |
| SSL | $0 | $0 |
| Dominio (.com) | ~$0.83 | ~$10 |
| **Total** | **~$0.83** | **~$10** |

#### Opción 2: Netlify (Plan gratuito)

| Concepto | Costo mensual | Costo anual |
|---|---|---|
| Hosting | $0 | $0 |
| SSL | $0 | $0 |
| Dominio (.com) | ~$0.83 | ~$10 |
| **Total** | **~$0.83** | **~$10** |

#### Opción 3: Vercel (Plan gratuito)

| Concepto | Costo mensual | Costo anual |
|---|---|---|
| Hosting | $0 | $0 |
| SSL | $0 | $0 |
| Dominio (.com) | ~$0.83 | ~$10 |
| **Total** | **~$0.83** | **~$10** |

#### Opción 4: Cloudflare Pages (Plan gratuito)

| Concepto | Costo mensual | Costo anual |
|---|---|---|
| Hosting | $0 | $0 |
| SSL | $0 | $0 |
| Dominio (.com) | ~$0.83 | ~$10 |
| **Total** | **~$0.83** | **~$10** |

#### Opción 5: Hosting Tradicional (Hostgator/SiteGround)

| Concepto | Costo mensual | Costo anual |
|---|---|---|
| Hosting (plan básico) | ~$3-5 | ~$36-60 |
| SSL | $0 (incluido) | $0 |
| Dominio (.com) | ~$0.83 | ~$10 |
| **Total** | **~$3.83-5.83** | **~$46-70** |

### 9.2 Costos adicionales opcionales

| Concepto | Costo | Cuándo necesitarlo |
|---|---|---|
| **Correo corporativo** | ~$1-3 USD/mes | Cuando quieras hola@bellezanatural.com |
| **Analytics avanzado** | $0-29 USD/mes | Cuando necesites datos detallados de visitas |
| **Email marketing** | $0-15 USD/mes | Para enviar newsletters (Mailchimp, Brevo) |
| **Optimización de imágenes** | $0 | Herramientas gratuitas disponibles |
| **Logo profesional** | $0-50 (una vez) | Si no tienes logo aún |
| **Fotografía de productos** | $0-200 (una vez) | Mejora la conversión de la tienda |

### 9.3 Resumen de costos anuales

| Escenario | Costo anual total |
|---|---|
| **Mínimo (GitHub Pages + dominio)** | ~$10 USD |
| **Recomendado (Netlify + dominio + email marketing)** | ~$30-50 USD |
| **Profesional (Vercel Pro + dominio + email + analytics)** | ~$250-350 USD |
| **E-commerce completo (Shopify)** | ~$350-500 USD |

---

## 10. Checklist Final

### Antes de lanzar

- [ ] El sitio carga correctamente en `index.html`
- [ ] Todos los productos se muestran
- [ ] El carrito de compras funciona
- [ ] El formulario de contacto funciona
- [ ] El formulario de newsletter funciona
- [ ] El panel de administración (`admin.html`) funciona
- [ ] El sitio se ve bien en móvil (responsive)
- [ ] El sitio se ve bien en escritorio
- [ ] No hay errores en la consola del navegador (F12 → Console)

### Después de desplegar

- [ ] El sitio está accesible en la URL de Netlify/Vercel/Cloudflare
- [ ] El SSL está activo (candado 🔒 en el navegador)
- [ ] El dominio personalizado apunta correctamente
- [ ] Se configuró "Force HTTPS"
- [ ] Se verificó la velocidad en PageSpeed Insights
- [ ] Se configuró UptimeRobot para monitoreo
- [ ] Se hizo el primer backup de productos

### Lanzamiento

- [ ] Se compartió el enlace en redes sociales
- [ ] Se configuró Google Search Console
- [ ] Se creó una cuenta de Google Business Profile
- [ ] Se configuraron las redes sociales (Instagram, Facebook, TikTok)
- [ ] Se preparó el primer correo de newsletter

---

## Recursos Adicionales

### Herramientas mencionadas

| Herramienta | URL |
|---|---|
| Netlify | [https://www.netlify.com](https://www.netlify.com) |
| Vercel | [https://vercel.com](https://vercel.com) |
| Cloudflare Pages | [https://pages.cloudflare.com](https://pages.cloudflare.com) |
| GitHub Pages | [https://pages.github.com](https://pages.github.com) |
| Namecheap (dominios) | [https://www.namecheap.com](https://www.namecheap.com) |
| TinyPNG | [https://tinypng.com](https://tinypng.com) |
| Squoosh | [https://squoosh.app](https://squoosh.app) |
| PageSpeed Insights | [https://pagespeed.web.dev](https://pagespeed.web.dev) |
| UptimeRobot | [https://uptimerobot.com](https://uptimerobot.com) |
| Google Search Console | [https://search.google.com/search-console](https://search.google.com/search-console) |
| Google Business Profile | [https://www.google.com/business](https://www.google.com/business) |

### Soporte

- **Netlify:** [https://answers.netlify.com](https://answers.netlify.com)
- **Vercel:** [https://vercel.com/docs](https://vercel.com/docs)
- **Cloudflare:** [https://developers.cloudflare.com](https://developers.cloudflare.com)
- **GitHub:** [https://docs.github.com](https://docs.github.com)

---

> **Nota final:** Esta guía fue creada específicamente para la tienda "Belleza Natural". Si tienes dudas sobre algún paso, consulta la documentación oficial de la plataforma que elijas o busca tutoriales en YouTube con el nombre de la plataforma + "tutorial español".

---

*Documento creado para el proyecto Belleza Natural — Septiembre 2026*
