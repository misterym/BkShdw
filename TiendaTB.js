function aplicarDescuento(evento){
  // busco el item a que se le quiere aplicar el descuento.
  // Siempre estará en baseDatos.
  let aux = baseDatos.find((it) => {
    return it.nombre === evento.target.getAttribute('lista');
  });

  // lo agrego al carrtio
  carrito.push({nombre: evento.target.getAttribute('lista'),valor: evento.target.getAttribute('valor'),descuento: evento.target.getAttribute('name'), maximo: evento.target.getAttribute('maximo'), precio: aux.precio, tipo:"galeones"});
  
  const index = descuentos.findLastIndex((element) => {return element.getAttribute('name') === evento.target.getAttribute('name');});
  
  // actualizo lista de descuentos disponibles
  if(descuentos[index].getAttribute('cantidad') == 1){
    descuentos.splice(index,1);
  } else{
    actual = descuentos[index].getAttribute('cantidad') - 1 ;
    descuentos[index].setAttribute('cantidad',  actual);
  }
  
  // terminar de visualizar en el carrito y sacar el cajón de descuentos en el item.
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

function mostrarCupones(evento){
  resetearCajon();
  const items = [].slice.call(document.getElementsByClassName('item'));
  
  // Busco el item y le agrego el cajón de cupones.
  item = items.find((i) => i.childNodes[2].textContent == evento.target.getAttribute('lista'));
  item.childNodes[6].textContent= '';
  item.childNodes[6].classList.add('cajon-activo');

  const def = document.createElement('button');
  def.textContent = `pago total`;
  def.setAttribute('lista', item.childNodes[2].textContent);
  def.addEventListener('click', agregarCarrito);
  item.childNodes[6].append(def);
  
  descuentos.forEach((descuento) => {
    switch(descuento.getAttribute('id')){
      case '1':
        if(parseInt(descuento.getAttribute('maximo')) >= parseInt(item.childNodes[4].textContent.split(" ")[0])){
          const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name'));
          boton.setAttribute('maximo',descuento.getAttribute('maximo'));
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
        }
      break;
      case '2':
        if(descuento.getAttribute('item') === item.childNodes[2].textContent){
          const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name'));
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
        }
      break;
      case '3':
        if(item.childNodes[2].textContent.includes(descuento.getAttribute('item'))){
          const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name'));
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
        }
      break;
      case '4':
        if(item.childNodes[2].textContent.includes(descuento.getAttribute('item'))){
          const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name') );
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
        }
      break;
      case '5':
        if(!(item.childNodes[2].textContent.includes(descuento.getAttribute('noincluye')))){
          const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name') );
          boton.setAttribute('noincluye', descuento.getAttribute('noincluye'));
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
        }
      break;
      case '6':
        if(descuento.getAttribute('item').toLowerCase().split(',').includes(item.childNodes[2].textContent.toLowerCase())){
          const boton = document.createElement('button');
          boton.textContent = `${descuento.getAttribute('name')}`;
          boton.setAttribute('valor', descuento.getAttribute('valor'));
          boton.setAttribute('lista', item.childNodes[2].textContent);
          boton.setAttribute('name',descuento.getAttribute('name') );
          boton.setAttribute('item', descuento.getAttribute('item'));
          boton.addEventListener('click', aplicarDescuento);
          item.childNodes[6].append(boton);
        }
      break
      default:
        const boton = document.createElement('button');
        boton.textContent = `${descuento.getAttribute('name')}`;
        boton.setAttribute('valor', descuento.getAttribute('valor'));
        boton.setAttribute('lista', item.childNodes[2].textContent);
        boton.setAttribute('name',descuento.getAttribute('name'));
        boton.addEventListener('click', aplicarDescuento);
        item.childNodes[6].append(boton);
      }
    });
}

function prepararItems(){
  // baseDatos - Items con descuento.
  let cajonp = document.createElement('div');
  cajonp.classList.add('seccion');
  let title = document.createElement('span');
  title.textContent = 'Tienda de Galeones';
  cajonp.appendChild(title);
  let contenido = document.createElement('div');
  contenido.classList.add('contenido');
  
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
    contenido.appendChild(miNodo);
  });

  cajonp.appendChild(contenido);
  DOMitems.appendChild(cajonp);
  
  // baseExperiencias - Items sin descuento.
  let cajone = document.createElement('div');
  cajone.classList.add('seccion');
  title = document.createElement('span');
  title.textContent = 'Tienda de experiencias';
  cajone.appendChild(title);
  let contenidoe = document.createElement('div');
  contenidoe.classList.add('contenido');
  
  baseExperiencias.forEach((item) =>{
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
    const miNodoBoton = document.createElement('button');
    miNodoBoton.textContent = 'Agregar al carrito';
    miNodoBoton.setAttribute('lista', item.nombre);
    miNodoBoton.addEventListener('click', agregarCarritoD);
    
    const cajon = document.createElement('cajon');
    miNodo.appendChild(miNodoCategory);
    miNodo.appendChild(miNodoImg);
    miNodo.appendChild(miNodoTitle);
  
    miNodo.appendChild(miNodoD);
    miNodo.appendChild(miNodoPrecio);
    miNodo.appendChild(miNodoBoton);
    miNodo.appendChild(cajon);
    contenidoe.appendChild(miNodo);
  });

  cajone.appendChild(contenidoe);
  DOMitems.appendChild(cajone);
}

function calcularTotal(cond){
  return carrito.reduce((total,item) =>{
    if(item.tipo == cond){
      return (total+(item.precio*item.valor));
    }
    else {
      return total;
    }
    ;
  },0).toFixed(2);
}

function restaurarCupon(tipo,itm,max,noincluye){
  if(tipo != 'Pago Total'){
    const resultado = descuentos.find((descuento) => {return descuento.getAttribute('name') === tipo});
    
    if(resultado){
      let actual = resultado.getAttribute('cantidad');
      resultado.setAttribute('cantidad',++actual);
    } else {
      const ticket = document.createElement('ticket');
      const descuento = baseDescuentos.find((descuento) => descuento.name == tipo);
      ticket.setAttribute('name', descuento.name);
      ticket.setAttribute('valor', descuento.valor);
      ticket.setAttribute('id', descuento.id);
      ticket.setAttribute('cantidad',descuento.cantidad);
      if(ticket.getAttribute('id') == 2 || ticket.getAttribute('id') == 3,ticket.getAttribute('id') == 6){
        ticket.setAttribute('item',itm);
      }
      if(ticket.getAttribute('id') == 4){
        ticket.setAttribute('item',descuento.name.split(" ")[1]);
      }
      if(ticket.getAttribute('id') == 5){
        ticket.setAttribute('noincluye',noincluye);
      }
      if(ticket.getAttribute('id') == 1){
        ticket.setAttribute('maximo',max);
      }
      descuentos.push(ticket);
    }
    visualizarDescuentos();
  }
}

function restar(evento){
  const index = carrito.findLastIndex((element) => {return element.nombre === evento.target.dataset.item;});
  restaurarCupon(carrito[index].descuento,evento.target.dataset.item, evento.target.dataset.maximo,evento.target.dataset.noincluye);
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

    const subtotal = item.valor * item.precio;
    miNodo.textContent = `${item.nombre} con ${item.descuento} - subtotal: ${subtotal}`;

    const botonRestar = document.createElement('button');
    botonRestar.textContent = 'x';
    botonRestar.dataset.item = item.nombre;
    botonRestar.dataset.descuento = item.descuento;
    botonRestar.dataset.maximo = item.maximo;
    botonRestar.addEventListener('click', restar);
    
    miNodo.appendChild(botonRestar);
    DOMcarrito.appendChild(miNodo);
  });

  quitarBotonEnviar();
  DOMtotalGaleones.textContent= calcularTotal("galeones");
  DOMtotalExperiencia.textContent= calcularTotal("experiencia");
}

// función para los items de experiencia.
function agregarCarritoD(evento) {
  let aux = baseExperiencias.find((it) => {return it.nombre === evento.target.getAttribute('lista');});
  carrito.push({nombre: evento.target.getAttribute('lista'),valor: 1, descuento:'Pago Total', maximo:0, precio: aux.precio, tipo:'experiencia'});
  imprimirItems();
}

// funcion para los items con cupones.
function agregarCarrito(evento) {
  let aux = baseDatos.find((it) => {return it.nombre === evento.target.getAttribute('lista');});
  carrito.push({nombre: evento.target.getAttribute('lista'),valor: 1, descuento:'Pago Total', maximo:0, precio: aux.precio, tipo:'galeones'});
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
