document.addEventListener('DOMContentLoaded', function() {
    fetch('../JSON/json.json')
        .then(response => response.json())
        .then(data => {
            const images = data.images;

            // Actualiza el logo
            document.querySelector('.img_logo').src = images.logo;

            // Actualiza las imágenes del carrusel
            const carouselItems = document.querySelectorAll('.carousel-item img');
            carouselItems[0].src = images.carousel1;
            carouselItems[1].src = images.carousel2;
            carouselItems[2].src = images.carousel3;

            // Actualiza las imágenes de la sección
            const sectionImages = document.querySelectorAll('.container img');
            sectionImages[0].src = images.sectionImage1;
            sectionImages[1].src = images.sectionImage2;
        })
        .catch(error => console.error('Error loading the JSON file:', error));
});
