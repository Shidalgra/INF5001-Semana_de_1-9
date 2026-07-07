$('#btnBuscar').on('click', async () => {
    const inputVal = $('#pokeInput').val().toLowerCase();
    
    if (!inputVal) return alert("¡Escribe el nombre de un Pokémon!");

    // El efecto: ocultar la tarjeta suavemente antes de cargar los nuevos datos
    $('.card').fadeOut(200, async () => {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputVal}`);
            if (!respuesta.ok) throw new Error("No encontrado");
            const p = await respuesta.json();

            // Inyectar datos
            $('#img').attr('src', p.sprites.other['official-artwork'].front_default);
            $('#name').text(p.name.toUpperCase());
            $('#hp').text(p.stats[0].base_stat);
            $('#atk').text(p.stats[1].base_stat);
            $('#defense').text(p.stats[2].base_stat);
            $('#spd').text(p.stats[5].base_stat);
            $('#type').text(p.types[0].type.name);
            $('#height').text(p.height / 10 + 'm');
            $('#weight').text(p.weight / 10 + 'kg');
            $('#ability').text(p.abilities[0].ability.name);

            // Mostrar elementos
            $('#stats').css('display', 'grid');
            $('#img').css('display', 'block');

            // El efecto: volver a aparecer la tarjeta con los nuevos datos
            $('.card').fadeIn(500);

        } catch (error) {
            alert("¡Ese Pokémon no existe!");
            $('.card').fadeIn(500); // Volver a mostrar aunque falle
        }
    });
});

// Los "Infalibles" (Nombres en inglés)
// Estos son los más conocidos y funcionan perfectamente al escribirlos:

// Pikachu

// Charizard

// Bulbasaur

// Squirtle

// Eevee

// Mewtwo

// Ditto

// Gengar

// Snorlax

// Lucario

// Greninja

// Podemos buscarlos por IDs