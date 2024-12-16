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


function mostrarProductos(listadoProductos) {
    const carritoId = JSON.parse(localStorage.getItem('carritoId')) || [];
    let productosContainer = document.getElementById('carts');

    if (carritoId.length === 0) {
        productosContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    productosContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos productos

    // Recorre los productos y muestra solo los que están en el carrito
    carritoId.forEach(itemCarrito => {
        let producto = listadoProductos.find(prod => prod.id === itemCarrito.id);
        if (producto) {
            let cardHtml = `
                <div class="col-4">  
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.descripcion}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text"><strong>$${producto.precio}</strong></p>
                            <p>Cantidad: ${itemCarrito.cantidad}</p>             
                        </div>
                    </div>
                </div>`;
            productosContainer.innerHTML += cardHtml;
        }
    });
}


function finalizarCompra() {
    localStorage.removeItem('carritoId');
    document.querySelector(".cart-count").innerHTML = 'Tu carrito está vacío';

    // alert('Compra finalizada. Gracias por tu compra.')
    Swal.fire({
        title: "Su compra finalizó con mucho éxito 🎈",
        width: 450,
        padding: "3em",
        color: "#716add",
        background: "#fff",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/img/nyancat-gif.gif")
          center top
          no-repeat
        `
      });
    document.getElementById('carts').innerHTML = "<p>Tu carrito está vacío.</p>";
}

