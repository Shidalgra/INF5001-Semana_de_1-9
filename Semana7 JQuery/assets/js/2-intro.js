$(document).ready(function() {
    $('#actionBtn').on('click', function() {
        // Efecto visual: la tarjeta se agranda un poco
        $('.card').css('transform', 'scale(1.05)');
        
        // Mostrar mensaje con animación
        $('#message').fadeIn(500);
        
        // Regresar al tamaño normal después de un tiempo
        setTimeout(function() {
            $('.card').css('transform', 'scale(1)');
        }, 300);
    });
});