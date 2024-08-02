const IVA_RATE = 0.16;
let selectedItems = [];

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
});

document.addEventListener('DOMContentLoaded', () => {
    loadLogo();
});

function loadLogo() {
    const logoImg = document.getElementById('logoImage');

    // Aquí puedes usar la URL de la imagen o el Blob de la imagen
    const logoURL ='data:image/jpeg;base64,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kC7vYrVj2kbFc340s/C3jnwzd6LqepWs9rMpO1m43YIH86+O/wDgohcfE/w74usk8JreS2xtyW+zrkZ496+MG8X/ALQPH7jVv+/f/wBerwvBuLcY1ZTUZb26oU8bG7itUN/aH+GN7+zp8Vvtek3iTQtL9pSWAcKpYMFr9U/2Cf2uLf44+CbbT9Sudus24EKxyt85VBtzj04r8h/Gmk/GLx9j+3NI1S+2qFG6PsPxrpf2eW+KHwR8fWOtad4d1SFQyo4RAPlZhnv6V+uYOnVpUIwrO8luzx5tN3Wx/QwrbqWuG+EHjqX4geCbHUp7SSzm8tFkjk+9u2jJ/Ou5rsICiiigAooooAKKKKACiiigDlb74Z+GNTvJbm70iGa4lcu8jFssxOSevqah/wCFR+EP+gFb/wDfT/8AxVdhRQBx/wDwqPwh/wBAK3/76f8A+Kpy/CfwlG4dNDgDDodzf/FV11FAFRtNtmsxaGIG3A2iPnGK5yT4T+EpJGd9EtyzHJO5uT/31XXUUAcf/wAKj8If9AK3/wC+n/8AiqfD8KfCdvKskeiwK6nIYM3H/j1dbRQAyONYY1RBtRQAB6AU+iigAooooAKKKKACiiigAooooAKKKKACiiigDH1zwjpPiXb/AGlYx3e0YXeW4/Iisf8A4VH4Q/6AVv8A99P/APFV2FFAHH/8Kk8I/wDQDt/++n/+KrU0PwXovhvJ03T47QscnYWOT+JNblFAGHrngvRfEjh9T0+K7ZRgFy3A/Aisv/hUfhD/AKAVv/30/wD8VXYUUAcf/wAKj8If9AK3/wC+n/8AiqP+FR+EP+gFb/8AfT//ABVdhRQBn6Rodj4ftfs2n2y2sGc7EJxn8TWhRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k='; // Actualiza esta URL con la URL real de la imagen

    // Establecer la URL del logo en el src del elemento img
    logoImg.src = logoURL;
}

// Función para cargar el menú desde el archivo JSON
function loadMenu() {
    axios.get('../JSON/json.json')
        .then(response => {
            const menuData = response.data;
            renderMenu(menuData);
        })
        .catch(error => console.error('Error loading menu:', error));
}

// Función para renderizar el menú en la página
function renderMenu(menuData) {
    const menuDiv = document.getElementById('menu');
    let menuHTML = '';

    ['alimentos', 'bebidas', 'combos'].forEach(category => {
        menuHTML += `<h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;
        menuHTML += '<div class="row">';
        menuData[category].forEach(item => {
            menuHTML += `
                <div class="col-md-12 mb-4 item-container" onclick="toggleSelection(this, '${item.nombre}', ${item.precio})">
                    <div class="item-card">
                        <img src="${item.foto}" class="item-img" alt="${item.nombre}">
                        <div class="item-info">
                            <h5 class="item-title">${item.nombre}</h5>
                            <p class="item-description">${item.descripcion}</p>
                            <p class="item-price"><strong>$${item.precio.toFixed(2)}</strong></p>
                            <p class="item-quantity">Cantidad: ${getItemQuantity(item.nombre)}</p>
                        </div>
                    </div>
                </div>`;
        });
        menuHTML += '</div>';
    });

    menuDiv.innerHTML = menuHTML;
}

// Función para alternar la selección de un ítem
function toggleSelection(container, name, price) {
    const itemIndex = selectedItems.findIndex(i => i.name === name);
    if (itemIndex >= 0) {
        selectedItems[itemIndex].quantity += 1;
    } else {
        selectedItems.push({ name, price, quantity: 1 });
    }
    updateSummary();
    updateMenu();
}

// Función para obtener la cantidad de un ítem seleccionado
function getItemQuantity(name) {
    const item = selectedItems.find(i => i.name === name);
    return item ? item.quantity : 0;
}

// Función para actualizar el resumen del pedido
function updateSummary() {
    const selectedCount = selectedItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('selectedCount').textContent = selectedCount;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

// Función para actualizar el menú visualmente
function updateMenu() {
    const containers = document.querySelectorAll('#menu .item-container');
    containers.forEach(container => {
        const itemName = container.querySelector('.item-title').textContent;
        const quantity = getItemQuantity(itemName);
        const quantityElement = container.querySelector('.item-quantity');
        if (quantity > 0) {
            quantityElement.textContent = `Cantidad: ${quantity}`;
            container.classList.add('selected');
        } else {
            quantityElement.textContent = '';
            container.classList.remove('selected');
        }
    });
}

// Función para mostrar el resumen del pedido
function showOrderSummary() {
    const summarySubtotal = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const summaryIVA = summarySubtotal * IVA_RATE;
    const summaryTotal = summarySubtotal + summaryIVA;

    document.getElementById('summarySubtotal').textContent = summarySubtotal.toFixed(2);
    document.getElementById('summaryIVA').textContent = summaryIVA.toFixed(2);
    document.getElementById('summaryTotal').textContent = summaryTotal.toFixed(2);

    const summaryDetails = document.getElementById('summaryDetails');
    summaryDetails.innerHTML = '';
    selectedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        summaryDetails.appendChild(itemDiv);
    });

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('orderSummary').style.display = 'block';
}

// Función para mostrar el formulario de pago
function showPaymentForm() {
    document.getElementById('paymentForm').style.display = 'block';
    document.getElementById('orderSummary').style.display = 'none';
}

// Función para cerrar el formulario de pago y recargar la página
function closePaymentForm() {
    document.getElementById('paymentForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Función para procesar el pago
function processPayment() {
    // Aquí iría la lógica para procesar el pago
    // Por ahora, simplemente mostramos el modal de agradecimiento

    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
    thankYouModal.show();
    closePaymentForm(); // Cierra el formulario de pago
    resetSelection(); // Resetea la selección de productos
}

// Función para resetear la selección
function resetSelection() {
    selectedItems = [];
    updateSummary();
    updateMenu();
}

// Cargar el menú al iniciar
loadMenu();

