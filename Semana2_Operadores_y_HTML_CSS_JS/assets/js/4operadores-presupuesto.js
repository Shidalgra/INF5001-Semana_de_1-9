
function validarCompra() {
    // 1. Declaramos las variables
    let precioLaptop = 800;
    let ahorros = 1000;
    let tieneCupon = true;

    // 2. Buscamos el elemento en el HTML donde pondremos la respuesta
    let cajaResultado = document.getElementById("resultado");

    // 3. Lógica del Reto:
    // "Si el ahorro es mayor al precio O si tiene un cupón"
    if (ahorros > precioLaptop || tieneCupon === true) {
        cajaResultado.innerHTML = "¡Compra autorizada!";
        cajaResultado.style.color = "green";
        console.log("¡Compra autorizada!");
    } else {
        cajaResultado.innerHTML = "Fondos insuficientes";
        cajaResultado.style.color = "red";
    }
}


/*
Como vimos antes con la coerción de tipos,
en el if podemos poner solamente: 

en la linea #13

if (ahorros > precioLaptop || tieneCupon). 

JavaScript entiende automáticamente que si tieneCupon es true, la condición se cumple.
*/