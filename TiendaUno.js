let carrito = [];
const DOMitems = document.querySelector('#tienda-items');
const DOMcarrito = document.querySelector('#items-carrito');
const DOMtotal = document.querySelector('#total-precio');
const DOMdescuentos = document.querySelector('#tus-tickets');

function aplicarDescuento(evento){
  carrito.push({nombre: evento.target.getAttribute('lista'),valor: evento.target.getAttribute('valor'),descuento: evento.target.getAttribute('name')});
  
  const index = descuentos.findLastIndex((element) => {
    return element.getAttribute('name') === evento.target.getAttribute('name');
  });
  if(descuentos[index].getAttribute('cantidad') == 1){
    descuentos.splice(index,1);
  } else{
    actual = descuentos[index].getAttribute('cantidad') - 1 ;
    descuentos[index].setAttribute('cantidad',  actual);
  }
  const items = [].slice.call(document.getElementsByClassName('item'));
  item = items.find((i) => i.childNodes[2].textContent == evento.target.getAttribute('lista'));
  item.childNodes[6].textContent= '';
  visualizarDescuentos();
  imprimirItems();
}
function resetearCajon(){
  const activo = document.getElementsByClassName('cajon-activo');
  if(activo[0] !== undefined) {
    activo[0].textContent = '';
    activo[0].classList.remove('cajon-activo');
  }
}
function tienePrecioMenor(a,b){
  return (true);
}
function mostrarCupones(evento){
  resetearCajon();
  const items = [].slice.call(document.getElementsByClassName('item'));
  
  item = items.find((i) => i.childNodes[2].textContent == evento.target.getAttribute('lista'));
  item.childNodes[6].textContent= '';
  item.childNodes[6].classList.add('cajon-activo');
  const def = document.createElement('button');
  def.textContent = `pago total`;
  def.setAttribute('lista', item.childNodes[2].textContent);
  def.addEventListener('click', agregarCarrito);
  item.childNodes[6].append(def);
  
  descuentos.forEach((descuento) => {
    if(descuento.getAttribute('id') != 2){
      if(descuento.getAttribute('id') == 1){
  	let baseItemPrecio = baseDatos.find((i) => i.nombre == evento.target.getAttribute('lista'));
  	let maximo = parseInt(evento.target.getAttributte('maximo'));
  	if(baseItemPrecio <= maximo){
  	  const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name'));
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
  	}
      } else {
        const boton = document.createElement('button');
        boton.textContent = `${descuento.getAttribute('name')}`;
        boton.setAttribute('valor', descuento.getAttribute('valor'));
        boton.setAttribute('lista', item.childNodes[2].textContent);
        boton.setAttribute('name',descuento.getAttribute('name'));
        boton.addEventListener('click', aplicarDescuento);
        item.childNodes[6].append(boton);
      }
    } else {
      if(descuento.getAttribute('item') == item.childNodes[2].textContent){
        const boton = document.createElement('button');
        boton.textContent = `${descuento.getAttribute('name')}`;
        boton.setAttribute('valor', descuento.getAttribute('valor'));
        boton.setAttribute('lista', item.childNodes[2].textContent);
        boton.setAttribute('name',descuento.getAttribute('name'));
        boton.addEventListener('click', aplicarDescuento);
        item.childNodes[6].append(boton);
      }
      
    }
    
  });
    
}
function prepararItems(){
  baseDatos.forEach((item) =>{
    const miNodo = document.createElement('div');
    miNodo.classList.add('item');
  miNodo.setAttribute('style', '--accent:var(--'+ item.categoria+');');
  
    // Icono
    const miNodoImg = document.createElement('i');
  miNodoImg.classList = item.icon;
  
  // Categoria
    const miNodoCategory = document.createElement('div');
    miNodoCategory.classList.add('category-item');
    miNodoCategory.textContent = item.categoria;
  
    // Titulo
    const miNodoTitle = document.createElement('div');
    miNodoTitle.classList.add('title-item');
    miNodoTitle.textContent = item.nombre;
  

  // Descripcion
  const miNodoD = document.createElement('div');
    miNodoD.classList.add('descrp-item');
    miNodoD.textContent = item.descripcion;
  
    // Precio
    const miNodoPrecio = document.createElement('div');
    miNodoPrecio.classList.add('item-precio');
    miNodoPrecio.textContent = `${item.precio} puntos`;
    
    // Boton 
    /*const miNodoBoton = document.createElement('button');
    miNodoBoton.textContent = '+';
    miNodoBoton.setAttribute('lista', item.nombre);
    miNodoBoton.addEventListener('click', agregarCarrito);
    */
    // selección descuento
    const miNodoBoton = document.createElement('button');
    miNodoBoton.textContent = 'Seleccionar cupón';
    miNodoBoton.setAttribute('lista', item.nombre);
    miNodoBoton.addEventListener('click', mostrarCupones);
    
    const cajon = document.createElement('cajon');
  miNodo.appendChild(miNodoCategory);
    miNodo.appendChild(miNodoImg);
    miNodo.appendChild(miNodoTitle);
  
    miNodo.appendChild(miNodoD);
    miNodo.appendChild(miNodoPrecio);
    miNodo.appendChild(miNodoBoton);
    miNodo.appendChild(cajon);
    DOMitems.appendChild(miNodo);
  });
}
function calcularTotal(){
  return carrito.reduce((total,item) =>{
    const itemSelect = baseDatos.find((it) => {
      return it.nombre === item.nombre;
    });
    return (total+(itemSelect.precio*item.valor));
  },0).toFixed(2);
}
function restaurarCupon(tipo,itm){
  if(tipo != 'Pago Total'){
    const resultado = descuentos.find((descuento) => {return descuento.getAttribute('name') === tipo});
    
    if(resultado){
      let actual = resultado.getAttribute('cantidad');
      resultado.setAttribute('cantidad',++actual);
    } else{
      const ticket = document.createElement('ticket');
      const descuento = baseDescuentos.find((descuento) => descuento.name == tipo);
      ticket.setAttribute('name', descuento.name);
      ticket.setAttribute('valor', descuento.valor);
      ticket.setAttribute('id', descuento.id);
      ticket.setAttribute('cantidad',descuento.cantidad);
      if(ticket.getAttribute('id') == 2){
        ticket.setAttribute('item',itm);
      }
      descuentos.push(ticket);
    }
    visualizarDescuentos();
     
  }
    // sino agrego el cupon
}
function restar(evento){
  const index = carrito.findLastIndex((element) => {
    return element.nombre === evento.target.dataset.item;
  });
  restaurarCupon(carrito[index].descuento,evento.target.dataset.item);
  carrito.splice(index,1);
  imprimirItems();
}
function quitarBotonEnviar(){
  let boton= document.getElementById("BotonEnviar");
  if(carrito.length == 0){
      boton.setAttribute('style','display:none;');
  } else {
      boton.setAttribute('style', 'display:block;');
  }
}
function imprimirItems(){
  DOMcarrito.textContent = '';
  const carritoSinDuplicados = [...new Set(carrito)];
  
  carritoSinDuplicados.forEach((item) =>{
    const miNodo = document.createElement('div');
    const aux = baseDatos.find((it) => {
      return it.nombre === item.nombre;
    });
    const subtotal = item.valor * aux.precio;
    miNodo.textContent = `${item.nombre} con ${item.descuento} - subtotal: ${subtotal}`;

    const botonRestar = document.createElement('button');
    botonRestar.textContent = '-';
    botonRestar.dataset.item = item.nombre;
    botonRestar.dataset.descuento = item.descuento;
    botonRestar.addEventListener('click', restar);
    
    miNodo.appendChild(botonRestar);
    DOMcarrito.appendChild(miNodo);
  });
  quitarBotonEnviar();
  DOMtotal.textContent= calcularTotal();
  
}
function agregarCarrito(evento) {
  carrito.push({nombre: evento.target.getAttribute('lista'),valor: 1, descuento:'Pago Total'});
  
  const items = [].slice.call(document.getElementsByClassName('item'));
  const item = items.find((i) => i.childNodes[2].textContent == evento.target.getAttribute('lista'));
  item.childNodes[6].textContent= '';
  
  imprimirItems();
}
function ocultar(){
    cajon = document.getElementById("carrito");
    if(cajon.classList == "oculto"){
        cajon.classList.remove("oculto");
    } else {
        cajon.classList.add("oculto");
    }
}
 
let nombre;
cargarUsuario().promise().done(function(){
  prepararItems();
  quitarBotonEnviar();
  descuentos = [].slice.call(document.getElementsByTagName('ticket'));
  visualizarDescuentos();
});
