const grid = document.getElementById('grid-personajes');
const buscador = document.getElementById('buscador');

// Guardamos los personajes aquí para no hacer peticiones cada vez que buscamos
let todosLosPersonajes = [];

const renderizar = (lista) => {
    grid.innerHTML = '';
    lista.forEach(p => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div class="card-content">
                <h3>${p.name}</h3>
                <p><strong>Estado:</strong> ${p.status}</p>
                <p><strong>Origen:</strong> ${p.origin.name}</p>
            </div>
        `;
        grid.appendChild(div);
    });
};

// Lógica del buscador
buscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    
    // Filtramos la lista original basándonos en el nombre
    const filtrados = todosLosPersonajes.filter(p => 
        p.name.toLowerCase().includes(texto)
    );
    
    renderizar(filtrados);
});

// Inicialización
const init = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();
    todosLosPersonajes = data.results; // Guardamos los datos
    renderizar(todosLosPersonajes); // Render inicial
};

init();