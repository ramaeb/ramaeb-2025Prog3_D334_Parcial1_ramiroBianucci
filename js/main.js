/*
---------------------
VARIABLES DEL DOM
-----------------------
*/
let carrito = [];
let htmlCarrito = "";

const nav = document.getElementById("nav");
const contenedorProductos = document.getElementById("contenedor-productos");
const barraBusqueda = document.getElementById("barra-busqueda");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const cantidadProductosTotal = document.getElementById("cantidad-total");
/*
    EVENT LISTENER
    PARA EL INPUT (Barra busqueda)
*/
barraBusqueda.addEventListener("input", filtrarProducto)





/*
    =======================================
    Ej 1
    Creo array de frutas para trabajar.
    =======================================
*/
const frutasLista = [
     {id:1, nombre:"Anana", precio: 50, ruta_img: "../img/anana.jpg"
     },
     {id:2, nombre:"Arandanos", precio: 130, ruta_img: "../img/arandano.jpg"
     },
     {id:3, nombre:"Banana", precio: 20, ruta_img: "../img/banana.jpg"
     },
     {id:4, nombre:"Frambuesa", precio: 100, ruta_img: "../img/frambuesa.png"
     },
     {id:5, nombre:"Frutilla", precio: 110, ruta_img: "../img/frutilla.jpg"
     },
     {id:6, nombre:"Kiwi", precio: 300, ruta_img: "../img/kiwi.jpg"
     },
     {id:7, nombre:"Mandarina", precio: 20, ruta_img: "../img/mandarina.jpg"
     },
     {id:8, nombre:"Manzana", precio: 15, ruta_img: "../img/manzana.jpg"
     },
     {id:9, nombre:"Naranja", precio: 10, ruta_img: "../img/naranja.jpg"
     }
     ,
     {id:10, nombre:"Pera", precio: 5, ruta_img: "../img/pera.jpg"
     },
     {id:11, nombre:"Pomelo amarillo", precio: 30, ruta_img: "../img/pomelo-amarillo.jpg"
     },
     {id:12, nombre:"Pomelo rojo", precio: 35, ruta_img: "../img/pomelo-rojo.jpg"
     },
     {id:13, nombre:"Sandia", precio: 600, ruta_img: "../img/sandia.jpg"
     } 
];

/*
    =======================================
    Ej 2
    Creo objeto alumno para trabajar
    con atributos DNI, NOMBRE Y APELLIDO.
    =======================================
*/


const alumno = {
  nombre: "Ramiro",
  apellido: "Bianucci",
  dni: "45226523"
};

//Funcion Recibe alumno por parametro e imprime nombre y apellido, tambien lo muestra en nav.
function imprimeNombreApellido(alumno){
    console.log(`Nombre: ${alumno.nombre} ${alumno.apellido}`);
    const nav = document.getElementById('nav');
    nav.textContent = `Nombre: ${alumno.nombre} ${alumno.apellido}`;
}




/*
    =======================================
    Ej 3
    Implementa una función que imprima en pantalla los productos (frutas) 
    del array de objetos. Agrega esta función dentro de init() .
    =======================================
*/


//Funcion Imprime frutas recibe ARRAY DE OBJETO FRUTAS
function imprimeFrutas(arrayFrutas){
    //declaro la insercion html VACIA
    let htmlProductos = "";
    arrayFrutas.forEach(fruta => {
        //Agrego Fruta por fruta en un string con estructura html 
        htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>${fruta.precio}$</p>
            <button onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `
    });
    //Hago la insercion HTML
    contenedorProductos.innerHTML = htmlProductos;
}




/*
    =======================================
   Ejercicio 4
    Implementar una función de filtro, que se dispare al escribir en un campo input, 
    filtrando los productos que coincidan con el campo de texto.
    =======================================
*/

//Funcion filtrar productos
function filtrarProducto()
{
    //pasa a lowercase la barra de busqueda para poder filtrar.
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    
    //Filtra por fruta, parseando a lowercase, y compara resultado entre frutas encontradas
    let productosFiltrados = frutasLista.filter(fruta => {return fruta.nombre.toLowerCase().includes(valorBusqueda)})

    /* Lógica para en vez de filtrar los libros, cambiar el orden 

    / let productosNoIncluidos = librosTienda.filter(libro => {
    /     return !libro.nombre.toLowerCase().includes(valorBusqueda)
    / })
    / productosNoIncluidos.forEach(element => {
    /     productosFiltrados.push(element)
      
    / });
    */
   
    //Imprime el array filtrado con la misma funcion que imprime en pantalla.
    imprimeFrutas(productosFiltrados);


    //COMANDOS TEST...
    console.log(barraBusqueda) 
    console.log(valorBusqueda)
    console.log(productosFiltrados)
}


/*
    =======================================
    Ejercicio 5
    1.Implementar la funcionalidad de carrito, esta debe estar asociada al boton de 
    cada elemento del carrito. El carrito debe mostrarse por console.log()
    2.Incorporar la funcion mostrarCarrito() asociada al boton de cada elemento del carrito 
    3.Incorporar la funcion eliminarProducto() . Este debe estar asociado al boton del carrito
    =======================================
*/

//

//Agrega al carrito y suma por cantidad de producto.
function agregarAlCarrito(idFruta){

    const producto = frutasLista.find(fruta => fruta.id === idFruta);
    if (!producto) return; //En el caso de que no encuentre 
    
    //
    const item = carrito.find(prod => prod.id === idFruta);
    if (item) {
        item.cantidad++; //Suma 1 por cada item agregado que YA ESTE en la lista(carrito)
    } else {
        //Caso contrario si no esta en el carrito 
        // Devuelve un objeto con el atributo CANTIDAD que va sumando
        carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        ruta_img: producto.ruta_img,
        cantidad: 1
        });
    }
    //guardamos y mostramos cambios
    mostrarCarrito();
    guardarCarrito();
}

//Mostrar carrito
function mostrarCarrito(){
    let contador = 0; //Contador de productos TOTALES
    let contadorPrecio = 0; //Contador precio
    //Voy armando estructura HTML
    htmlCarrito = "<ul>";
       carrito.forEach((producto, index) => {
        htmlCarrito += 
        `
        <li class="bloque-item">
        <p class="nombre-item">Producto: ${producto.nombre} - Precio: ${producto.precio}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        <p class="cantidad">Cantidad: ${producto.cantidad}</p>
        </li>   
        `;
        
        //Contador de productos TOTALES
        contador += producto.cantidad;
        //Contador precio
        contadorPrecio += producto.precio * producto.cantidad;
    })
    //Termino el html cerrando la etiqueta UL, y colocando el boton de vaciar carrito
    htmlCarrito += 
    `
        </ul>
        <div> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
            <p>Total: $${contadorPrecio}</p>
        </div>
    `;
    //Inserto el html
    contenedorCarrito.innerHTML = htmlCarrito;
    const cantidadProductosTotal = document.getElementById('cantidad-total');
    cantidadProductosTotal.textContent = `Cantidad Total Productos: ${contador}`;
}

//Elimina producto, cada click es UN producto menos, por lo cual
//Cuando llega a 0 se elimina dicho producto.
function eliminarProducto(idEliminar){
    const index = carrito.findIndex(p => p.id === idEliminar);
    if (index === -1) return;
    carrito[index].cantidad--;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
}

/*
    =======================================
   Ejercicio 6
    1 Almacena los productos del carrito en localStorage.
    2 Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan
        eliminado del carrito
    3 Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina
    =======================================
*/

//Guarda Carrito 
//Esta funcion la aplicamos cada vez que modificamos el carrito.
function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Carga el carrito, si hay una data guardada parsea el JSON para que se transforme en la variable
//del carrito. Si no, Setea el carrito en un array vacio.
function cargarCarrito(){
    const carritoGuardado = localStorage.getItem("carrito");
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado);
    }else{
        carrito = [];
    }
}


/*
    =======================================
    Ejercicio 7
    •Implementa un contador de números de productos del carrito. Si hay 0 productos se eliminan del carrito.
    • Actualiza la cantidad de productos en el header en la parte de Carrito: 0 productos
    • Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)
    =======================================
*/

function eliminarProductoCantidad(idProducto){
    const index = carrito.findIndex(p => p.id === idProducto);
    if (index === -1) return;
    carrito[index].cantidad--;
    if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
    mostrarCarrito();
}





/*
    =======================================
    Ejercicio 9 
    Implementa la funcionalidad para Vaciar carrito. 
    Crea un botón en la sección carrito que vacíe todo el carrito.
    =======================================
*/
//Vacia el carrito, mucha ciencia no tiene.
function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    guardarCarrito();
}




function init(){
    cargarCarrito();
    imprimeNombreApellido(alumno);
    imprimeFrutas(frutasLista);
    filtrarProducto();
    mostrarCarrito();
}

init();



 