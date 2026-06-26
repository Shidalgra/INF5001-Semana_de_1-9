// Función especializada en dinero (Con manejo de argumentos inválidos)
function calcularDescuento(monto) {
    if (typeof monto !== "number" || isNaN(monto)) {
        throw new Error("El monto provisto debe ser un número válido.");
    }
    if (monto < 0) {
        throw new Error("El monto no puede ser un valor negativo.");
    }

    if (monto > 40000) return monto * 0.15;
    return 0;
}

// Función especializada en sensores (Retorna Objeto y valida rangos lógicos)
function clasificarTemperatura(temp) {
    if (typeof temp !== "number" || isNaN(temp)) {
        throw new Error("La lectura de la temperatura debe ser estrictamente numérica.");
    }

    if (temp > 45) return { msg: "EMERGENCIA", clase: "alerta-roja" };
    if (temp > 30) return { msg: "ALERTA", clase: "alerta-amarilla" };
    return { msg: "ESTABLE", clase: "alerta-verde" };
}

// --- EL SISTEMA DE EJECUCIÓN (SOLO CONSOLA) ---

function ejecutarSistema(opcion) {
    console.log(`--- INICIANDO PROCESAMIENTO DE OPCIÓN: ${opcion} ---`);

    try {
        switch (opcion) {
            case 1: { // <-- Abrimos llave del bloque aislado
                let montoUsuario = 50000;
                let desc = calcularDescuento(montoUsuario);

                console.log("--- CASO 1: CÁLCULO DE DINERO ---");
                console.log("1. Enviando argumento: " + montoUsuario);
                console.log("2. Descuento retornado: " + desc);
                console.log("3. Total a pagar: " + (montoUsuario - desc));
                break;
            } // <-- Cerramos llave

            case 2: { // <-- Bloque aislado para el Caso 2
                let lecturaActual = 38; 
                let estado = clasificarTemperatura(lecturaActual);

                console.log("--- CASO 2: SENSOR DE TEMPERATURA ---");
                console.log("1. Enviando temperatura: " + lecturaActual + "°C");
                console.dir(estado);
                console.log("3. Mensaje final: " + estado.msg);
                break;
            }

            case 3: { // <-- Bloque aislado para el Caso 3. ¡Ya no chocará!
                let lecturaActual = "Treinta y Ocho"; 
                let estado = clasificarTemperatura(lecturaActual);

                console.log("--- CASO 3: ERROR INTENCIONAL ---");
                console.log("1. Enviando temperatura: " + lecturaActual + "°C");
                (estado);
                console.log("3. Mensaje final: " + estado.msg);
                break;
            }

            default:
                console.warn("La opción " + opcion + " no existe en el sistema.");
        }
    } catch (error) {
        console.error("[ERROR EN SISTEMA]: " + error.message);
    } finally {
        console.log("[FINALLY]: Limpieza de buffers e intento de sincronización finalizado.\n");
    }
}


// --- PRUEBAS DE EJECUCIÓN ---

// Estas líneas ahora sí funcionarán porque no dependen del navegador/HTML
ejecutarSistema(3);
console.log("\n"); // salto de línea en consola
//ejecutarSistema(2);