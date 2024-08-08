let indexProductoSeleccionado = null;
let productos = []; // Objeto para almacenar los productos
let imagenSeleccionadaURL = "";
let rutaImagenes = 'img/'; // Ruta base para las imágenes
let obj = []; // Inicializa obj como un arreglo vacío al principio

// Cargar datos iniciales desde el JSON estático
fetch("http://localhost:8080/Integradora_Usuario/JS/jsonBbds.json")
  .then(response => response.json())
    .then(function(data) {
        productos = data;
        console.log(productos);
        actualizarTabla();
    });
// Función para actualizar la tabla con los productos activos
function actualizarTabla() {
    let cuerpoTabla = "";
    productos.forEach(function(producto, index) {
        if (producto.estatus === "Activo") {
            let registro =
                `<tr onclick="seleccionarProducto(${index});">
                    <td>B${index + 1}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.tipo}</td>
                    <td>${producto.precio}</td>
                    <td><img src="${producto.foto}" width="50"></td>
                    <td>${producto.estatus}</td>
                    <td>
                        <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#editUserModal">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index});">Eliminar</button>
                    </td>
                </tr>`;
            cuerpoTabla += registro;
        }
    });
    document.getElementById("tablaProductos").innerHTML = cuerpoTabla;
}

// Función para seleccionar un producto y mostrar sus datos en el formulario
function seleccionarProducto(index) {
    indexProductoSeleccionado = index;
    document.getElementById("editNombre").value = productos[index].nombre;
    document.getElementById("editDescripcion").value = productos[index].descripcion;
    document.getElementById("editTipo").value = productos[index].tipo;
    document.getElementById("editPrecio").value = productos[index].precio;
    document.getElementById("editFoto").src = productos[index].foto;
}

// Función para añadir un nuevo producto
function agregarProducto() {
    const nombre = document.getElementById('addNombre').value;
    const descripcion = document.getElementById('addDescripcion').value;
    const tipo = document.getElementById('addTipo').value;
    const precio = document.getElementById('addPrecio').value;

    if (nombre && descripcion && tipo && precio) {
        const nuevoProducto = {
            nombre: nombre,
            descripcion: descripcion,
            tipo: tipo,
            precio: precio,
            foto: imagenSeleccionadaURL || "img/default.jpg",
            estatus: "Activo"
        };

        productos.push(nuevoProducto);
        console.log("Producto agregado:", nuevoProducto);
        limpiarFormulario('formProducto');
        actualizarTabla();
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

// Función para modificar un producto existente
function modificarProducto() {
    if (indexProductoSeleccionado !== null) {
        const nombre = document.getElementById('editNombre').value;
        const descripcion = document.getElementById('editDescripcion').value;
        const tipo = document.getElementById('editTipo').value;
        const precio = document.getElementById('editPrecio').value;

        if (nombre && descripcion && tipo && precio) {
            productos[indexProductoSeleccionado].nombre = nombre;
            productos[indexProductoSeleccionado].descripcion = descripcion;
            productos[indexProductoSeleccionado].tipo = tipo;
            productos[indexProductoSeleccionado].precio = precio;
            if (imagenSeleccionadaURL) {
                productos[indexProductoSeleccionado].foto = imagenSeleccionadaURL;
            }

            limpiarFormulario('formEditarProducto');
            actualizarTabla();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    } else {
        alert('Selecciona un producto para modificar.');
    }   
}

// Función para eliminar un producto
function eliminarProducto(index) {
    if (confirm(`¿Estás seguro de eliminar "${productos[index].nombre}"?`)) {
        productos[index].estatus = "Inactivo";
        console.log(`Producto "${productos[index].nombre}" marcado como inactivo.`);
        actualizarTabla();
    }
}

// Función para limpiar el formulario y la imagen seleccionada
function limpiarFormulario(formId) {
    document.getElementById(formId).reset();
    document.getElementById('addFoto').src = 'img/default.jpg';
    imagenSeleccionadaURL = "";
    indexProductoSeleccionado = null;
}

// Función para mostrar la imagen seleccionada en el formulario de agregar
function desplegarImagen(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            imagenSeleccionadaURL = e.target.result;
            document.getElementById('addFoto').src = imagenSeleccionadaURL;
            if (formId === 'formEditarProducto') {
                document.getElementById('editFoto').src = imagenSeleccionadaURL;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}
