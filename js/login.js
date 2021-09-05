//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.getElementById("clicklogin").addEventListener('click', function() {

    let nombre = document.getElementById("nombre").value;
    let pass = document.getElementById("pass").value;

    if ((nombre !== "") && (pass !== "")) {

        window.location.href = "principal-index.html";

    } else {
        alert("debe completar los campos")
    };

    localStorage.setItem("nombre-usuario", nombre)
});
