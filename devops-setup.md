# Guía de Despliegue — Tienda NØRDIKO

> **Público objetivo:** Dueño de negocio sin experiencia técnica, usa Android, presupuesto mínimo.
> **Objetivo:** Publicar la tienda en internet de forma gratuita y mantenerla actualizada sin tocar código.

---

## Tabla de contenidos

1. [¿Necesitamos base de datos?](#1-necesitamos-base-de-datos)
2. [Configuración de Git](#2-configuración-de-git)
3. [GitHub](#3-github)
4. [Netlify (RECOMENDADO)](#4-netlify-recomendado)
5. [Vercel (alternativa)](#5-vercel-alternativa)
6. [Estrategia de datos](#6-estrategia-de-datos)
7. [Mantenimiento](#7-mantenimiento)
8. [Costos](#8-costos)

---

## 1. ¿Necesitamos base de datos?

### Respuesta corta: **NO (por ahora)**

La tienda NØRDIKO funciona con `localStorage`, lo cual es suficiente para:

| ✅ Sí funciona con localStorage | ❌ Necesitaría base de datos |
|-------------------------------|------------------------------|
| Catálogo de productos (10-500 items) | Miles de productos con búsqueda compleja |
| Carrito de compras temporal | Procesar pagos reales |
| Preferencias del usuario (tema, idioma) | Cuentas de usuario con login |
| Borradores de pedidos | Múltiples vendedores |
| Panel de administración local | Inventario en tiempo real multi-dispositivo |

### ¿Cuándo SÍ necesitarás una base de datos?

- **Pagos reales:** Cuando quieras cobrar con tarjeta (Stripe, Mercado Pago)
- **Usuarios registrados:** Cuando los clientes creen cuentas
- **Pedidos centralizados:** Cuando necesites ver todos los pedidos en un panel (no solo en el navegador del cliente)
- **Más de 500 productos:** El localStorage tiene límite de ~5-10 MB
- **App móvil:** Si en el futuro haces app con React Native/Flutter

### Opciones de base de datos (cuando las necesites)

| Opción | Precio | Dificultad | Mejor para |
|--------|--------|------------|------------|
| **Firebase (Google)** | Gratis hasta 50k lecturas/día | Fácil | Tiendas pequeñas, tiempo real |
| **Supabase** | Gratis hasta 500 MB | Media | Si necesitas SQL y auth |
| **PlanetScale** | Gratis hasta 1 GB | Media | MySQL serverless |
| **Airtable** | Gratis hasta 1,000 registros | Muy fácil | Panel admin visual, no-código |

### Migración de localStorage a BD (resumen futuro)

Cuando llegue el momento, el proceso sería:

1. **Elegir proveedor** (recomendado: Firebase por su SDK simple)
2. **Crear capa de datos** en el código: reemplazar `localStorage.getItem/setItem` por llamadas a la BD
3. **Migrar datos existentes**: script que lea localStorage y suba a la BD
4. **Probar** en ambiente de staging
5. **Desplegar** en producción

> 💡 **Consejo:** Diseña el código desde ahora con una "capa de datos" (un solo archivo `js/database.js` que maneje todas las lecturas/escrituras). Así el cambio futuro es reemplazar ese único archivo.

---

## 2. Configuración de Git

### 2.1 Instalación de Git en Windows

1. Abre tu navegador y ve a: **https://git-scm.com/download/win**
2. Se descargará automáticamente el instalador
3. Ejecuta el archivo descargado (`Git-2.xx.x-64-bit.exe`)
4. En el instalador, acepta las opciones por defecto (presiona **Next** en cada pantalla)
5. Al final, marca la casilla **"Launch Git Bash"** y presiona **Finish**

**Verificar la instalación:**

Abre el menú inicio, busca **"Git Bash"** y ábrelo. Escribe:

```bash
git --version
```

Deberías ver algo como:
```
git version 2.43.0.windows.1
```

### 2.2 Configuración inicial

En Git Bash, ejecuta estos dos comandos (reemplaza con tus datos):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tucorreo@ejemplo.com"
```

**Verificar que quedó bien:**

```bash
git config --global --list
```

Salida esperada:
```
user.name=Tu Nombre
user.email=tucorreo@ejemplo.com
```

### 2.3 Crear .gitignore

El archivo `.gitignore` le dice a Git qué archivos NO subir al repositorio (archivos temporales, credenciales, etc.).

En la carpeta de tu proyecto, crea un archivo llamado `.gitignore` (con el punto al inicio) con este contenido:

```gitignore
# Archivos del sistema
.DS_Store
Thumbs.db
desktop.ini

# Archivos de código
*.log
node_modules/
.vscode/
.idea/

# Credenciales (NUNCA subir estos archivos)
.env
config.json
credentials.json

# Archivos temporales
*.tmp
*.bak
*~
```

### 2.4 Cómo hacer commit y push (flujo básico)

```bash
# 1. Entrar a la carpeta del proyecto
cd "C:/Users/pipev/OneDrive/Documentos/Proyecto predeterminado"

# 2. Inicializar Git (solo la primera vez)
git init

# 3. Agregar todos los archivos al "stage"
git add .

# 4. Hacer commit con un mensaje descriptivo
git commit -m "Primera versión de la tienda NØRDIKO"

# 5. Conectar con GitHub (después de crear el repositorio, ver sección 3)
git remote add origin https://github.com/tuusuario/nordiko.git

# 6. Subir los archivos
git push -u origin main
```

**Para actualizaciones futuras (flujo corto):**

```bash
git add .
git commit -m "Actualicé precios de productos"
git push
```

---

## 3. GitHub

### 3.1 Crear cuenta

1. Ve a **https://github.com**
2. Presiona **"Sign up"**
3. Ingresa tu correo, crea una contraseña, elige un nombre de usuario
4. Verifica tu correo con el código que te envían

### 3.2 Crear repositorio

1. En GitHub, presiona el botón **"+"** (esquina superior derecha) → **"New repository"**
2. Completa:
   - **Repository name:** `nordiko`
   - **Description:** `Tienda en línea NØRDIKO`
   - **Visibility:** Public (gratis) o Private (también gratis ahora)
3. **NO** marques "Add a README file" (ya tienes archivos)
4. Presiona **"Create repository"**

### 3.3 Subir el proyecto

GitHub te mostrará instrucciones. Como ya tienes Git configurado, usa la sección **"…or push an existing repository from the command line"**:

```bash
git remote add origin https://github.com/tuusuario/nordiko.git
git branch -M main
git push -u origin main
```

### 3.4 Configurar GitHub Pages (opción gratuita)

1. En tu repositorio, ve a **Settings** (pestaña superior)
2. En el menú lateral, presiona **Pages**
3. En **Source**, selecciona **"Deploy from a branch"**
4. En **Branch**, selecciona `main` y carpeta `/ (root)`
5. Presiona **Save**
6. Espera 1-2 minutos. Tu sitio estará en:
   ```
   https://tuusuario.github.io/nordiko/
   ```

> ⚠️ **Limitaciones de GitHub Pages:**
> - Solo sitios estáticos (lo cual es perfecto para NØRDIKO)
> - Sin formularios que funcionen sin backend
> - Sin funciones serverless
> - 100 GB de ancho de banda/mes (más que suficiente)

---

## 4. Netlify (RECOMENDADO)

### ¿Por qué Netlify?

- ✅ **100% gratis** para sitios pequeños
- ✅ **Despliegue automático**: cada vez que haces `git push`, el sitio se actualiza solo
- ✅ **HTTPS gratuito** (certificado SSL automático)
- ✅ **Formularios** funcionan sin backend
- ✅ **Funciones serverless** si las necesitas después
- ✅ **Panel visual** fácil de usar desde el celular

### 4.1 Crear cuenta en Netlify

1. Ve a **https://www.netlify.com**
2. Presiona **"Sign up"**
3. Regístrate con tu cuenta de GitHub (es la opción más fácil)
4. Autoriza el acceso

### 4.2 Conectar repositorio de GitHub

1. En el panel de Netlify, presiona **"Add new site"** → **"Import an existing project"**
2. Selecciona **GitHub**
3. Autoriza si te lo pide
4. Busca el repositorio `nordiko` y selecciónalo
5. En la configuración de build:
   - **Build command:** (dejar vacío, es sitio estático)
   - **Publish directory:** (dejar vacío o `.`)
6. Presiona **"Deploy site"**

### 4.3 Despliegue automático

¡Listo! A partir de ahora:

```bash
# Cada vez que hagas cambios en el código:
git add .
git commit -m "Nuevos productos agregados"
git push
```

Netlify detecta el cambio y **reconstruye el sitio automáticamente** en ~30 segundos.

### 4.4 Dominio personalizado

**Opción A: Subdominio gratuito de Netlify**

1. En tu sitio, ve to **Site settings** → **Domain management**
2. Presiona **"Change site name"**
3. Escribe: `nordiko-tu-marca`
4. Tu sitio quedará en: `https://nordiko-tu-marca.netlify.app`

**Opción B: Dominio propio (~$10-15/año)**

1. Compra un dominio en Namecheap, GoDaddy o Cloudflare
2. En Netlify: **Site settings** → **Domain management** → **Add a domain**
3. Sigue las instrucciones para configurar los DNS
4. Netlify configura HTTPS automáticamente

### 4.5 HTTPS gratuito

Netlify lo hace automáticamente. No necesitas hacer nada. El candado 🔒 aparecerá en tu sitio.

### 4.6 Formularios (cuando los necesites)

Agrega `netlify` a tu formulario HTML:

```html
<form name="contacto" netlify>
  <input type="text" name="nombre" />
  <input type="email" name="email" />
  <button type="submit">Enviar</button>
</form>
```

Los mensajes llegarán al panel de Netlify y a tu correo.

### 4.7 Funciones serverless (futuro)

Si necesitas procesar pagos o conectar una BD, Netlify Functions te permite ejecutar código del lado del servidor sin pagar por un servidor.

---

## 5. Vercel (alternativa)

### ¿Cuándo elegir Vercel en vez de Netlify?

- Si quieres **mejor rendimiento global** (CDN más rápida)
- Si planeas usar **Next.js** en el futuro
- Si prefieres su interfaz

### Pasos para Vercel

1. Ve a **https://vercel.com**
2. Regístrate con GitHub
3. Presiona **"Add New"** → **"Project"**
4. Importa tu repositorio `nordiko`
5. Presiona **"Deploy"**
6. Listo — despliegue automático con cada push

### Comparación rápida

| Característica | Netlify | Vercel |
|---------------|---------|--------|
| Plan gratuito | ✅ 100 GB/mes | ✅ 100 GB/mes |
| Despliegue automático | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| Formularios | ✅ Nativo | ❌ Requiere servicios externos |
| Funciones serverless | ✅ | ✅ |
| Facilidad desde el celular | ✅ Mejor | ✅ |
| Velocidad global | ✅ | ✅ Más rápida |

> **Recomendación final:** Para NØRDIKO, **Netlify** es la mejor opción por sus formularios integrados y facilidad de uso.

---

## 6. Estrategia de datos

### Cómo pasar de localStorage a una BD real

#### Paso 1: Preparar el código (ahora)

Crea un archivo `js/database.js` que centralice todas las operaciones:

```javascript
// js/database.js
const DB = {
  getProductos() {
    return JSON.parse(localStorage.getItem('nordiko_productos')) || [];
  },
  setProductos(productos) {
    localStorage.setItem('nordiko_productos', JSON.stringify(productos));
  },
  getPedidos() {
    return JSON.parse(localStorage.getItem('nordiko_pedidos')) || [];
  },
  setPedidos(pedidos) {
    localStorage.setItem('nordiko_pedidos', JSON.stringify(pedidos));
  }
};
```

Así, cuando cambies a BD, solo modificas este archivo.

#### Paso 2: Elegir proveedor (cuando lo necesites)

**Recomendado: Firebase**

- Gratis hasta 50,000 lecturas/día
- SDK de JavaScript muy simple
- Autenticación incluida
- Tiempo real (los datos se sincronizan solos)

#### Paso 3: Migración

```javascript
// Ejemplo de migración a Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "nordiko.firebaseapp.com",
  projectId: "nordiko",
  storageBucket: "nordiko.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reemplazar localStorage por Firebase
const DB = {
  async getProductos() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs.map(doc => doc.data());
  },
  async setProductos(productos) {
    for (const producto of productos) {
      await addDoc(collection(db, "productos"), producto);
    }
  }
};
```

#### Paso 4: Cuándo hacer el cambio

| Señal de que necesitas BD | Acción |
|---------------------------|--------|
| Quieres cobrar con tarjeta | Migrar a Firebase + Stripe |
| Necesitas ver pedidos de todos los clientes | Migrar a Firebase |
| Más de 500 productos | Migrar a Supabase |
| Quieres app móvil | Migrar a Firebase |

---

## 7. Mantenimiento

### 7.1 Cómo actualizar productos (sin tocar código)

**Opción A: Desde el panel de administración (recomendado)**

El panel de administración de NØRDIKO ya permite:
- Agregar/editar/eliminar productos
- Cambiar precios y descripciones
- Subir imágenes

Los cambios se guardan en localStorage. Para que se reflejen en la web:

1. Abre el panel de administración
2. Haz los cambios
3. Presiona **"Exportar datos"** (descarga un archivo JSON)
4. Envíame el archivo (o súbelo al repositorio)

**Opción B: Editar el archivo de datos directamente**

Los productos están en `js/datos.js` o similar. Puedes editar ese archivo con cualquier editor de texto.

### 7.2 Backups

**Backups automáticos (gracias a Git):**

Cada vez que haces `git push`, GitHub guarda una copia de todo tu proyecto. Es tu backup gratuito.

**Backup manual mensual:**

1. Ve a tu repositorio en GitHub
2. Presiona **"Code"** → **"Download ZIP"**
3. Guarda el ZIP en tu computadora y en Google Drive

**Backup de datos (localStorage):**

Si tienes pedidos o datos importantes en localStorage, exporta un backup desde el panel de administración cada mes.

### 7.3 Monitoreo básico

**¿Está caído mi sitio?**

- **UptimeRobot** (gratis): https://uptimerobot.com
  - Monitorea tu sitio cada 5 minutos
  - Te avisa por correo o Telegram si se cae
  - 50 monitores gratis

**¿Cuánta gente visita mi tienda?**

- **Google Analytics** (gratis): https://analytics.google.com
- **Netlify Analytics** (incluido en el plan gratuito)

**¿Hay errores en el código?**

- Abre la consola del navegador (F12) y revisa si hay errores rojos

---

## 8. Costos

### Desglose mensual

| Servicio | Costo mensual | ¿Por qué? |
|----------|--------------|-----------|
| **Git** | $0 | Software libre |
| **GitHub** | $0 | Repositorios públicos gratis |
| **Netlify** | $0 | Plan gratuito (100 GB/mes) |
| **Dominio** | ~$1-2/mes ($12-15/año) | Opcional pero recomendado |
| **UptimeRobot** | $0 | 50 monitores gratis |
| **Google Analytics** | $0 | Gratis |
| **TOTAL** | **$0 - $1.25/mes** | |

### Cuándo invertir más

| Situación | Inversión recomendada | Costo |
|-----------|----------------------|-------|
| Dominio personalizado (.com) | Namecheap o Cloudflare | ~$12-15/año |
| Más de 100 GB de tráfico/mes | Netlify Pro | $19/mes |
| Necesitas backend/BD | Firebase Spark (gratis) → Blaze ($25/mes) | $0-25/mes |
| Correo corporativo (hola@nordiko.com) | Google Workspace | $6/usuario/mes |
| App móvil | React Native + Firebase | $0-25/mes |

### Resumen de inversión

- **Año 1:** $0-15 (solo dominio si quieres)
- **Año 2+:** $15-50/año (dominio + mejoras)
- **Cuando escales:** $50-100/mes (backend, app, equipo)

---

## Resumen: Checklist de despliegue

```
☐ 1. Instalar Git en Windows
☐ 2. Configurar Git (nombre, email)
☐ 3. Crear .gitignore
☐ 4. Crear cuenta en GitHub
☐ 5. Crear repositorio en GitHub
☐ 6. Subir proyecto (git init, add, commit, push)
☐ 7. Crear cuenta en Netlify
☐ 8. Conectar repositorio de GitHub a Netlify
☐ 9. Verificar que el sitio esté en línea
☐ 10. Configurar dominio personalizado (opcional)
☐ 11. Configurar UptimeRobot (monitoreo)
☐ 12. Configurar Google Analytics (estadísticas)
```

---

## ¿Necesitas ayuda?

Si algo no funciona, revisa:

1. **¿Git está instalado?** → `git --version`
2. **¿El repositorio está conectado?** → `git remote -v`
3. **¿Netlify está conectado?** → Revisa el panel de Netlify
4. **¿El sitio está en línea?** → Abre tu URL en el navegador

---

*Última actualización: Septiembre 2026*
*Versión: 1.0*
