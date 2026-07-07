const $btnCargar = $('#btnCargar');
const $contenedor = $('#contenedorUsuarios');

const obtenerUsuarios = async () => {
    try {
        const respuesta = await $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET"
        });
        
        $contenedor.empty(); // Limpiar antes de renderizar


        //dejar que ellos trabajen solos desde street para abajo
        $.each(respuesta, (index, user) => {
            const $div = $('<div>', { class: 'card'});
            $div.html(`
                <h2>ID: ${user.id}</h2>
                <h3>Nombre: ${user.name}</h3>
                <h3>User: ${user.username}</h3>
                <p>Email: ${user.email}</p>
            `);
            $contenedor.append($div);
        });
    } catch (error) {
        console.error('Error al conectar con la API:', error);
    }
};

$btnCargar.on('click', obtenerUsuarios);