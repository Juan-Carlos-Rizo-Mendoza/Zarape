document.addEventListener('DOMContentLoaded', () => {
    // Función para renderizar las imágenes en la página
    function renderImages(imageData) {
        const elements = {
            logo: document.getElementById('logo')
        };

        for (const [key, value] of Object.entries(imageData.images)) {
            if (elements[key]) {
                elements[key].src = value;
            }
        }
    }

    // Función para cargar el JSON de imágenes
    function loadImages() {
        fetch('../JSON/index.json')
            .then(response => response.json())
            .then(data => renderImages(data))
            .catch(error => console.error('Error cargando el JSON de imágenes:', error));
    }

    // Llamar a la función para cargar y renderizar las imágenes
    loadImages();
});
document.addEventListener('DOMContentLoaded', () => {
    // Función para renderizar las imágenes en la página
    function renderImages(sucursales) {
        sucursales.forEach(sucursal => {
            // Crear el ID del elemento img a partir del id_sucursal
            const imgElement = document.getElementById(`sucursal${sucursal.id_sucursal}`);
            if (imgElement) {
                imgElement.src = sucursal.foto_sucursal;
                imgElement.alt = `Foto de ${sucursal.nombre}`;
            }
        });
    }

    // Función para cargar el JSON de imágenes
    function loadImages() {
        fetch('../JSON/json.json')
            .then(response => response.json())
            .then(data => renderImages(data.sucursales))
            .catch(error => console.error('Error cargando el JSON de imágenes:', error));
    }

    // Llamar a la función para cargar y renderizar las imágenes
    loadImages();
});
