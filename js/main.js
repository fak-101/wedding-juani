/**
 * Wedding Website - J & T
 * Main JavaScript file for audio player and interactivity
 */

// ==========================================
// Forzar scroll al inicio al recargar
// ==========================================
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ==========================================
// Audio Player
// ==========================================

class AudioPlayer {
    constructor() {
        this.audio = document.getElementById('weddingAudio');
        this.playButton = document.getElementById('playButton');
        this.isPlaying = false;

        this.init();
    }

    init() {
        if (!this.audio || !this.playButton) {
            console.error('Audio elements not found');
            return;
        }

        // Event listener para el botón
        this.playButton.addEventListener('click', () => this.togglePlay());

        // Event listeners para el estado del audio
        this.audio.addEventListener('play', () => this.handlePlay());
        this.audio.addEventListener('pause', () => this.handlePause());
        this.audio.addEventListener('ended', () => this.handleEnded());

        // Event listener para errores de carga
        this.audio.addEventListener('error', (e) => this.handleError(e));
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Reproducción iniciada correctamente
                    this.isPlaying = true;
                })
                .catch((error) => {
                    // Manejar error de reproducción automática
                    console.warn('Autoplay prevented:', error);
                    this.isPlaying = false;
                });
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    handlePlay() {
        this.isPlaying = true;
        this.playButton.classList.add('playing');
    }

    handlePause() {
        this.isPlaying = false;
        this.playButton.classList.remove('playing');
    }

    handleEnded() {
        this.isPlaying = false;
        this.playButton.classList.remove('playing');
        // Opcional: reiniciar el audio al principio
        this.audio.currentTime = 0;
    }

    handleError(event) {
        console.error('Error loading audio:', event);

        // Mostrar mensaje al usuario si el archivo no existe
        const errorType = this.audio.error.code;
        let errorMessage = 'Error al cargar la música.';

        switch(errorType) {
            case 1:
                errorMessage = 'Carga de audio abortada.';
                break;
            case 2:
                errorMessage = 'Error de red al cargar el audio.';
                break;
            case 3:
                errorMessage = 'Error al decodificar el audio.';
                break;
            case 4:
                errorMessage = 'Archivo de audio no encontrado. Por favor, agrega "timeless.mp3" a la carpeta assets/.';
                break;
        }

        console.warn(errorMessage);

        // Opcional: deshabilitar el botón si hay error
        // this.playButton.disabled = true;
        // this.playButton.style.opacity = '0.5';
    }
}

// ==========================================
// Countdown Timer
// ==========================================

class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        this.init();
    }

    init() {
        if (!this.elements.days || !this.elements.hours ||
            !this.elements.minutes || !this.elements.seconds) {
            console.error('Countdown elements not found');
            return;
        }

        // Actualizar inmediatamente
        this.updateCountdown();

        // Actualizar cada segundo
        this.interval = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            // Si la fecha ya pasó
            clearInterval(this.interval);
            this.elements.days.textContent = '0';
            this.elements.hours.textContent = '0';
            this.elements.minutes.textContent = '0';
            this.elements.seconds.textContent = '0';
            return;
        }

        // Calcular tiempo restante
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar elementos
        this.elements.days.textContent = days;
        this.elements.hours.textContent = hours;
        this.elements.minutes.textContent = minutes;
        this.elements.seconds.textContent = seconds;
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// ==========================================
// Inicialización
// ==========================================

// ==========================================
// Scroll Arrow
// ==========================================

function initScrollArrow() {
    const scrollArrow = document.getElementById('scrollArrow');
    const scrollArrow2 = document.getElementById('scrollArrow2');
    const scrollArrow3 = document.getElementById('scrollArrow3');
    const scrollArrow4 = document.getElementById('scrollArrow4');
    const scrollArrow5 = document.getElementById('scrollArrow5');
    const scrollArrow6 = document.getElementById('scrollArrow6');
    const scrollArrow7 = document.getElementById('scrollArrow7');
    const scrollArrow8 = document.getElementById('scrollArrow8');
    const scrollArrow9 = document.getElementById('scrollArrow9');
    const countdownSection = document.querySelector('.countdown-section');
    const dateSection = document.querySelector('.date-section');
    const locationSection = document.querySelector('.location-section');
    const dresscodeSection = document.querySelector('.dresscode-section');
    const rsvpSection = document.querySelector('.rsvp-section');
    const infoSection = document.querySelector('.info-section');
    const emergencyFundSection = document.querySelector('.emergency-fund-section');
    const playlistSection = document.querySelector('.playlist-section');
    const wedshootsSection = document.querySelector('.wedshoots-section');

    if (scrollArrow && countdownSection) {
        scrollArrow.addEventListener('click', () => {
            countdownSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow2 && dateSection) {
        scrollArrow2.addEventListener('click', () => {
            dateSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow3 && locationSection) {
        scrollArrow3.addEventListener('click', () => {
            locationSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow4 && dresscodeSection) {
        scrollArrow4.addEventListener('click', () => {
            dresscodeSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow5 && infoSection) {
        scrollArrow5.addEventListener('click', () => {
            infoSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow6 && emergencyFundSection) {
        scrollArrow6.addEventListener('click', () => {
            emergencyFundSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow7 && playlistSection) {
        scrollArrow7.addEventListener('click', () => {
            playlistSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow8 && wedshootsSection) {
        scrollArrow8.addEventListener('click', () => {
            wedshootsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollArrow9) {
        scrollArrow9.addEventListener('click', () => {
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// Info Section Buttons
// ==========================================

function initInfoButtons() {
    const giftsButton = document.getElementById('giftsButton');
    const playlistButton = document.getElementById('playlistButton');
    const photosButton = document.getElementById('photosButton');

    const emergencyFundSection = document.querySelector('.emergency-fund-section');
    const playlistSection = document.querySelector('.playlist-section');
    const wedshootsSection = document.querySelector('.wedshoots-section');

    if (giftsButton && emergencyFundSection) {
        giftsButton.addEventListener('click', () => {
            emergencyFundSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (playlistButton && playlistSection) {
        playlistButton.addEventListener('click', () => {
            playlistSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (photosButton && wedshootsSection) {
        photosButton.addEventListener('click', () => {
            wedshootsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// ==========================================
// Copy Alias to Clipboard
// ==========================================

function initAliasCopy() {
    const aliasBoxes = document.querySelectorAll('.alias-box');

    aliasBoxes.forEach(box => {
        box.style.cursor = 'pointer';

        box.addEventListener('click', async () => {
            const aliasText = box.querySelector('.alias-text').textContent;
            // Extract just the alias part (after the colon and space)
            const alias = aliasText.split(': ')[1];

            try {
                await navigator.clipboard.writeText(alias);

                // Visual feedback
                const originalBg = box.style.backgroundColor;
                box.style.backgroundColor = 'rgba(139, 148, 119, 0.3)';

                // Show copied message
                const originalText = box.querySelector('.alias-text').textContent;
                box.querySelector('.alias-text').textContent = '¡Copiado! ✓';

                setTimeout(() => {
                    box.style.backgroundColor = '';
                    box.querySelector('.alias-text').textContent = originalText;
                }, 1500);

            } catch (err) {
                console.error('Error copying to clipboard:', err);
            }
        });
    });
}

// ==========================================
// Toggle RSVP Form
// ==========================================

function initRSVPToggle() {
    const toggleButton = document.getElementById('toggleFormButton');
    const formContainer = document.getElementById('formContainer');

    if (toggleButton && formContainer) {
        toggleButton.addEventListener('click', () => {
            const isExpanded = formContainer.classList.contains('active');

            if (isExpanded) {
                formContainer.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.textContent = 'Confirmar asistencia';
            } else {
                formContainer.classList.add('active');
                toggleButton.setAttribute('aria-expanded', 'true');
                toggleButton.textContent = 'Ocultar formulario';
            }
        });
    }
}

// ==========================================
// Inicialización
// ==========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Forzar scroll al inicio
    window.scrollTo(0, 0);

    // Inicializar reproductor de audio
    const player = new AudioPlayer();

    // Inicializar contador regresivo (April 11, 2026)
    const countdown = new CountdownTimer('2026-04-11T00:00:00');

    // Inicializar flecha de scroll
    initScrollArrow();

    // Inicializar botones de info
    initInfoButtons();

    // Inicializar copia de alias
    initAliasCopy();

    // Inicializar toggle de formulario RSVP
    initRSVPToggle();

    // Log para verificar que el script se cargó
    console.log('Wedding website loaded successfully ♥');
});

// ==========================================
// Funcionalidades Futuras (Preparadas)
// ==========================================

/**
 * Función para navegar a Google Maps
 * Uso futuro: Agregar ubicación de la boda
 */
function navigateToMaps(location) {
    // Ejemplo: navigateToMaps('Venue Name, City');
    const encodedLocation = encodeURIComponent(location);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(mapsUrl, '_blank');
}

/**
 * Función para descargar aplicación
 * Uso futuro: Link a app store o descarga directa
 */
function downloadApp(appUrl) {
    // Ejemplo: downloadApp('https://example.com/wedding-app');
    window.open(appUrl, '_blank');
}

/**
 * Función para smooth scroll a secciones
 * Uso futuro: Navegación entre secciones de la página
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Exportar funciones para uso futuro (si se necesita)
window.weddingFunctions = {
    navigateToMaps,
    downloadApp,
    scrollToSection
};
