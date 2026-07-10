/**
 * MÓDULO API - Responsabilidad: Simular peticiones HTTP asíncronas con promesas nativas.
 */

/**
 * Simula la carga de datos de un anuncio / validación de credenciales en red.
 * Envía notificaciones de progreso (porcentaje) mediante un callback.
 * @param {Function} onProgress - Función que recibe el porcentaje de carga (0-100)
 * @returns {Promise<string>}
 */
const consultarServidorAd = (onProgress) => {
    return new Promise((resolve, reject) => {
        let porcentaje = 0;
        
        const intervalo = setInterval(() => {
            porcentaje += 5;
            if (onProgress) onProgress(porcentaje);
            
            if (porcentaje >= 100) {
                clearInterval(intervalo);
                const exitoConexion = true; // Cambiar a false en clase para forzar que caiga en el catch.
                
                if (exitoConexion) {
                    resolve("🔓 Autenticación global completada con el servidor central.");
                } else {
                    reject("❌ Error de Handshake: Código de respuesta 502.");
                }
            }
        }, 150); // Incrementa cada 150ms hasta completar los 3 segundos totales
    });
};

/**
 * Simula la descarga de datos JSON de un inventario de base de datos.
 * @returns {Promise<Array>}
 */
const obtenerCatalogoProductos = () => {
    return new Promise((resolve) => {
          // Retraso voluntario de 4.5 segundos para forzar el despliegue visual de los "Skeletons"
          setTimeout(() => {
                const catalogo = [
                      {
                    id: 1,
                    nombre: "Coca-Cola Sabor Original",
                    descripcion: "La bebida refrescante que conoces, celebrando momentos mágicos del día a día.",
                    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300"
                    // imagen: "https://www.coca-cola.com/content/dam/onexchange/co/es/brands/coca-cola/co_coca-cola_prod_sabor-original_750ml_750x750.png"
                },
                {
                    id: 2,
                    nombre: "Coca-Cola Zero Azúcar",
                    descripcion: "Mismo sabor espectacular e inconfundible, totalmente libre de calorías y azúcar.",
                    imagen: "https://www.researchgate.net/publication/375992517/figure/fig4/AS:11431281209649338@1701808112324/Advertisement-Coca-Cola-Zero-C-2010-The-Coca-Cola-Company.jpg"
                    // imagen: "https://www.coca-cola.com/content/dam/onexchange/co/es/brands/coca-cola/co_coca-cola_prod_zero-azucar_750ml_750x750.png"
                  },
                  {
                    id: 3,
                    nombre: "Coca-Cola Light",
                    descripcion: "La variante icónica ultra liviana, con burbujas crujientes y sabor sutil.",
                    // imagen: "https://www.periodicopublicidad.com/media/lapublicidad/images/2016/09/19/20160919201450022133.jpg"
                    imagen: "https://www.coca-cola.com/content/dam/onexchange/co/es/brands/coca-cola/co_coca-cola_prod_sabor-ligero_750ml_750x750.png"
                }
            ];
            resolve(catalogo);
        }, 4500);
    });
};

