// Configuración de navegación interactiva
const navButtons = document.querySelectorAll('.nav-btn');
const versionSections = document.querySelectorAll('.version-section');
const timelineItems = document.querySelectorAll('.timeline-item');

// Mostrar/ocultar versiones de marketing y secciones especiales
function showVersion(version) {
    // Ocultar todas las secciones de versión
    versionSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Ocultar todas las secciones de contenido especiales
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostrar la seleccionada según el tipo
    if (version === 'all') {
        // Mostrar todas las versiones
        versionSections.forEach(section => section.style.display = 'block');
        // Scroll a timeline
        const timelineElement = document.querySelector('#timeline');
        if (timelineElement) {
            setTimeout(() => {
                timelineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    } else if (['preguntas', 'conclusiones', 'referencias', 'comparacion'].includes(version)) {
        // Mostrar secciones especiales
        const specialSection = document.getElementById(version);
        if (specialSection) {
            specialSection.style.display = 'block';
            setTimeout(() => {
                specialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    } else {
        // Mostrar versión específica (1-6)
        const section = document.getElementById(`version${version}`);
        if (section) {
            section.style.display = 'block';
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// Event listeners para botones de navegación
navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Actualizar estado activo
        navButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Mostrar versión correspondiente
        const version = this.getAttribute('data-version');
        showVersion(version);
    });
});

// Event listeners para timeline items
timelineItems.forEach(item => {
    item.addEventListener('click', function() {
        const version = this.getAttribute('data-version');
        
        // Actualizar botones de navegación
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-version') === version) {
                btn.classList.add('active');
            }
        });
        
        // Mostrar versión
        showVersion(version);
    });
});

// Inicializar: mostrar todas las versiones por defecto
window.addEventListener('load', () => {
    versionSections.forEach(section => section.style.display = 'block');
    navButtons.forEach(btn => btn.classList.remove('active'));
    navButtons[1].classList.add('active'); // Botón "Vista General" por defecto (index 1)
});

// Smooth scrolling para enlaces
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de parallax suave en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Animación de elementos cuando entran en vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out';
        }
    });
}, observerOptions);

// Observar todos los content blocks, ejemplo cards, pregunta cards, conclusion boxes e insight cards
document.querySelectorAll('.content-block, .example-card, .insight-card, .pregunta-card, .conclusion-box, .referencias-list li').forEach(el => {
    observer.observe(el);
});

// Función para copiar texto (útil para compartir)
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
};

// Agregar comportamiento interactivo a las tarjetas de ejemplo
const exampleCards = document.querySelectorAll('.example-card');
exampleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', function() {
        const header = this.querySelector('.example-header').textContent;
        console.log('Ejemplo seleccionado:', header);
        // Aquí se puede agregar más funcionalidad
    });
});

// Detectar tema oscuro del sistema (opcional para futuro)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Sistema en modo oscuro detectado');
}

// ===== Comparación Marketing vs Ventas - Toggle de vistas =====
const toggleButtons = document.querySelectorAll('.toggle-btn');
const comparacionContainer = document.getElementById('comparacion-container');
const marketingColumn = document.querySelector('.marketing-column');
const ventasColumn = document.querySelector('.ventas-column');

if (toggleButtons.length > 0 && comparacionContainer) {
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Actualizar estado de botones
            toggleButtons.forEach(b => b.classList.remove('toggle-active'));
            this.classList.add('toggle-active');
            
            // Cambiar vista
            if (view === 'dual') {
                marketingColumn.style.display = 'block';
                ventasColumn.style.display = 'block';
                comparacionContainer.classList.remove('view-single');
            } else if (view === 'marketing') {
                marketingColumn.style.display = 'block';
                ventasColumn.style.display = 'none';
                comparacionContainer.classList.add('view-single');
            } else if (view === 'ventas') {
                marketingColumn.style.display = 'none';
                ventasColumn.style.display = 'block';
                comparacionContainer.classList.add('view-single');
            }
        });
    });
}

// Log de seguimiento para estadísticas de clase
window.addEventListener('load', () => {
    console.log('%c📊 Historia y Evolución del Marketing - Presentación Cargada', 'color: #667eea; font-size: 16px; font-weight: bold');
    console.log('✨ Interactiva, dinámica y lista para tu clase');
});
