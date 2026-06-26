// ----- CLASE PADRE -----
class Dispositivo {
  #codigo;

  constructor(name, codigo, ram) {
    this.name = name;
    this.ram = ram;
    this.#codigo = codigo;
  }
}

// ----- CLASES HIJAS -----
class Server extends Dispositivo {
  constructor(name, codigo, ram) {
    super(name, codigo, ram);
    this.category = "Server";
  }

  obtenerFicha() {
    return `
      <div class="card server-card">
        <h3>${this.name}</h3>
        <p>Memoria: ${this.ram}GB</p>
        <p>Category: ${this.category}</p>
      </div>`;
  }
}

class Laptop extends Dispositivo { 
  constructor(name, codigo, ram) { super(name, codigo, ram);this.category = "Laptop";
  }
  
  obtenerFicha() {
    return `
      <div class="card laptop-card">
        <h3>${this.name}</h3>
        <p>Memoria: ${this.ram}GB</p>
        <p>Categoría: ${this.category}</p>
      </div>`;
  }
}

class Desktop extends Dispositivo {
  constructor(name, codigo, ram) {
    super(name, codigo, ram);
    this.category = "Desktop-PC";
  }

  obtenerFicha() {
    return `
      <div class="card desktop-pc-card">
        <h3>${this.name}</h3>
        <p>Memoria: ${this.ram}GB</p>
        <p>Categoría: ${this.category}</p>
      </div>`;
  }
}

// ----- LOGICA -----
const baseDatos = [];

function registrarNuevo() {
  let log = document.getElementById("status-log");
  log.classList.remove("critical-error");

  try {
    let type = document.getElementById("type").value;
    let name = document.getElementById("name").value;
    let ram = Number(document.getElementById("ram").value);
    let security = document.getElementById("security").value;

    if (type === "" || type === "Category")
      throw new Error("You forgot the category.");
    if (!name) throw new Error("You forgot to include the Name.");
    if (!ram) throw new Error("You forgot to include the RAM.");
    if (ram <= 0) throw new Error("La RAM debe ser positiva.");
    if (!security) throw new Error("The RAM must be in positive numbers.");
    if (security.length < 4)
      throw new Error("The security code needs to be stronger.");

    let nuevoEquipo;

    if (type === "Server") nuevoEquipo = new Server(name, security, ram);
    else if (type === "Laptop") nuevoEquipo = new Laptop(name, security, ram);
    else nuevoEquipo = new Desktop(name, security, ram);

    baseDatos.push(nuevoEquipo);
    renderizar();

    iniciarTemporizador(
      `✓ SUCCESS: ${name} has been successfully registered. Clearing form in`,
      "lightgreen",
    );
  } catch (error) {
    log.classList.add("critical-error");
    iniciarTemporizador(`✕ ERROR: ${error.message}. Clearing form in`, "red");
  }
}

function resetFormUI() {
  document.getElementById("name").value = "";
  document.getElementById("ram").value = "";
  document.getElementById("security").value = "";
  document.getElementById("type").value = "Category";
  document.getElementById("type").style.zIndex = 0;

  // limpiar mensaje
  let log = document.getElementById("status-log");
  log.innerText = "";
  log.classList.remove("critical-error");
}

function iniciarTemporizador(mensajeBase, color) {
  let log = document.getElementById("status-log");
  let segundos = 5;

  log.style.color = color;

  // Mostrar inmediatamente el primer mensaje
  log.innerText = `${mensajeBase} (${segundos}s)`;

  let intervalo = setInterval(() => {
    segundos--;

    log.innerText = `${mensajeBase} (${segundos}s)`;

    if (segundos <= 0) {
      clearInterval(intervalo);
      resetFormUI();
    }
  }, 1000);
}

document.getElementById("name").value = "";
document.getElementById("ram").value = "";
document.getElementById("security").value = "";
document.getElementById("type").style.zIndex = 0;

// limpiar mensaje
let log = document.getElementById("status-log");
log.innerText = "";
log.classList.remove("critical-error");

function renderizar() {
  let display = document.getElementById("inventario-display");
  display.innerHTML = "";

  baseDatos.forEach((equipo) => {
    display.innerHTML += equipo.obtenerFicha();
  });
}
