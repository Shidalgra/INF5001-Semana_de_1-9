$(document).ready(function() {
    $("#miFormulario").on("submit", function(e) {
        e.preventDefault();

        // Animación de salida
        $(this).fadeOut(400, function() {
            // Animación de entrada del mensaje
            $("#mensajeExito").css("display", "block").hide().fadeIn(600);
        });
    });

    // Lógica para volver a mostrar el formulario
    $("#btn-volver").on("click", function() {
        $("#mensajeExito").fadeOut(400, function() {
            $("#miFormulario").trigger("reset"); // Limpia los campos
            $("#miFormulario").fadeIn(600);
        });
    });
});