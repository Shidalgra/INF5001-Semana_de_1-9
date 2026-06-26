// ----- CLASE PADRE -----
class Dispositivo {
  #codigo;

  constructor(name, codigo, ram) {
    this.name = name;
    this.ram = ram;
    this.#codigo = codigo;
  }

  obtenerCodigo() {
    return this.#codigo;
  }

  obtenerClaseRam() {
    // Los accesorios no suelen tener RAM reportada (o es 0), manejamos esa excepción visual
    if (this.ram === 0) return "no-ram";
    return this.ram < 8 ? "alerta" : "optimo";
  }
}

// ----- CLASES HIJAS (ANTERIORES) -----
class Server extends Dispositivo {
  constructor(name, codigo, ram) { super(name, codigo, ram); this.category = "Server"; }
  obtenerFicha(index) {
    return `<div class="card server-card ${this.obtenerClaseRam()}">
      <div class="card-badge">Server</div>
      <h3>${this.name}</h3>
      <div class="card-info"><p><strong>Memory:</strong> ${this.ram} GB</p></div>
      <div class="card-actions">
        <button class="btn-action btn-edit" onclick="cargarParaEditar(${index})">✏️</button>
        <button class="btn-action btn-delete" onclick="eliminarDispositivo(${index})">🗑️</button>
      </div>
    </div>`;
  }
}

class Laptop extends Dispositivo {
  constructor(name, codigo, ram) { super(name, codigo, ram); this.category = "Laptop"; }
  obtenerFicha(index) {
    return `<div class="card laptop-card ${this.obtenerClaseRam()}">
      <div class="card-badge">Laptop</div>
      <h3>${this.name}</h3>
      <div class="card-info"><p><strong>Memory:</strong> ${this.ram} GB</p></div>
      <div class="card-actions">
        <button class="btn-action btn-edit" onclick="cargarParaEditar(${index})">✏️</button>
        <button class="btn-action btn-delete" onclick="eliminarDispositivo(${index})">🗑️</button>
      </div>
    </div>`;
  }
}

class Desktop extends Dispositivo {
  constructor(name, codigo, ram) { super(name, codigo, ram); this.category = "Desktop-PC"; }
  obtenerFicha(index) {
    return `<div class="card desktop-pc-card ${this.obtenerClaseRam()}">
      <div class="card-badge">Desktop</div>
      <h3>${this.name}</h3>
      <div class="card-info"><p><strong>Memory:</strong> ${this.ram} GB</p></div>
      <div class="card-actions">
        <button class="btn-action btn-edit" onclick="cargarParaEditar(${index})">✏️</button>
        <button class="btn-action btn-delete" onclick="eliminarDispositivo(${index})">🗑️</button>
      </div>
    </div>`;
  }
}

// ----- ¡NUEVAS CLASES HIJAS! -----
class Phone extends Dispositivo {
  constructor(name, codigo, ram) { super(name, codigo, ram); this.category = "Phone"; }
  obtenerFicha(index) {
    return `
      <div class="card phone-card ${this.obtenerClaseRam()}">
        <div class="card-badge">Smartphone</div>
        <h3>${this.name}</h3>
        <div class="card-info"><p><strong>RAM:</strong> ${this.ram} GB</p></div>
        <div class="card-actions">
          <button class="btn-action btn-edit" onclick="cargarParaEditar(${index})">✏️</button>
          <button class="btn-action btn-delete" onclick="eliminarDispositivo(${index})">🗑️</button>
        </div>
      </div>`;
  }
}

class Tablet extends Dispositivo {
  constructor(name, codigo, ram) { super(name, codigo, ram); this.category = "Tablet"; }
  obtenerFicha(index) {
    return `
      <div class="card tablet-card ${this.obtenerClaseRam()}">
        <div class="card-badge">Tablet / iPad</div>
        <h3>${this.name}</h3>
        <div class="card-info"><p><strong>RAM:</strong> ${this.ram} GB</p></div>
        <div class="card-actions">
          <button class="btn-action btn-edit" onclick="cargarParaEditar(${index})">✏️</button>
          <button class="btn-action btn-delete" onclick="eliminarDispositivo(${index})">🗑️</button>
        </div>
      </div>`;
  }
}

class Accessory extends Dispositivo {
  constructor(name, codigo, ram) {
    // Los accesorios (teclados, monitores) no suelen llevar RAM, si el usuario no pone nada pasará como 0
    super(name, codigo, ram || 0);
    this.category = "Accessory";
  }
  obtenerFicha(index) {
    return `
      <div class="card accessory-card ${this.obtenerClaseRam()}">
        <div class="card-badge">Accessory</div>
        <h3>${this.name}</h3>
        <div class="card-info"><p><em>No RAM required</em></p></div>
        <div class="card-actions">
          <button class="btn-action btn-edit" onclick="cargarParaEditar(${index})">✏️</button>
          <button class="btn-action btn-delete" onclick="eliminarDispositivo(${index})">🗑️</button>
        </div>
      </div>`;
  }
}

// ----- LOGICA MODIFICADA PARA COMPRENDER LOS NUEVOS TIPOS -----
const baseDatos = [];
let editIndex = null;

function registrarNuevo() {
  let log = document.getElementById("status-log");
  log.className = "log-area";

  try {
    let type = document.getElementById("type").value;
    let name = document.getElementById("name").value;
    let ram = Number(document.getElementById("ram").value);
    let security = document.getElementById("security").value;

    if (type === "" || type === "Category") 
      throw new Error("You forgot to select a category. This message will be hidden in 5 seconds ");
    if (!name) throw new Error("You forgot to include the Name. This message will be hidden in 5 seconds");

    // Regla especial: Los accesorios permiten tener 0 de RAM, los demás dispositivos no.
    if (type !== "Accessory") {
      if (!ram) throw new Error("You forgot to include the RAM. This message will be hidden in 5 seconds");
      if (ram <= 0) throw new Error("RAM must be a positive number.");
    }

    if (!security) throw new Error("Security code is required.");
    if (security.length < 4) throw new Error("The security code must be at least 4 characters. This message will be hidden in 5 seconds");

    let nuevoEquipo;

    // Enrutador de instanciación según la categoría
    if (type === "Server") nuevoEquipo = new Server(name, security, ram);
    else if (type === "Laptop") nuevoEquipo = new Laptop(name, security, ram);
    else if (type === "DesktopPC") nuevoEquipo = new Desktop(name, security, ram);
    else if (type === "Phone") nuevoEquipo = new Phone(name, security, ram);
    else if (type === "Tablet") nuevoEquipo = new Tablet(name, security, ram);
    else if (type === "Accessory") nuevoEquipo = new Accessory(name, security, ram);

    if (editIndex !== null) {
      baseDatos[editIndex] = nuevoEquipo;
      log.classList.add("success-error");
      iniciarTemporizador(`✓ UPDATED: ${name} has been updated.`, "#00b894");
      editIndex = null;
      document.getElementById("btn-submit-main").innerText = "Register Asset";
    } else {
      baseDatos.push(nuevoEquipo);
      log.classList.add("success-error");
      iniciarTemporizador(`✓ SUCCESS: ${name} has been registered. This message will be hidden in 5 seconds`, "#00b894");
    }

    renderizar();
  } catch (error) {
    log.classList.add("critical-error");
    iniciarTemporizador(`✕ ERROR: ${error.message}`, "#ff4d4d");
  }
}

function eliminarDispositivo(index) {
  if (confirm(`Are you sure you want to delete this asset?`)) {
    baseDatos.splice(index, 1);
    if (editIndex === index) {
      editIndex = null;
      document.getElementById("btn-submit-main").innerText = "Register Asset";
      resetFormUI();
    }
    renderizar();
  }
}

function cargarParaEditar(index) {
  const equipo = baseDatos[index];
  editIndex = index;

  document.getElementById("name").value = equipo.name;
  document.getElementById("ram").value = equipo.ram === 0 ? "" : equipo.ram;
  document.getElementById("security").value = equipo.obtenerCodigo();
  document.getElementById("type").value = equipo.category === "Desktop-PC" ? "DesktopPC" : equipo.category;

  document.getElementById("btn-submit-main").innerText = "Update Asset";
  document.querySelector(".form-card").scrollIntoView({ behavior: 'smooth' });
}

function resetFormUI() {
  document.getElementById("name").value = "";
  document.getElementById("ram").value = "";
  document.getElementById("security").value = "";
  document.getElementById("type").value = "Category";
  document.getElementById("btn-submit-main").innerText = "Register Asset";
  editIndex = null;

  let log = document.getElementById("status-log");
  log.innerText = "";
  log.className = "log-area";
}

function iniciarTemporizador(mensajeBase, color) {
  let log = document.getElementById("status-log");
  let segundos = 5;

  log.style.borderColor = color;
  log.innerText = `${mensajeBase} (${segundos}s)`;

  if (window.currentTimer) clearInterval(window.currentTimer);

  window.currentTimer = setInterval(() => {
    segundos--;
    log.innerText = `${mensajeBase} (${segundos}s)`;

    if (segundos <= 0) {
      clearInterval(window.currentTimer);
      resetFormUI();
    }
  }, 1000);
}

function renderizar() {
  let display = document.getElementById("inventario-display");
  let dashboard = document.getElementById("dashboard");

  display.innerHTML = "";

  baseDatos.forEach((equipo, index) => {
    display.innerHTML += equipo.obtenerFicha(index);
  });

  if (baseDatos.length > 0) {
    dashboard.classList.remove("empty-state");
    dashboard.classList.add("has-items");
  } else {
    dashboard.classList.remove("has-items");
    dashboard.classList.add("empty-state");
  }
}