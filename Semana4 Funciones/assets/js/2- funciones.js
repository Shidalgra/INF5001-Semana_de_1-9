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



// Ejecutar bloque a bloque descomentandolo

//---------------------------------------------------------------------------------
// Para la función de Dinero
// console.log(calcularDescuento(50000)); // Imprime: 7500 ya que es el 15% de 50000
// console.log(calcularDescuento(20000)); // Imprime: 0 ya que este monto no es mayor a 40000

//---------------------------------------------------------------------------------
// Para la función de Sensores
// console.log(clasificarTemperatura(20)); // Imprime: { msg: "EMERGENCIA", clase: "alerta-roja." }

//---------------------------------------------------------------------------------
// Para imprimir Caso Dinero
// let miMonto = 45000;
// let miDescuento = calcularDescuento(miMonto);
// console.log("El descuento aplicado es: ₡" + miDescuento + ", el monto es: ₡" + miMonto + ".");


//---------------------------------------------------------------------------------
// Caso Sensores (Accediendo a propiedades específicas)
// Estos funcionan juntos Como devuelve un objeto, puedes imprimir una parte específica:
// let estadoSensor = clasificarTemperatura(50);
// console.log("Mensaje: " + estadoSensor.clase);   // Imprime: ALERTA
// console.log("Clase CSS: " + estadoSensor.clase); // Imprime: alerta-amarilla


