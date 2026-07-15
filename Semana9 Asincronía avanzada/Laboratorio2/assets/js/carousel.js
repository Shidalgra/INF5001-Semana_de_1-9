/**
 * MÓDULO CARRUSEL - Responsabilidad: Controlar los movimientos de las diapositivas.
 */

class CarruselHero {
    constructor() {
        this.slides = document.querySelectorAll(".slide");
        this.btnNext = document.getElementById("nextBtn");
        this.btnPrev = document.getElementById("prevBtn");
        this.currentSlide = 0;
        this.timer = null;

        this.init();
    }

    init() {
        if (!this.slides.length) return;

        // Manejo de eventos click tradicionales nativos
        this.btnNext.addEventListener("click", () => this.siguienteSlide());
        this.btnPrev.addEventListener("click", () => this.anteriorSlide());

        // Disparar ciclo automático
        this.activarAutoplay();
    }

    cambiarSlide(nuevoIndice) {
        this.slides[this.currentSlide].classList.remove("active");
        this.slides[this.currentSlide].setAttribute("aria-hidden", "true");

        // Operador modular (%) para rotación infinita en listas circulares
        this.currentSlide = (nuevoIndice + this.slides.length) % this.slides.length;

        this.slides[this.currentSlide].classList.add("active");
        this.slides[this.currentSlide].setAttribute("aria-hidden", "false");

        this.reiniciarAutoplay();
    }

    siguienteSlide() { this.cambiarSlide(this.currentSlide + 1); }
    anteriorSlide() { this.cambiarSlide(this.currentSlide - 1); }

    activarAutoplay() { this.timer = setInterval(() => this.siguienteSlide(), 6000); }
    reiniciarAutoplay() { clearInterval(this.timer); this.activarAutoplay(); }
}