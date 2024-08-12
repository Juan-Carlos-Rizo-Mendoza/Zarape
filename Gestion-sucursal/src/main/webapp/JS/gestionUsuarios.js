document.addEventListener('DOMContentLoaded', (event) => {
    actualizaTabla();
});

let usuarios = [];
let usuarioSeleccionadoIndex = -1;

// Cargar datos desde el JSON
fetch("../JSON/datosClientes.json")
    .then(response => response.json())
    .then(jsondata => {
        usuarios = jsondata;
        actualizaTabla();
    });

function actualizaTabla() {
    let cuerpo = "";
    usuarios.forEach((usuario, index) => {
        let registro =
            `<tr class="${usuario.estado === 'inactivo' ? 'table-secondary' : ''}">
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.estado}</td>
                <td>
                    <button class="btn btn-sm" style="background-color: #e55934; color: #fff;" data-toggle="modal" data-target="#editUserModal" onclick="cargarUsuario(${index})">Editar</button>
                    <button class="btn btn-sm" style="background-color: #e55934; color: #fff;" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblUsuarios").innerHTML = cuerpo;
}

function agregarUsuario() {
    const nombre = document.getElementById("addName").value;
    const apellido = document.getElementById("addLastname").value;
    const email = document.getElementById("addEmail").value;
    const telefono = document.getElementById("addPhone").value;

    if (!nombre || !apellido || !email || !telefono) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        estado: "activo"
    };

    usuarios.push(nuevoUsuario);
    document.getElementById("formAddUser").reset();
    $('#addUserModal').modal('hide');
    actualizaTabla();
}

function cargarUsuario(index) {
    usuarioSeleccionadoIndex = index;
    document.getElementById("editName").value = usuarios[index].nombre;
    document.getElementById("editLastname").value = usuarios[index].apellido;
    document.getElementById("editEmail").value = usuarios[index].email;
    document.getElementById("editPhone").value = usuarios[index].telefono;
}

function modificarUsuario() {
    if (usuarioSeleccionadoIndex < 0) return;

    usuarios[usuarioSeleccionadoIndex].nombre = document.getElementById("editName").value;
    usuarios[usuarioSeleccionadoIndex].apellido = document.getElementById("editLastname").value;
    usuarios[usuarioSeleccionadoIndex].telefono = document.getElementById("editPhone").value;

    $('#editUserModal').modal('hide');
    actualizaTabla();
}

function eliminarUsuario(index) {
    usuarios[index].estado = "inactivo";
    actualizaTabla();
}

function consultarUsuario() {
    const dato = document.getElementById("conDato").value.toLowerCase();
    const tipoDato = document.getElementById("conTipoDato").value;

    const resultados = usuarios.filter(usuario => usuario[tipoDato].toLowerCase().includes(dato));
    
    let cuerpo = "";
    resultados.forEach(usuario => {
        let registro =
            `<tr class="${usuario.estado === 'inactivo' ? 'table-secondary' : ''}">
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.estado}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblConsulta").innerHTML = cuerpo;
}
