// --- MÉTODO 1: VANILLA JAVASCRIPT (El camino largo) ---
const btnVanilla = document.getElementById('btn-vanilla');
const lista = document.getElementById('lista-equipos');

btnVanilla.addEventListener('click', function() {
    // Para hacer un "FadeIn" manual en JS puro:
    lista.style.opacity = 0;
    lista.style.display = 'block';
    
    let opacity = 0;
    const interval = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.1;
            lista.style.opacity = opacity;
        } else {
            clearInterval(interval);
        }
    }, 50); // Tenemos que controlar el tiempo manualmente
    
    console.log("Ejecutado con Vanilla JS: +10 líneas de lógica.");
});


// --- MÉTODO 2: JQUERY (El camino "Write Less, Do More") ---
$(document).ready(function() {
    $("#btn-jquery").click(function() {
        // Una sola línea hace toda la magia del tiempo y la opacidad
        $("#lista-equipos").slideUp("slow"); 
        
        console.log("Ejecutado con JQuery: 1 línea de código.");
    });

    // Bonus: Interacción de ítems
    $(".item").click(function() {
        $(this).toggleClass("destacado"); 
    });
});