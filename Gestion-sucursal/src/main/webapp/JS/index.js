document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    // Get input values
    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('contrasena').value;

    // Fetch the JSON file with user credentials
    fetch('../JSON/usuarios.json')
        .then(response => response.json())
        .then(users => {
            var validUser = users.find(user => user.usuario === usuario && user.contrasena === contrasena);
            var messageElement = document.getElementById('loginMessage');

            if (validUser) {
                messageElement.textContent = 'Login successful!';
                messageElement.style.color = '#0f0'; // Green
                window.location.href = 'menu.html'; // Redirect to another page
            } else {
                messageElement.textContent = 'Usuario o contraseña incorrectos.';
                messageElement.style.color = '#f00'; // Red
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loginMessage').textContent = 'Error al verificar usuario.';
            document.getElementById('loginMessage').style.color = '#f00'; // Red
        });
});