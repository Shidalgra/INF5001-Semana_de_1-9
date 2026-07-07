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
                <p>Street: ${user.address.street}</p> 
                <p>Suite: ${user.address.suite}</p> 
                <p>City: ${user.address.city}</p> 
                <p>Zip-code: ${user.address.zipcode}</p> 
                <p>Latitude: ${user.address.geo.lat}</p> 
                <p>Longitude: ${user.address.geo.lng}</p> 
                <p>Phone: ${user.phone}</p> 
                <p>Website: ${user.website}</p> 
                <p>Company-name: ${user.company.name}</p> 
                <p>Company-CatchPhrase: ${user.company.catchPhrase}</p> 
                <p>Company-bs: ${user.company.bs}</p> 
            `);
            $contenedor.append($div);
        });
    } catch (error) {
        console.error('Error al conectar con la API:', error);
    }
};

$btnCargar.on('click', obtenerUsuarios);