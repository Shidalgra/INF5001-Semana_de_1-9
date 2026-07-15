// JavaScript Nativo - Reemplazo moderno de $(document).ready
document.addEventListener("DOMContentLoaded", () => {

  // 1- Definición de la Promesa (El "Contrato") - SE MANTIENE IGUAL
  // Usamos setTimeout para simular la latencia de red de la universidad
  const validarCredenciales = (id) => {
    return new Promise((resolve, reject) => {
      const latencia = Math.floor(Math.random() * 2500) + 1000; // Entre 1 y 3.5 seg

      setTimeout(() => {
        if (id == 101 || id == 202) {
          resolve({
            mensaje: "Acceso Concedido",
            usuario: "Estudiante Ingeniería",
            ms: latencia,
          });
        } else {
          reject(`El ID ${id} no existe en el registro central.`);
        }
      }, latencia);
    });
  };

  // 2- Implementación con Async / Await NATIVO
  // Capturamos el botón usando querySelector (Reemplaza a $("#btn-validar"))
  const btnValidar = document.querySelector("#btn-validar");

  if (btnValidar) {
    btnValidar.addEventListener("click", async function () {
      // Captura de inputs y contenedores nativos
      const idIngresado = document.querySelector("#user-id").value; // .value reemplaza a .val()
      const display = document.querySelector("#resultado-lab"); // Reemplaza a $("#resultado-lab")

      // Limpieza y estado de carga empleando innerHTML en vez de .html()
      display.innerHTML = '<p class="loading">Consultando base de datos... por favor espere.</p>';

      this.disabled = true; // Evita múltiples clics de forma directa en el atributo del objeto HTML

      try {
        // Aquí ocurre la magia: el código espera sin bloquear el navegador
        const exito = await validarCredenciales(idIngresado);

        display.innerHTML = `
          <div class="alert success">
              <h3>${exito.mensaje}</h3>
              <p>Perfil: ${exito.usuario}</p>
              <small>Latencia de respuesta: ${exito.ms}ms</small>
          </div>
        `;
      } catch (error) {
        // Manejo de la promesa rechazada (reject)
        display.innerHTML = `
            <div class="alert error">
                <h3>Error de Validación</h3>
                <p>${error}</p>
            </div>
        `;
      } finally {
        // Esto siempre se ejecuta, pase lo que pase
        this.disabled = false;
      }
    });
  }
});












// //$.. librería de JQuery
// $(document).ready(function () {
//   // 1- Definición de  la Promesa (El "Contrato")
//   // Usamos setTimeout para simular la latencia de red de la universidad
//   const validarCredenciales = (id) => {
//     return new Promise((resolve, reject) => {
//       const latencia = Math.floor(Math.random() * 2500) + 1000; // Entre 1 y 3.5 seg

//       setTimeout(() => {
//         if (id == 101 || id == 202) {
//           resolve({
//             mensaje: "Acceso Concedido",
//             usuario: "Estudiante Ingeniería",
//             ms: latencia,
//           }); //----------resolve----------
//         } else {
//           reject(`El ID ${id} no existe en el registro central.`);
//         } //----------If id = 101 o 202----------
//       }, latencia); //----------return latencia de new Promise------------
//     }); //----------Set Timeout----------
//   }; //----------const validar----------

//   // 2- Implementación con Azync / Await (Lo que se pide en el cronograma)
//   $("#btn-validar").on("click", async function () {
//     const idIngresado = $("#user-id").val();
//     const display = $("#resultado-lab");

//     // Limpieza y estado de carga
//     display.html(
//       '<p class="loading">Consultando base de datos... por favor espere.</p>',
//     );
//     $(this).prop("disabled", true); // Evita múltiples clics
//     try {
//       // Aquí ocurre la mágia: el código espera sin bloquear el navegador
//       const exito = await validarCredenciales(idIngresado);
//       display.html(`
//         <div class="alert success">
//             <h3>${exito.mensaje}</h3>
//             <p>Perfil: ${exito.usuario}</p>
//             <small>Latencia de respuesta: ${exito.ms}ms</small>
//         </div>
//      `); //----------display html----------
//     } catch (error) {
//       //----------try----------
//       // Manejo de la promesa rechazada (reject)
//       display.html(`
//             <div class="alert error">
//                 <h3>Error de Validación</h3>
//                 <p>${error}</p>
//             </div>
//       `); //----------display.html error----------
//     } finally {
//       // Esto siempre se ejecuta, pase lo que pase
//       $(this).prop("disabled", false);
//     } //----------finally----------
//   }); //----------$("#btn-validar")----------
// }); //----------$(document)------------
