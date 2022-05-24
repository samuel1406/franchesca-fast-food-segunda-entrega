let productos = [
  {
    id: 1,
    nombre: "Especial de Calabresa",
    precio: 950,
    imagen: "./img/pizza.png",
  },
  {
    id: 2,
    nombre: "Burguer Completa",
    precio: 750,
    imagen: "./img/burguer 3.png",
  },
  {
    id: 3,
    nombre: "Super Lomo Completo",
    precio: 900,
    imagen: "./img/lomo.png",
  },
  {
    id: 4,
    nombre: "Porcion de Fritas",
    precio: 550,
    imagen: "./img/papas.png",
  },
  {
    id: 5,
    nombre: "Combo de Gaseosas",
    precio: 650,
    imagen: "./img/bebidas.png",
  },
  {
    id: 6,
    nombre: "Pack de 6 Birritas mas balde",
    precio: 2500,
    imagen: "./img/ceveza1.png",
  },
  {
    id: 7,
    nombre: "Especial de la Casa",
    precio: 850,
    imagen: "./img/pizza2.png",
  },
  {
    id: 8,
    nombre: "Burguer con Bacon",
    precio: 550,
    imagen: "./img/burguer.png",
  },
];

const contenedor = document.getElementById("container");
contenedor.innerHTML = "";

productos.forEach((producto, indice) => {
  let card = document.createElement("div");
  card.classList.add("card", "col-sm-12", "col-lg-3");
  let html = `
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${producto.precio}</p>
      <a href="#cart" class="btn btn-primary" onClick="agregarAlCarrito(${indice})">Comprar</a>
    </div>
      `;
  card.innerHTML = html;
  contenedor.appendChild(card);
});
const abrirCarrito = document.getElementById("open-cart");
const cerrarCarrito = document.getElementById("close-cart");
const carritoContainer = document.getElementsByClassName("cart-container")[0];

abrirCarrito.addEventListener("click", () => {
  carritoContainer.classList.add("cart-opened");
});

cerrarCarrito.addEventListener("click", () => {
  carritoContainer.classList.remove("cart-opened");
});

let modalCarrito = document.getElementById("cartProducts");

const dibujarCarrito = () => {
  let total = 0;
  let cantidadCarrito = 0;
  modalCarrito.className = "cart";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      cantidadCarrito = cantidadCarrito + producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details"> Precio: $ ${producto.precio}</div>
        <div class="product-details"> Subtotal: $ ${
          producto.precio * producto.cantidad
        }</div>
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
    <button class= "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
    modalCarrito.appendChild(totalContainer);

    const contadorCarrito = document.getElementById("count__cart");
    contadorCarrito.innerHTML = cantidadCarrito;
    contadorCarrito.style.display = "inline-block";
  } else {
    modalCarrito.classList.remove("cart");

    const contadorCarrito = document.getElementById("count__cart");
    contadorCarrito.style.display = "none";
  }
};

let cart = [];
// si existen datos en el local storage hago la carga inicial desde local storage.
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  dibujarCarrito();
}

const agregarAlCarrito = (indiceDelArrayProducto) => {
  //findIndex devuelve el indice del elemento encontrado
  // si no encuentra nada devuelve menos 1 (-1)
  const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceDelArrayProducto].id;
  });
  if (indiceEncontradoCarrito === -1) {
    //agrego el producto
    const productoAgregar = productos[indiceDelArrayProducto];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
    actualizarStorage(cart);
    dibujarCarrito();
  } else {
    //incremento cantidad
    cart[indiceEncontradoCarrito].cantidad += 1;
    actualizarStorage(cart);
    dibujarCarrito();
  }
};

const removeProduct = (indice) => {
  cart.splice(indice, 1);
  actualizarStorage(cart);
  dibujarCarrito();
  if (cart.length === 0) {
    carritoContainer.classList.remove("cart-opened");
  }
};
const finalizarCompra = () => {
  const botonSeguirComprando = document.getElementById("close-cart");
  botonSeguirComprando.classList.add("removeButton");

  const total = document.getElementsByClassName("total")[0].innerHTML;
  modalCarrito.innerHTML = "";
  const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> YA CASI ES TUYA LA COMPRA, EL   ${total} </p></div>
  <div class="datos-cliente">
  <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la entrega</p>
  <button class= "btn btn-danger formulario" id="formulario" onClick="dibujarFormu()"> FORMULARIO </button>
  </div>`;
  modalCarrito.innerHTML = compraFinalizada;
};
const dibujarFormu = () => {
  modalCarrito.innerHTML = "";
  const formulario = `
  <h2> DATOS PARA EL ENVÍO </h2>
  <div class="contact__secction-container">
   <div class="row">
     <div class="contact__secction__item">
       <label>Nombre</label>
       <input type="text" id="nombre" placeholder="Nombre"  />
     </div>
     <div class="contact__secction__item">
       <label>E-mail</label>
       <input type="text" id="mail" placeholder="E-mail" />
     </div>
     <div class="contact__secction__item">
       <label>Telefono</label>
       <input type="text" id="telefono" placeholder="Telefono"  />
     </div>
     <div class="contact__secction__item">
       <label>Domicilio</label>
       <input type="text" id="domicilio" placeholder="Domicilio" />
     </div>
     <div class="contact-button">
       <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()" >Confirmar</button>
     </div>
   </div>
 </div>`;
  modalCarrito.innerHTML = formulario;
};

const mostrarMensaje = () => {
  const nombreCliente = document.getElementById("nombre").value;
  const domicilioCliente = document.getElementById("domicilio").value;
  modalCarrito.innerHTML = "";
  let mensaje = `<div class="mensaje-final"><p>Gracias ${nombreCliente} por comprar en Franchesca's Fast Food! en breve recibirasu pedido en ${domicilioCliente}</p>
  <button type="button" class="btn btn-danger envio" onClick="volverATienda()" >Volver a la tienda</button>
 
  </div>`;
  modalCarrito.innerHTML = mensaje;
};

const volverATienda = () => {
  carritoContainer.classList.remove("cart-opened");
  const contadorCarrito = document.getElementById("count__cart");
  contadorCarrito.style.display = "none";
  cart = [];
  actualizarStorage(cart);
  dibujarCarrito();
};

const actualizarStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
Swal.fire({
  title: 'bienvenidos a S.A - DESARROLLOS WEB',
  icon: 'info',
  html:
    'Puedes consultar enviando un mail, ' +
    '<a href="mailto:sa.dessrrollosweb@gmail.com">sa.desarrollosweb@gmail.com</a> ' +
    'y te responderemos a la brevedad',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Gracias!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})