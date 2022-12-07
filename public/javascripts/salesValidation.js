const cantidad = document.getElementById('cantidad');
const monto = document.getElementById('monto');
const clientes = document.getElementById('clientes');
const productos = document.getElementById('productos');
const button = document.getElementById('button');
const resultArea = document.getElementById('resultArea');
let totalAmountInput = document.getElementById('totalAmount');
let buttonRegister = document.getElementById('button-register');
let totalAmout = 0;
let products = {};

button.addEventListener('click', addSale);
productos.addEventListener('change', getPrice);

const templateElement = (product, cantidad, photo) => {
  return (
    `<div class="card-result-container">
        <div class="card-area-photo">
          ${photo}
        </div>
        <header class="card-result-header">
          <input name="nameProduct" value="${product.nombre}" class="input-result-area name-material" type="text" readonly>
          <p class="card-amount">Cantidad:
            <input name="salesAmount" id="amount-result-area" value="${cantidad}" class="input-result-area" type="number" readonly>
          </p>
          <div class="card-item">
            <p class="card-price-text">$<input name="salesPrice" value="${product.precio}" id="price-result-area" class="input-result-area entrie-price" type="number" readonly></p>
            <div class="card-result-option-container">
              <div class="card-result-options">
                <button class="button button-delete" onclick="removeElement(event)">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Zm2-4h2V8H9Zm4 0h2V8h-2Z"></path></svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>`
  )
}

const templatePhoto = (url) => {
  if (url != '') {
    return (`<img src="images/products/${url}" alt="Foto del material">`)
  }
  return (`<img src="images/add-image.png" alt="Foto del material"> `)
}

//Añadir salida
async function addSale() {
  let c = parseFloat(cantidad.value);

  //Verifico los campos entén llenos, tengan un valor selecionado
  //, el campo cantidad sea entero y no se ingrese un producto repetido
  if (clientes.value && productos.value && monto.value && cantidad.value && Number.isInteger(c) && c > 0 && (!products[productos.options[productos.selectedIndex].text])) {
    let sale = document.createElement('article');
    sale.classList.add('card-result');
    sale.classList.add('col-12');
    sale.classList.add('col-md-6');
    sale.classList.add('col-lg-4');

    //Añado el nombre del producto a un objeto para evitar se ingresen productos repetidos
    products[productos.options[productos.selectedIndex].text] = productos.options[productos.selectedIndex].text;

    //Obtengo los datos de producto
    let producto = await getProduct();

    //Obtengo la foto del producto si tiene
    let photo = templatePhoto(producto[0][0].foto);

    //Añado el elemento
    sale.innerHTML = templateElement(producto[0][0], cantidad.value, photo);
    resultArea.appendChild(sale);

    //Actualizo la cantidad total
    totalAmout += Number(producto[0][0].precio * cantidad.value);
    totalAmountInput.value = totalAmout.toString();

    //Reseteo los campos cantidad y monto
    cantidad.value = '';
    monto.value = '';

    buttonRegister.classList.add('show-button');
  }
}

//Remover elemento
function removeElement (event)
{
  //Obtengo el elemento padrea
  let buttonContainer = event.currentTarget.parentElement;
  let optionsContainer = buttonContainer.parentElement;
  let cardItem = optionsContainer.parentElement;
  let card = cardItem.parentElement;
  let cardContainer = card.parentElement;
  let sale = cardContainer.parentElement;

  //Obtengo la cantidad y costo de la entrada para actualizar el costo total
  let cantidadContainer = card.children[1];
  let precioContainer = cardItem.children[0];
  totalAmout -= Number(cantidadContainer.children[0].value * precioContainer.children[0].value);
  totalAmountInput.value = totalAmout.toString();

  delete products[card.children[0].value]; //Borro el material de la lista
  sale.remove(); //Elimino el elemento

  //Verifico si no hay entradas para ocultar boton registrar
  let sales = document.querySelectorAll('#resultArea article');
  if(sales.length === 0){
    buttonRegister.classList.remove('show-button');
  }
}

//Obtener precio del producto para mostrarlo
async function getPrice() {
  let producto = await getProduct();
  (productos.value != '') ? monto.value = producto[0][0].precio : monto.value = ''
}

//Obtener datos del producto
const getProduct = async () => {
  try {
    if (productos.value != '') {
      const respuesta = await fetch('/sales/getProduct?product=' + productos.value + '');

      const data = await respuesta.json();

      if (data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.error(error);
  }
}