function guardar() {

let perfil = {};

perfil.nombre = document.getElementById("nombre").value;
perfil.primerapellido = document.getElementById("primerapellido").value;
perfil.segundonombre = document.getElementById("segundoapellido").value;
perfil.edad = document.getElementById("edad").value;
perfil.email = document.getElementById("email").value;
perfil.telefono = document.getElementById("telefono").value;

localStorage.setItem('user', JSON.stringify(perfil));
alert ("hecho")
}

document.addEventListener('DOMContentLoaded', function(e){
    let perfil = JSON.parse(localStorage.getItem('user'));


    if (perfil != null){

 document.getElementById("nombre").value = perfil.nombre;
 document.getElementById("primerapellido").value = perfil.primerapellido;
 document.getElementById("segundoapellido").value = perfil.segundonombre;
 document.getElementById("edad").value = perfil.edad;
 document.getElementById("email").value = perfil.email;
 document.getElementById("telefono").value = perfil.telefono;


    }
})