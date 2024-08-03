document.addEventListener('DOMContentLoaded', () => {
    // Función para renderizar las imágenes en la página
    function renderImages(imageData) {
        const elements = {
            logo: document.getElementById('logo'),
            carousel1: document.getElementById('carousel1'),
            carousel2: document.getElementById('carousel2'),
            carousel3: document.getElementById('carousel3'),
            sectionImage1: document.getElementById('sectionImage1'),
            sectionImage2: document.getElementById('sectionImage2')
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
