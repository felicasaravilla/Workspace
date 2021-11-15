let productosCarrito=[];


/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(cantidad, costo, id){
    
   if (productosCarrito[id].currency === "UYU"){
       costo = costo / 40;
   }
   let subtotal = costo * cantidad

   document.getElementById(id).innerHTML = subtotal;
   updateTotal();
}

/*modificar la función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito(){
    let index = 0;
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    for(let article of productosCarrito){
        let id = index;
        let subtotal = parseInt(article.count) * parseInt(article.unitCost);
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input type="number"  min ="1" value=${article.count}  onChange="updateProductoSubtotal(this.value, ${article.unitCost},${id})"></td>
        <td  id="${id}" class="subtotal align-middle">${subtotal}</td>
        </tr>`
                  
        index++;
    }
    document.getElementById("carrito").innerHTML = htmlToAppend;

}

/* modifica el total*/
function updateTotal(){
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let iterator of subtotales) {
        total += parseInt(iterator.innerHTML);
    }
  
    document.getElementById("total").innerHTML=total;
    document.getElementById("productCost").innerHTML=total;
    document.getElementById("total").setAttribute("value",total);
}



function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

/* DOM donde llamo a carrito, ejecuto las funciones y le doy el valor a los porcentajes*/
let porcentaje = 0;

document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito();
        CalculoEnvio();
        document.getElementById("standardradio").addEventListener("change", function(){
            porcentaje = 0.05;
            CalculoEnvio();
        });
        
        document.getElementById("goldradio").addEventListener("change", function(){
            porcentaje = 0.07;
            CalculoEnvio();
        });
        document.getElementById("premiumradio").addEventListener("change", function(){
            porcentaje = 0.15;
            CalculoEnvio();
        });
    })
})


/*calculo de percontaje de envio*/
function PorcentajeEnvio(){
let envios = document.getElementsByName("envio");
envios.forEach(envio => {
    if (envio.checked){
    porcentaje = envio.value;
    }
});

let costoenvio = parseFloat(porcentaje);
return costoenvio
}

function CalculoEnvio(){

    let resultado = (Math.round(document.getElementById("total").getAttribute("value")*porcentaje));

    document.getElementById("comissionText").innerHTML=resultado;
    document.getElementById("comissionText").setAttribute("value",resultado);
    CostoTotal();
}

/*calculo del total de el precio a pagar*/
function CostoTotal(){
    
    let totalcompras = parseFloat(Math.round(document.getElementById("total").getAttribute("value")));
    let totalcomision = parseFloat(document.getElementById("comissionText").getAttribute("value"));
    let costototal = totalcompras + totalcomision

    document.getElementById("totalCost").innerHTML=costototal;
    document.getElementById("totalCost").setAttribute("value",costototal);
}

/*validaciones de datos ingresados por el usuario*/
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      let button = document.getElementById('paraenviar');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        button.addEventListener("click", function(event) {
          form.classList.add('was-validated');
          validarPago()
        }, false);
      });
    }, false);
  })();


  function validarPago(){
      let numerotarjeta = document.getElementById("numerotarjeta").value;
      let vencimiento = document.getElementById("vencimiento").value;
      let cvc = document.getElementById("cvc").value;
      let cuentabancaria = document.getElementById("cuentabancaria").value;

      let pago = document.querySelector('input[name="pago"]:checked');

      if (pago.id == "credito"){
              if (numerotarjeta == "" || vencimiento == "" || cvc == ""){
                  alert ("Ingresar los campos vacios");
              }else{
                  alert("Datos de pago ingresados correctamente");
              }
      }else{
          if(cuentabancaria == ""){
            alert ("Ingresar los campos vacios");
          }
          else{
            alert("Datos de pago ingresados correctamente");
          }  
      }
 }