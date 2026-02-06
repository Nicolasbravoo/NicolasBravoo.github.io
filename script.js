/**
 * Portfolio JavaScript - Enhanced Version
 * Funcionalidades: Smooth scroll, tema oscuro/claro, copiar email, lazy loading
 */

// Constantes y configuración
const CONFIG = {
    EMAIL: "nicobravo1308@gmail.com",
    THEME_KEY: "theme",
    SCROLL_OFFSET: 80,
    ANIMATION_DELAY: 100
};

// Estado de la aplicación
const state = {
    currentTheme: 'light',
    isScrolling: false
};

/**
 * Inicialización del DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio cargado exitosamente');
    
    // Inicializar funcionalidades
    initTheme();
    initSmoothScroll();
    initLazyLoading();
    initAnimationsOnScroll();
    initExternalLinks();
    
    console.log('✅ Todas las funcionalidades inicializadas');
});

/**
 * Sistema de tema oscuro/claro
 */
function initTheme() {
    const toggleBtn = document.getElementById("themeToggle");
    
    if (!toggleBtn) {
        console.warn('⚠️ Botón de tema no encontrado');
        return;
    }

    // Cargar tema guardado o detectar preferencia del sistema
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);

    // Event listener para el botón de tema
    toggleBtn.addEventListener("click", toggleTheme);

    // Detectar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(CONFIG.THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Alternar entre tema oscuro y claro
 */
function toggleTheme() {
    const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

/**
 * Establecer tema
 * @param {string} theme - 'dark' o 'light'
 */
function setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') {
        console.error('❌ Tema inválido:', theme);
        return;
    }

    const toggleBtn = document.getElementById("themeToggle");
    
    // Aplicar clase al body
    document.body.className = theme;
    
    // Actualizar estado
    state.currentTheme = theme;
    
    // Guardar en localStorage
    try {
        localStorage.setItem(CONFIG.THEME_KEY, theme);
    } catch (e) {
        console.warn('⚠️ No se pudo guardar el tema en localStorage:', e);
    }
    
    // Actualizar icono del botón
    if (toggleBtn) {
        toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
        toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }
}

/**
 * Smooth scroll para enlaces internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

/**
 * Manejar scroll suave
 * @param {Event} e - Evento de click
 */
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    // Ignorar enlaces vacíos o solo con #
    if (!href || href === '#') {
        return;
    }

    const target = document.querySelector(href);
    
    if (target) {
        e.preventDefault();
        
        // Prevenir múltiples scrolls simultáneos
        if (state.isScrolling) return;
        
        state.isScrolling = true;
        
        // Calcular posición con offset
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.SCROLL_OFFSET;
        
        // Scroll suave
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar
        if (history.pushState) {
            history.pushState(null, null, href);
        }
        
        // Reset del flag después de la animación
        setTimeout(() => {
            state.isScrolling = false;
        }, 1000);
    }
}

/**
 * Copiar email al portapapeles con feedback mejorado
 */
function copiarEmail() {
    const email = CONFIG.EMAIL;

    // Verificar soporte de clipboard API
    if (!navigator.clipboard) {
        fallbackCopyEmail(email);
        return;
    }

    navigator.clipboard.writeText(email)
        .then(() => {
            showNotification('✅ Correo copiado: ' + email, 'success');
            console.log('📋 Email copiado exitosamente');
        })
        .catch(err => {
            console.error("❌ Error al copiar email:", err);
            fallbackCopyEmail(email);
        });
}

/**
 * Método alternativo para copiar (fallback)
 * @param {string} text - Texto a copiar
 */
function fallbackCopyEmail(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('✅ Correo copiado: ' + text, 'success');
        } else {
            showNotification('❌ No se pudo copiar el correo', 'error');
        }
    } catch (err) {
        console.error('❌ Fallback copy failed:', err);
        showNotification('❌ Error al copiar. Email: ' + text, 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Mostrar notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success' o 'error')
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transition: transform 0.3s ease;
        max-width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Lazy loading para imágenes
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antiguos
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Animaciones al hacer scroll
 */
function initAnimationsOnScroll() {
    const elements = document.querySelectorAll('.project-card, .about-card');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback: mostrar todos los elementos
        elements.forEach(el => el.style.opacity = '1');
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Marcar enlaces externos para abrirse en nueva pestaña
 */
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Solo si no es un enlace interno
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Añadir indicador visual opcional
            if (!link.querySelector('svg')) {
                link.setAttribute('title', 'Abrir en nueva pestaña');
            }
        }
    });
}

/**
 * Detectar errores de carga de imágenes
 */
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('⚠️ Error al cargar imagen:', e.target.src);
        // Opcional: poner imagen placeholder
        // e.target.src = 'path/to/placeholder.jpg';
    }
}, true);

/**
 * Log de performance (solo en desarrollo)
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Tiempo de carga: ${pageLoadTime}ms`);
    });
}

// Exponer funciones globales necesarias
window.copiarEmail = copiarEmail;
window.setTheme = setTheme;