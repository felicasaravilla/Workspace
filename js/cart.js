let productosCarrito=[];


/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(cantidad, costo, id){
    
   console.log(productosCarrito[id].currency);
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


function updateTotal(){
    let total = 0;
    let subtotales = document.getElementsByClassName("subtotal");
    for (let iterator of subtotales) {
        total += parseInt(iterator.innerHTML);
    }
  
    document.getElementById("total").innerHTML=total;
    document.getElementById("totalCost").innerHTML=total;
    document.getElementById("productCost").innerHTML=total;
}




function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito();
    })
})





function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito();
    })
})
