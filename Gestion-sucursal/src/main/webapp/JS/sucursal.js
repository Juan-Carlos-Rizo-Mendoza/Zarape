let sucursales = [];

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

document.getElementById('sucursalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id_sucursal = formData.get('id_sucursal');
    const sucursal = {
        id_sucursal: id_sucursal ? parseInt(id_sucursal) : (sucursales.length ? sucursales[sucursales.length - 1].id_sucursal + 1 : 1),
        nombre: formData.get('nombre'),
        direccion: formData.get('direccion'),
        gps_latitud: parseFloat(formData.get('latitud')),
        gps_longitud: parseFloat(formData.get('longitud')),
        foto_sucursal: formData.get('foto_sucursal') ? URL.createObjectURL(formData.get('foto_sucursal')) : '',
        url_pagina_web: formData.get('url_pagina_web'),
        horarios: formData.get('horarios'),
        estado: formData.get('estado')
    };

    if (id_sucursal) {
        const index = sucursales.findIndex(s => s.id_sucursal === sucursal.id_sucursal);
        sucursales[index] = sucursal;
    } else {
        sucursales.push(sucursal);
    }

    renderSucursales();
    $('#sucursalModal').modal('hide');
    event.target.reset();
});

function renderSucursales() {
    const tableBody = document.getElementById('sucursalesTable');
    tableBody.innerHTML = '';
    sucursales.sort((a, b) => a.estado === 'baja' ? 1 : -1).forEach(sucursal => {
        const row = document.createElement('tr');
        if (sucursal.estado === 'baja') row.classList.add('inactive');
        row.innerHTML = `
            <td>${sucursal.id_sucursal}</td>
            <td>${sucursal.nombre}</td>
            <td>${sucursal.direccion}</td>
            <td>${sucursal.gps_latitud}</td>
            <td>${sucursal.gps_longitud}</td>
            <td><img src="${sucursal.foto_sucursal}" alt="Foto" width="50"></td>
            <td><a href="${sucursal.url_pagina_web}" target="_blank">${sucursal.url_pagina_web}</a></td>
            <td>${sucursal.horarios}</td>
            <td>${sucursal.estado}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editSucursal(${sucursal.id_sucursal})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSucursal(${sucursal.id_sucursal})">Borrar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editSucursal(id) {
    const sucursal = sucursales.find(s => s.id_sucursal === id);
    if (sucursal) {
        document.getElementById('id_sucursal').value = sucursal.id_sucursal;
        document.getElementById('nombre').value = sucursal.nombre;
        document.getElementById('direccion').value = sucursal.direccion;
        document.getElementById('latitud').value = sucursal.gps_latitud;
        document.getElementById('longitud').value = sucursal.gps_longitud;
        document.getElementById('url_pagina_web').value = sucursal.url_pagina_web;
        document.getElementById('horarios').value = sucursal.horarios;
        'activo'.value = sucursal.estado;
        $('#sucursalModal').modal('show');
    }
}

function deleteSucursal(id) {
    const index = sucursales.findIndex(s => s.id_sucursal === id);
    if (index !== -1) {
        sucursales[index].estado = 'baja';
        renderSucursales();
    }
}

function loadSucursales() {
    fetch('../JSON/sucursal.json')
        .then(response => response.json())
        .then(data => {
            sucursales = data.sucursales;
            renderSucursales();
        });
}

function clearForm() {
    document.getElementById('sucursalForm').reset();
    document.getElementById('id_sucursal').value = '';
}

loadSucursales();
initMap();
