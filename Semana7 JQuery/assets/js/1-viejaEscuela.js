// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    
    // Seleccionar elementos manualmente
    const btn = document.getElementById('actionBtn');
    const card = document.getElementById('myCard');
    const msg = document.getElementById('message');

    // Escuchar el evento
    btn.addEventListener('click', function() {
        // Aplicar transformación
        card.style.transform = 'scale(1.05)';
        
        // Mostrar mensaje cambiando el estilo CSS directamente
        msg.style.display = 'block';
        
        // Regresar al estado normal
        setTimeout(function() {
            card.style.transform = 'scale(1)';
        }, 300);
    });
});