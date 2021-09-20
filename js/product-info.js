/*Funcion para mostrar imagenes*/
/*CREAR CARRUSEL DE IMAGENES*/

var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productCostHTML = document.getElementById("productCost");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.currency + " " + product.cost
            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});

/*Comienza el codigo de lista de comentarios*/
/*MOFICAR ESTILO*/

let commentList = [];


function showComments() {
    let htmlContentToAppend = "";
    for (comment of commentList) {
        htmlContentToAppend += `
    <div class="container">
        <div class="row">
            <div class="col-sm-5 col-md-6 col-12 pb-4">
                <div class="comment mt-4 text-justify float-left"> <img src="https://i.imgur.com/CFpa3nK.jpg" alt="" class="rounded-circle" width="40" height="40">
                    <h4>${comment.user}</h4> <span>- ${comment.dateTime}</span> <br>
                    <p>${comment.description}</p>
                    <p>${drawStars(comment.score)}</p>
                </div>
            </div>
        </div>
    </div>
    `
    }

    document.getElementById("list").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                    if (resultObj.status === "ok") {
                    commentList = resultObj.data;
                    showComments();


                }
            }

        )
});

/*Comienza código de caja de comments*/

var comments = [];

function saveComment() {
    let date = new Date();
    let formatDate = date.getDate().toString().padStart(2, '0') + "-" + (date.getMonth() +1).toString().padStart(2, '0') + "-" + date.getFullYear().toString() + "  " + date.getHours() + ":" + date.getMinutes();
    comment = {
        message: document.getElementById("textarea").value,
        completeDate: formatDate,
        score: document.getElementById("score").value,
        user: localStorage.getItem("user")
    }

    comments.push(comment);
    showComment();
}


/*Funcion de estrellas*/
function drawStars(stars){

    let number = parseInt(stars);
    let html="";
    for(let i =1; i<=number;i++){
        html +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        html +=`<span class="fa fa-star"></span>`
    }    
    return html;

}

/*Funcion para mostrar comentarios relizados por usuario*/

function showComment() {
    let html = ""
    for (let i = comments.length - 1; i >= 0; i--) {
        let comment = comments[i];
        html += `<div class="container">
                <div class="row">
                    <div class="col-sm-5 col-md-6 col-12 pb-4">
                        <div class="comment mt-4 text-justify float-left"> <img src="https://i.imgur.com/CFpa3nK.jpg" alt="" class="rounded-circle" width="40" height="40">
                        <a href="my-profile.html" id="NombreUsuario"></a> <span>- ${comment.completeDate}</span> <br>
                            <p>${comment.message}</p>
                            <p>${drawStars(comment.score)}</p>
                        </div>
                    </div>
                </div>
            </div>
            `

            

    }



    document.getElementById("comments").innerHTML = html;
    document.getElementById("formulario").reset();
}