// --- FUNCIONES ESPECIALIZADAS (Las Herramientas) ---

// 1. Función que solo calcula el interés
function calcularInteres(monto) {
    if (monto <= 0) {
        throw new Error("El monto solicitado debe ser mayor a cero.");
    }
    return monto * 0.05; // 5% de interés fijo
}

// 2. Función que decide si se aprueba (Lógica pura)
// Esto es si el estudiante tiene una nota promedio de 80 o más se le da el crédito, sino se le rechaza 
function validarAprobacion(promedio) {
    if (promedio < 0 || promedio > 100) {
        throw new Error("El promedio debe ser un puntaje válido entre 0 y 100.");
    }
    return promedio >= 80; // Devuelve true o false
}

// 3. Función que limpia la pantalla (Utilidad)
function limpiarPantalla(elemento) {
    elemento.innerHTML = "";
    elemento.classList.remove("aprobado", "denegado");
    // Remueve estilo de error si existiera uno previo
    elemento.style.border = "none";
    elemento.style.color = "initial";
}

// --- FUNCIÓN PRINCIPAL (La que conecta con el HTML) ---

function procesarSolicitud() {
    let pantalla = document.getElementById("resultado-credito");

    // Limpiamos la pantalla al iniciar el evento del botón
    limpiarPantalla(pantalla);

    try {
        // Captura y conversión explícita de datos desde el HTML
        let inputPromedio = document.getElementById("promedio").value;
        let inputMonto = document.getElementById("monto").value;

        // Validación inicial preventiva antes de delegar a las funciones lógicas
        if (inputPromedio === "" || inputMonto === "") {
            throw new Error("Ambos campos son obligatorios. Por favor rellene los datos.");
        }

        let promedioNum = Number(inputPromedio);
        let montoNum = Number(inputMonto);

        // Uso e invocación modular protegido (Cualquier throw aquí saltará directo al catch)
        let esAprobado = validarAprobacion(promedioNum);
        let interes = calcularInteres(montoNum);
        let total = montoNum + interes;

        // Renderizado de respuestas exitosas en el DOM
        // Reemplaza los bloques condicionales dentro del try de tu función procesarSolicitud por estos:
        if (esAprobado) {
            pantalla.classList.add("aprobado");
            pantalla.innerHTML = `
        <h3> CRÉDITO APROBADO</h3>
        <p><strong>Monto Base:</strong> ₡${montoNum.toLocaleString('es-CR')}</p>
        <p><strong>Interés Administrativo (5%):</strong> ₡${interes.toLocaleString('es-CR')}</p>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid rgba(0,0,0,0.1);">
        <p style="font-size: 1.1rem;"><strong>Total Neto a Pagar:</strong> ₡${total.toLocaleString('es-CR')}</p>
    `;
        } else {
            pantalla.classList.add("denegado");
            pantalla.innerHTML = `
        <h3> SOLICITUD RECHAZADA</h3>
        <p>Su promedio actual (<strong>${promedioNum}</strong>) es insuficiente para aplicar al crédito institucional. Requiere una nota mínima de 80.</p>
    `;
        }

    } catch (error) {
        // Bloque Catch: En vez de romper el programa, muestra el error de forma amigable al usuario en el HTML
        pantalla.style.backgroundColor = "#ffdddd";
        pantalla.style.color = "#990000";
        pantalla.style.border = "2px dashed #cc0000";
        pantalla.innerHTML = `<h3>Error de Entrada</h3><p>${error.message}</p>`;

    } finally {
        // Registro administrativo interno obligatorio para auditoría del sistema
        console.log("Operación de análisis finalizada a las: " + new Date().toLocaleTimeString());
    }
}