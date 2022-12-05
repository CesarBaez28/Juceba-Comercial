const cantidad = document.getElementById('cantidad');
const monto = document.getElementById('monto');
const suplidores = document.getElementById('suplidores');
const materiales = document.getElementById('materiales');
const button = document.getElementById('button');
const resultArea = document.getElementById('resultArea');
let buttonRegister = document.getElementById('button-register');
let totalAmountInput = document.getElementById('totalAmount');
let totalAmout = 0;
let materials = {};

button.addEventListener('click', addEntrie);
materiales.addEventListener('change', getPrice);

const templateElement = (material, cantidad, photo) => {
  return (
     `<div class="card-result-container">
        <div class="card-area-photo">
          ${photo}
        </div>
        <header class="card-result-header">
          <input name="nameMaterial" value="${material.nombre}" class="input-result-area name-material" type="text" readonly>
          <p class="card-amount">Cantidad:
            <input name="entrieAmount" id="amount-result-area" value="${cantidad}" class="input-result-area" type="number" readonly>
          </p>
          <div class="card-item">
            <p class="card-price-text">$<input name="entrieCost" value="${material.costo}" id="price-result-area" class="input-result-area entrie-price" type="number" readonly></p>
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
  if(url != '') {
    return (`<img src="images/materials/${url}" alt="Foto del material">`)
  }
  return (`<img src="images/add-image.png" alt="Foto del material"> `)
}

//Añadir elemento
async function addEntrie() {
  let c = parseFloat(cantidad.value);
  //Verifico los campos entén llenos, tengan un valor selecionado
  //, el campo cantidad sea entero y no se ingrese un material repetido
  if (suplidores.value && materiales.value && monto.value && cantidad.value && Number.isInteger(c) && c > 0 && (!materials[materiales.options[materiales.selectedIndex].text])) 
  {
    let entrie = document.createElement('article');
    entrie.classList.add('card-result');
    entrie.classList.add('col-12');
    entrie.classList.add('col-md-6');
    entrie.classList.add('col-lg-4');

    //Añado el nombre de material a un objeto para evitar ingrese materiales repetidos
    materials[materiales.options[materiales.selectedIndex].text] = materiales.options[materiales.selectedIndex].text;
    
    //Obtengos los datos del material
    let m = await material();

    //Obtengo la foto del material si tiene
    let photo = templatePhoto(m[0][0].foto);
    
    //Añado el elemento
    entrie.innerHTML = templateElement(m[0][0], cantidad.value, photo);
    resultArea.appendChild(entrie);

    //Actualizo la cantidad total
    totalAmout += Number(m[0][0].costo * cantidad.value);
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
  let entrie = cardContainer.parentElement;

  //Obtengo la cantidad y costo de la entrada para actualizar el costo total
  let cantidadContainer = card.children[1];
  let precioContainer = cardItem.children[0];
  totalAmout -= Number(cantidadContainer.children[0].value * precioContainer.children[0].value);
  totalAmountInput.value = totalAmout.toString();

  delete materials[card.children[0].value]; //Borro el material de la lista
  entrie.remove(); //Elimino el elemento

  //Verifico si no hay entradas para ocultar boton registrar
  let entries = document.querySelectorAll('#resultArea article');
  if(entries.length === 0){
    buttonRegister.classList.remove('show-button');
  }
}
 
//Obtener precio del material
async function getPrice (){
  let m = await material();
  (materiales.value != '') ? monto.value = m[0][0].costo : monto.value = ''
}

//Obtener datos del material
const material = async () => {
  try 
  {
    if(materiales.value != '') 
    {
      const respuesta = await fetch('/entries/getMaterial?material='+materiales.value+'');

      const data = await respuesta.json();

      if(data.length > 0)
      {
        return data;
      }
    }
  } catch (error) 
  {
    console.error(error);
  }
}