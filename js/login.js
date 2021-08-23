//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener('submit', validarFormulario);
});
function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('name').value;
    var clave = document.getElementById('password').value;

    if (usuario.length == 0) {
        alert('el usuario no es válido');
        return;
    }

    if (clave.length == 0) {
        alert('La clave no es válida');
        return;
    }
    this.submit();
}