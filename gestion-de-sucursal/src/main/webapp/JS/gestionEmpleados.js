document.addEventListener('DOMContentLoaded', (event) => {
    actualizaTabla();
});

let empleados = [];
let empleadoSeleccionadoIndex = -1;

// Cargar datos desde el JSON
fetch("../JS/datosEmpleados.json")
    .then(response => response.json())
    .then(jsondata => {
        empleados = jsondata;
        actualizaTabla();
    });

function generarIdEmpleado(nombre, apellido, index) {
    const nombreIniciales = nombre.split(' ').length > 1 
        ? nombre.split(' ').map(n => n[0]).join('').toUpperCase()
        : nombre.substring(0, 2).toUpperCase();

    const apellidoIniciales = apellido.split(' ').length > 1 
        ? apellido.split(' ').map(a => a[0]).join('').toUpperCase()
        : apellido.substring(0, 2).toUpperCase();

    return `${nombreIniciales}${apellidoIniciales}-${index + 1}`;
}

function actualizaTabla() {
    let cuerpo = "";
    empleados.forEach((empleado, index) => {
        const idEmpleado = generarIdEmpleado(empleado.nombre, empleado.apellido, index);
        let registro =
            `<tr class="${empleado.estado === 'inactivo' ? 'table-secondary' : ''}">
                <td>${idEmpleado}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.email}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.puesto}</td>
                <td>${empleado.estado}</td>
                <td>
                    <button class="btn btn-sm" style="background-color: #e55934; color: #fff;" data-toggle="modal" data-target="#editEmployeeModal" onclick="cargarEmpleado(${index})">Editar</button>
                    <button class="btn btn-sm" style="background-color: #e55934; color: #fff;" onclick="eliminarEmpleado(${index})">Eliminar</button>
                </td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblEmpleados").innerHTML = cuerpo;
}

function agregarEmpleado() {
    const nombre = document.getElementById("addName").value;
    const apellido = document.getElementById("addLastname").value;
    const email = document.getElementById("addEmail").value;
    const telefono = document.getElementById("addPhone").value;
    const puesto = document.getElementById("addPosition").value;

    if (!nombre || !apellido || !email || !telefono || !puesto) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoEmpleado = {
        id_Empleado: "", // Será generado al cargar la tabla
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        puesto: puesto,
        estado: "activo"
    };

    empleados.push(nuevoEmpleado);
    document.getElementById("formAddEmployee").reset();
    $('#addEmployeeModal').modal('hide');
    actualizaTabla();
}

function cargarEmpleado(index) {
    empleadoSeleccionadoIndex = index;
    document.getElementById("editName").value = empleados[index].nombre;
    document.getElementById("editLastname").value = empleados[index].apellido;
    document.getElementById("editEmail").value = empleados[index].email;
    document.getElementById("editPhone").value = empleados[index].telefono;
    document.getElementById("editPosition").value = empleados[index].puesto;
}

function modificarEmpleado() {
    if (empleadoSeleccionadoIndex < 0) return;

    empleados[empleadoSeleccionadoIndex].nombre = document.getElementById("editName").value;
    empleados[empleadoSeleccionadoIndex].apellido = document.getElementById("editLastname").value;
    empleados[empleadoSeleccionadoIndex].telefono = document.getElementById("editPhone").value;
    empleados[empleadoSeleccionadoIndex].puesto = document.getElementById("editPosition").value;

    $('#editEmployeeModal').modal('hide');
    actualizaTabla();
}

function eliminarEmpleado(index) {
    empleados[index].estado = "inactivo";
    actualizaTabla();
}

function consultarEmpleado() {
    const dato = document.getElementById("conDato").value.toLowerCase();
    const tipoDato = document.getElementById("conTipoDato").value;

    const resultados = empleados.filter(empleado => empleado[tipoDato].toLowerCase().includes(dato));
    
    let cuerpo = "";
    resultados.forEach((empleado, index) => {
        const idEmpleado = generarIdEmpleado(empleado.nombre, empleado.apellido, index);
        let registro =
            `<tr class="${empleado.estado === 'inactivo' ? 'table-secondary' : ''}">
                <td>${idEmpleado}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.email}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.puesto}</td>
                <td>${empleado.estado}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblConsulta").innerHTML = cuerpo;
}
