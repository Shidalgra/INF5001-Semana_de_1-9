/**
 * ORQUESTADOR CENTRAL (APP) - Responsabilidad: Controlar flujos de datos asíncronos y eventos globales del DOM.
 */

document.addEventListener("DOMContentLoaded", async () => {

    // 1. Instanciar módulos síncronos de forma independiente
    new CarruselHero();

    // 2. Elementos del DOM a manipular
    const adOverlay = document.getElementById("welcome-ad");
    const adProgressBar = document.getElementById("adProgressBar");
    const adStatus = document.getElementById("adStatus");
    const closeAdBtn = document.getElementById("closeAdBtn");

    const productsGrid = document.getElementById("productsGrid");
    const productsSubtitle = document.getElementById("products-subtitle");

    // 3. FLUJO ASÍNCRONO 1: Controlar el AD usando Async/Await
    try {
        // Invocamos la promesa y capturamos su avance real por medio del callback
        const respuestaAd = await consultarServidorAd((progreso) => {
            adProgressBar.style.width = `${progreso}%`;
            if (progreso === 40) adStatus.textContent = "Sincronizando elementos visuales de marca...";
            if (progreso === 80) adStatus.textContent = "Abriendo canal seguro de datos...";
        });

        console.log(respuestaAd);
        adStatus.textContent = "¡Verificado! Desplegando plataforma...";

        // Remoción suave coordinando transiciones de CSS
        setTimeout(() => {
            adOverlay.style.opacity = "0";
            setTimeout(() => adOverlay.style.display = "none", 600);
        }, 400);

    } catch (error) {
        console.error(error);
        adStatus.textContent = "Fallo de conexión. Modo de navegación offline activado.";
        adStatus.style.color = "var(--cc-red)";
    }

    closeAdBtn.addEventListener("click", () => { adOverlay.style.display = "none"; });

    // 4. FLUJO ASÍNCRONO 2: Consumo de Productos y borrado del "Skeleton Loader"
    try {
        // La ejecución se detiene aquí hasta recibir el arreglo de datos del catálogo (4.5 seg)
        const productosDescargados = await obtenerCatalogoProductos();

        // Limpiamos los bloques grises de carga simulados
        productsGrid.innerHTML = "";
        productsSubtitle.textContent = "Catálogo corporativo desplegado de forma reactiva con Promesas Nativas.";

        // Recorrido funcional moderno del array para construir los nodos
        productosDescargados.forEach(prod => {
            const card = document.createElement("article");
            card.classList.add("product-card");



            card.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <button class="btn btn-primary" style="width: 100%;" onclick="alert('Ordenando: ${prod.nombre}')">Ver Detalles</button>
            `;
            // card.innerHTML = `
            //     <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.onerror=null; this.src='https://placehold.co/300x220?text=Imagen+No+Disponible';">
            //     <h3>${prod.nombre}</h3>
            //     <p>${prod.descripcion}</p>
            //     <button class="btn btn-primary" style="width: 100%;" onclick="alert('Ordenando: ${prod.nombre}')">Ver Detalles</button>
            // `;

            productsGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Error crítico de inventario:", error);
        productsGrid.innerHTML = `<p style="grid-column: 1/-1; color: var(--cc-red); font-weight:bold;">Error al renderizar los productos del servidor.</p>`;
    }

    // 5. MOVIMIENTO Y ANIMACIÓN MODERNA: IntersectionObserver (Efecto al hacer Scroll)
    // Reemplaza los engorrosos eventos de scroll viejos que ralentizaban la máquina
    const elementosParaAnimar = document.querySelectorAll(".fade-in-element");

    const opcionesConfig = {
        root: null, // Toma la pantalla del dispositivo como visor de referencia
        threshold: 0.15 // Dispara la acción cuando el 15% del contenedor sea visible
    };

    const observadorScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el usuario llega con el scroll al elemento
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // CSS se encarga del efecto visual
                observer.unobserve(entry.target); // Se destruye el observador del nodo para ahorrar recursos
            }
        });
    }, opcionesConfig);

    elementosParaAnimar.forEach(elem => observadorScroll.observe(elem));
});