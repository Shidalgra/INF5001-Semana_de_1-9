$(document).ready(function () {

    // Al hacer clic en el botón de acción
    $("#btn-publicaciones").click(function () {

        // Referencias a elementos del DOM
        const $contenedor = $("#contenedor-noticias");
        const $contenedorError = $("#contenedor-error");
        const $loader = $("#loading");

        // 1. Limpiar contenedor previo (.empty)
        $contenedor.empty();
        $contenedorError.empty();

        // 2. Mostrar mensaje de carga
        $loader.fadeIn();

        // 3. Realizar el FETCH a la API
        $.getJSON("https://jsonplaceholder.typicode.com/posts")
            .done(function (data) {
                // Ocultar el loader al recibir datos
                $loader.fadeOut();

                // 4. Recorrer el array y meter la inyección dinámica en lote
                let elementos = "";
                $.each(data.slice(0, 12), function (index, post) {
                    elementos += `
                        <div class="card-noticia">
                            <h3>${post.title}</h3>                     
                            <p>${post.body}</p>                 
                        </div>    
                    `;
                });
                $contenedor.append(elementos);
            })
            // jqXHR (jQuery XMLHTTPRequest) 
            .fail(function (jqXHR, textStatus, errorThrown) {
                $loader.hide();

                // Usamos jqXHR para atrapar el código de error (ej: 404, 500)
                const codigoErrorStatus = jqXHR.status;
                const codigoErrorThrown = jqXHR.errorThrown;
                $contenedorError.html(`
                    <div style="text-align: center; color: #d63031;">
                        <strong>¡Ups! ${textStatus} ${codigoErrorStatus}:</strong> No se pudo cargar el contenido. (${codigoErrorThrown}).
                    </div>
                `);
            });
    });
});