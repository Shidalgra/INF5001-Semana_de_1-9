let edad = 18;
let tieneGafasSeguridad = false;
let esJefeDeDepartamento = true;

try {
  if (esJefeDeDepartamento) {
    console.log("¡Acceso concedido al sistema por ser jefe de departamento!");
  } else if (edad >= 18 && tieneGafasSeguridad) {
    console.log(
      "¡Acceso concedido al sistema por cumplir con los requisitos de edad y gafas de seguridad!",
    );
  } else if (edad < 18) {
    console.log(
      "Acceso denegado al sistema. No cumples con la edad para ingresar al servidor.",
    );
  } else if (!tieneGafasSeguridad) {
    console.log(
      "Acceso denegado al sistema. No cumples con el requisito de tener gafas de seguridad para ingresar al servidor.",
    );
  } else {
    console.log(
      "Acceso denegado al sistema. No cumples con los requisitos para ingresar al servidor.",
    );
  }
} catch (error) {
  console.error("Ocurrió un error al verificar el acceso al sistema:", error);
}


