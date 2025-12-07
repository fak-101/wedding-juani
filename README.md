# Wedding Website - J & T

Página web de boda con diseño elegante inspirado en la estética bosque/eucalipto y la canción "Timeless" de Taylor Swift.

## 🌿 Descripción

Landing page minimalista y elegante para celebrar la boda de J & T. Cuenta con:

- Diseño temático bosque con paleta de verdes eucalipto
- Logo personalizado con iniciales en cursiva elegante
- Decoraciones de eucalipto en las esquinas
- Reproductor de música integrado ("Timeless" - Taylor Swift)
- Diseño 100% responsive (móvil, tablet, desktop)

## 📁 Estructura del Proyecto

```
wedding-juani/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos CSS
├── js/
│   └── main.js            # JavaScript para interactividad
├── assets/
│   ├── logo.svg           # Logo J & T
│   └── timeless.mp3       # Música (agregar manualmente)
├── elements/              # Recursos de diseño
├── .gitignore
├── vercel.json
└── README.md
```

## 🚀 Instrucciones de Setup

### 1. Agregar el archivo de música

**IMPORTANTE:** Debes agregar manualmente el archivo de audio:

1. Obtén legalmente el archivo de "Timeless" de Taylor Swift en formato MP3
2. Colócalo en la carpeta `assets/` con el nombre `timeless.mp3`

### 2. Vista previa local

Puedes abrir el archivo `index.html` directamente en tu navegador, o usar un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes npx)
npx serve

# Con PHP
php -S localhost:8000
```

Luego abre http://localhost:8000 en tu navegador.

## 🌐 Deployment en Vercel

### Opción 1: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New..." → "Project"
3. Importa el repositorio de GitHub `fak-101/wedding-juani`
4. Vercel detectará automáticamente que es un sitio estático
5. Haz clic en "Deploy"

### Opción 2: Desde la línea de comandos

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Configuración de Vercel

El archivo `vercel.json` ya está configurado con:
- URLs limpias (sin .html)
- Sin trailing slashes

## 🎨 Personalización

### Colores

Los colores están definidos como variables CSS en `css/styles.css`:

```css
--color-eucalyptus-primary: #88A895;
--color-eucalyptus-secondary: #7A9B8E;
--color-eucalyptus-dark: #5A7A6D;
--color-eucalyptus-light: #9CB4A3;
--color-background: #F5F2ED;
```

### Tipografía

- **Cursiva elegante:** Great Vibes (Google Fonts)
- **Sans-serif:** Montserrat (Google Fonts)

Puedes cambiarlas editando la importación en `index.html` y las variables en `css/styles.css`.

## 📱 Responsive Breakpoints

- **Desktop grande:** 1440px+
- **Desktop:** 1024px - 1439px
- **Tablet:** 768px - 1023px
- **Mobile:** 480px - 767px
- **Mobile pequeño:** 320px - 479px

## 🔊 Funcionalidad de Audio

El reproductor de audio:
- Play/Pause con botón circular
- Cambio de icono según estado
- Manejo de errores si el archivo no existe
- Compatible con HTML5 Audio API

## 🚧 Desarrollo Futuro

El código está preparado para agregar:

- **Más secciones:** Scroll vertical con información adicional
- **Google Maps:** Ubicación del evento
- **Descarga de app:** Link a aplicación móvil
- **Formulario RSVP:** Confirmación de asistencia
- **Galería:** Fotos de la pareja
- **Detalles:** Hospedaje, dress code, timeline

Las funciones auxiliares ya están en `js/main.js`:
```javascript
window.weddingFunctions.navigateToMaps('Venue Address');
window.weddingFunctions.downloadApp('https://app-url.com');
window.weddingFunctions.scrollToSection('section-id');
```

## 🎯 Tecnologías

- HTML5 semántico
- CSS3 con Custom Properties
- JavaScript Vanilla (ES6+)
- Google Fonts
- SVG para decoraciones

## ✨ Características

- ✅ 100% responsive
- ✅ Accesible (ARIA labels, focus visible)
- ✅ Performance optimizado
- ✅ SEO friendly
- ✅ Open Graph para redes sociales
- ✅ Sin dependencias externas
- ✅ Soporte para prefers-reduced-motion

## 📝 Notas

- El archivo de audio debe ser agregado manualmente por temas de derechos de autor
- Las decoraciones de eucalipto están hechas con SVG inline para mejor performance
- El logo se carga desde `assets/logo.svg` (copiado de `elements/`)

## 👨‍💻 Autor

Desarrollado con ❤️ para J & T

---

**¡Felicidades por tu boda! 💍✨**
