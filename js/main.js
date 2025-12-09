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
// Scroll Arrow (Future feature - currently inactive)
// ==========================================

function initScrollArrow() {
    // This function is prepared for future scroll arrow elements
    // Add scroll arrows to HTML with IDs like 'scrollArrow' to enable
    const scrollArrows = document.querySelectorAll('[id^="scrollArrow"]');

    if (scrollArrows.length === 0) {
        // No scroll arrows found - feature not yet implemented in HTML
        return;
    }

    // Example: Setup scroll behavior for arrows when they're added
    scrollArrows.forEach(arrow => {
        const targetSection = arrow.dataset.target;
        if (targetSection) {
            const section = document.querySelector(targetSection);
            if (section) {
                arrow.addEventListener('click', () => {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            }
        }
    });
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
    const iframe = document.getElementById('rsvpIframe');
    const loadingIndicator = document.getElementById('iframeLoading');

    if (toggleButton && formContainer && iframe) {
        // Handle iframe load event
        iframe.addEventListener('load', () => {
            iframe.classList.add('loaded');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        });

        // Handle iframe error
        iframe.addEventListener('error', () => {
            if (loadingIndicator) {
                loadingIndicator.innerHTML = '<p style="color: #d9534f;">No se pudo cargar el formulario. Por favor, intenta nuevamente más tarde.</p>';
            }
            console.error('Error loading RSVP form iframe');
        });

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

                // Show loading indicator when opening
                if (loadingIndicator && !iframe.classList.contains('loaded')) {
                    loadingIndicator.style.display = 'block';
                }
            }
        });

        // Set a timeout for iframe loading
        setTimeout(() => {
            if (!iframe.classList.contains('loaded') && formContainer.classList.contains('active')) {
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = '<p>El formulario está tardando en cargar. Por favor, verifica tu conexión a internet.</p>';
                }
            }
        }, 10000); // 10 seconds timeout
    }
}

// ==========================================
// External Links Error Handling
// ==========================================

function initExternalLinksMonitoring() {
    // Monitor external links and provide fallback messages if needed
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if link might be broken (optional enhancement)
            const url = link.href;

            // Add visual feedback
            link.style.opacity = '0.7';
            setTimeout(() => {
                link.style.opacity = '1';
            }, 300);
        });

        // Add rel="noopener noreferrer" for security if not present
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        } else if (!link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', link.getAttribute('rel') + ' noopener noreferrer');
        }
    });
}

// ==========================================
// Inicialización
// ==========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Forzar scroll al inicio
    window.scrollTo(0, 0);

    // Inicializar contador regresivo (April 11, 2026 - 15:00 Argentina Time)
    const countdown = new CountdownTimer('2026-04-11T15:00:00-03:00');

    // Inicializar flecha de scroll
    initScrollArrow();

    // Inicializar botones de info
    initInfoButtons();

    // Inicializar copia de alias
    initAliasCopy();

    // Inicializar toggle de formulario RSVP
    initRSVPToggle();

    // Inicializar monitoreo de enlaces externos
    initExternalLinksMonitoring();

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
