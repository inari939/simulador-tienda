let listadoProductos = [];

document.addEventListener('DOMContentLoaded', function() { 
    fetch('data/productos.json')
    .then(response => {
        if(!response.ok){
            console.log("error al cargar el archivo json")
        }
        return response.json();
    })
    .then(data => {
        // listadoProductos = data;
        mostrarProductos(data); //function que arma las card
    })
    .catch(error => { console.log("error al cargar el json " + error)})
        
});

function mostrarProductos(listadoProductos){

    let productosContainer = document.getElementById('products');
    console.log(listadoProductos)

//recorremos los items asi deja de decir object object

    for(let i = 0; i < listadoProductos.length; i++){
    let html = '';
for (let producto of listadoProductos) {
    html += `
    <div class="col-12 col-sm-6 col-md-4">
        <div class="card mt-4" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.descripcion}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text"><strong>$ ${producto.precio}</strong></p>
                <input class="border border-info rounded-2" type="number" placeholder="1" id="stock-${producto.id}" value="0">
                <span class="d-flex">Stock disponible: ${producto.cantidad}</span>
                <a href="#" onclick="agregarCarrito(${producto.id})" class="btn btn-success m-3">Agregar al carrito</a>
            </div>
        </div>
    </div>`;
}
productosContainer.innerHTML = html;
    }

}

let carrito = JSON.parse(localStorage.getItem('carritoId')) || [];

function agregarCarrito(idProducto) {
    let cantidadInput = parseInt(document.getElementById(`stock-${idProducto}`).value);
    if (isNaN(cantidadInput) || cantidadInput <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }
    


    let productoExistente = carrito.find(item => item.id === idProducto);
    if (productoExistente) {
        productoExistente.cantidad += cantidadInput;
    } else {
        carrito.push({ id: idProducto, cantidad: cantidadInput });
    }

    localStorage.setItem('carritoId', JSON.stringify(carrito));


    let cartCount = document.querySelector(".cart-count");
    cartCount.innerHTML = carrito.reduce((total, item) => total + item.cantidad, 0);

    document.getElementById(`stock-${idProducto}`).value = 0; 
}


 //script del buscador
      let buscadorInput = document.getElementById('buscador');
      //let cards = document.querySelectorAll('.card');

      function normalizarTexto(texto){
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase(); //con esto le saco los acentos a las palabras
}

function buscar(){

let textoBuscado = normalizarTexto(buscadorInput.value); 
let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let titulo = card.querySelector('h5').textContent;
        let tituloNormalizado = normalizarTexto(titulo);

        if(tituloNormalizado.includes(textoBuscado)){ 
            card.classList.remove('hidden'); 
        }else{
            card.classList.add('hidden');
        }
    });
}
 





buscadorInput.addEventListener('input', buscar);



