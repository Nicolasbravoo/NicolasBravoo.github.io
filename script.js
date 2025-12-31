// Este archivo está listo para agregar interactividad en el futuro
// Por ejemplo: animaciones, carga dinámica de proyectos, modo oscuro, etc.

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio cargado exitosamente');
    
    // Puedes agregar funcionalidad adicional aquí
    // Por ejemplo, smooth scroll para los enlaces
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

function copiarEmail() {
    const email = "nicobravo1308@gmail.com";

    navigator.clipboard.writeText(email)
        .then(() => {
            alert("📋 Correo copiado al portapapeles");
        })
        .catch(err => {
            console.error("Error al copiar:", err);
        });
}