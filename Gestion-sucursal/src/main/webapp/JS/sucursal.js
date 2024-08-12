let sucursales = [];
let selectedSucursalId = null;
async function loadSucursales() {
    try {
        const response = await fetch('../JSON/sucursal.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.sucursales)) {
            sucursales = data.sucursales;
            renderTable();
        } else {
            throw new Error('Data.sucursales is not an array');
        }
    } catch (error) {
        console.error('Failed to load sucursales:', error);
    }
}

function initMap() {
    const map = L.map('map').setView([19.432608, -99.133209], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([19.432608, -99.133209], { draggable: true }).addTo(map);

    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        updateLatLong(e.latlng);
    });

    marker.on('dragend', function(e) {
        updateLatLong(e.target.getLatLng());
    });
}

function updateLatLong(location) {
    document.getElementById('latitud').value = location.lat;
    document.getElementById('longitud').value = location.lng;
}

function clearForm() {
    document.getElementById('sucursalForm').reset();
    selectedSucursalId = null;
    document.getElementById('editButton').disabled = true;
    document.getElementById('deleteButton').disabled = true;
}

function editSucursal() {
    if (selectedSucursalId !== null) {
        const sucursal = sucursales.find(s => s.id_sucursal === selectedSucursalId);
        if (sucursal) {
            document.getElementById('id_sucursal').value = sucursal.id_sucursal;
            document.getElementById('nombre').value = sucursal.nombre;
            document.getElementById('direccion').value = sucursal.direccion;
            document.getElementById('latitud').value = sucursal.gps_latitud;
            document.getElementById('longitud').value = sucursal.gps_longitud;
            document.getElementById('url_pagina_web').value = sucursal.url_pagina_web;
            document.getElementById('horarios').value = sucursal.horarios;
            document.getElementById('estado').value = sucursal.estado;
            $('#sucursalModal').modal('show');
        }
    }
}

function updateSucursalEstado(idSucursal, newEstado) {
    const index = sucursales.findIndex(s => s.id_sucursal === idSucursal);
    if (index !== -1) {
        sucursales[index].estado = newEstado;
        renderTable();
        alert('Estado de la sucursal actualizado exitosamente.');
    }
}

function deleteSucursal() {
    if (selectedSucursalId !== null) {
        const index = sucursales.findIndex(s => s.id_sucursal === selectedSucursalId);
        if (index !== -1) {
            sucursales[index].estado = 'inactivo'; // Marcar como inactivo en lugar de eliminar
            renderTable();
            alert('Sucursal marcada como inactiva.');
            clearForm();
        } else {
            alert('Sucursal no encontrada.');
        }
    } else {
        alert('No se ha seleccionado ninguna sucursal.');
    }
}

function setSucursalInactive() {
    deleteSucursal();
}

function searchSucursales() {
    const id = document.getElementById('searchId').value;
    const nombre = document.getElementById('searchNombre').value.toLowerCase();

    const filteredSucursales = sucursales.filter(sucursal => {
        const matchesId = id ? sucursal.id_sucursal.toString() === id : true;
        const matchesNombre = sucursal.nombre.toLowerCase().includes(nombre);

        return matchesId && matchesNombre;
    });

    renderTable(filteredSucursales);
}

function applyFilters() {
    const estado = document.getElementById('filterEstado').value;

    const filteredSucursales = sucursales.filter(sucursal => {
        const matchesEstado = estado ? sucursal.estado === estado : true;

        return matchesEstado;
    });

    renderTable(filteredSucursales);
}

function renderTable(data = sucursales) {
    const tableBody = document.getElementById('sucursalesTable');
    tableBody.innerHTML = '';

    data.forEach(sucursal => {
        const row = document.createElement('tr');
        // Aplica la clase 'inactivo' si el estado es 'inactivo'
        row.className = sucursal.estado === 'inactivo' ? 'inactivo' : '';

        row.innerHTML = `
            <td>${sucursal.id_sucursal}</td>
            <td>${sucursal.nombre}</td>
            <td>${sucursal.direccion}</td>
            <td>${sucursal.gps_latitud}</td>
            <td>${sucursal.gps_longitud}</td>
            <td><img src="${sucursal.foto_sucursal}" alt="${sucursal.nombre}" width="50"></td>
            <td><a href="${sucursal.url_pagina_web}" target="_blank">${sucursal.url_pagina_web}</a></td>
            <td>${sucursal.horarios}</td>
            <td>${sucursal.estado}</td>
        `;
        row.onclick = () => selectSucursal(sucursal.id_sucursal);
        tableBody.appendChild(row);
    });
}

function selectSucursal(id) {
    selectedSucursalId = id;
    document.getElementById('editButton').disabled = false;
    document.getElementById('deleteButton').disabled = false;
}

document.getElementById('sucursalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const idSucursal = formData.get('id_sucursal');
    const nombre = formData.get('nombre');
    const direccion = formData.get('direccion');
    const latitud = parseFloat(formData.get('latitud'));
    const longitud = parseFloat(formData.get('longitud'));
    const fotoSucursal = URL.createObjectURL(formData.get('foto_sucursal'));
    const urlPaginaWeb = formData.get('url_pagina_web');
    const horarios = formData.get('horarios');
    const estado = formData.get('estado');

    if (!nombre || !direccion || isNaN(latitud) || isNaN(longitud) || !horarios) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    const newSucursal = {
        id_sucursal: idSucursal || Date.now().toString(),
        nombre,
        direccion,
        gps_latitud: latitud,
        gps_longitud: longitud,
        foto_sucursal: fotoSucursal,
        url_pagina_web: urlPaginaWeb,
        horarios,
        estado
    };

    if (selectedSucursalId) {
        const index = sucursales.findIndex(s => s.id_sucursal === selectedSucursalId);
        if (index !== -1) {
            sucursales[index] = newSucursal;
        } else {
            alert('Sucursal no encontrada para actualizar.');
        }
    } else {
        sucursales.push(newSucursal);
    }

    renderTable();
    $('#sucursalModal').modal('hide');
    clearForm();
    alert('Sucursal guardada exitosamente.');
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchSucursales();
    $('#searchModal').modal('hide');
});

document.getElementById('applyFilters').addEventListener('click', function() {
    applyFilters();
});

window.addEventListener('DOMContentLoaded', (event) => {
    loadSucursales();
    initMap();
});
