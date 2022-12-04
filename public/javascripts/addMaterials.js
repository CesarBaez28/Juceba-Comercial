const table = document.getElementById('table');
const tbody = document.getElementById('tbody');
const material = document.getElementById('material');
const cantidad = document.getElementById('cantidad')
const buttonAddMaterial = document.getElementById('addMaterial');
buttonAddMaterial.addEventListener('click', addElement);
let materiales = {};

const templateElement = (material, cantidad) => {
  return (`
      <td>
        <div class="container-input">
          <input class="input-table" name="materiales" value="${material}" type="text" readonly>
        </div>
      </td>
      <td>
        <div class="container-input">
          <input class="input-table" name="cantidadMaterial" value="${cantidad}" type="text" readonly>
        </div>
      </td>
      <td>
        <div class="buttons-container buttons-table">
          <button type="button" class="button" onclick="removeElement(event)">
            <span class="button-delete-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor">
                <path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Zm2-4h2V8H9Zm4 0h2V8h-2Z"/>
              </svg>
            </span>
          </button>
        </div>
      </td>
  `);
}

//Verifico si estoy en la la vista Editar producto 
if(document.title === 'Editar producto')
{
  //Obtengo la lista de materiales (si hay) y la almaceno en el obejeto materiales
  //para evitar que ingresen esos materiales repetidos
  let m = document.querySelectorAll('tbody input[type='+'text'+']');
  if(m.length > 0 )
  {
    table.classList.remove('table');
    for (const material of m) {
      materiales[material.value] = material.value  
    }
  }
}

function addElement (){
  if(material.value && cantidad.value)
  {
    //Compruebo la cantidad sea entera y mayor que cero y 
    // que no se ingrese un material repetido
    let number = parseFloat(cantidad.value);
    if(Number.isInteger(number) && number > 0 && (!materiales[material.options[material.selectedIndex].text]))
    {
      materiales[material.options[material.selectedIndex].text] = material.options[material.selectedIndex].text;
      table.classList.remove('table');
      let tr = document.createElement('tr');
      tr.innerHTML = templateElement(material.options[material.selectedIndex].text, cantidad.value);
      cantidad.value = '';
      tbody.appendChild(tr);
    }
  }
} 

function removeElement (event) {
  let buttonsContainer = event.currentTarget.parentElement;
  let td = buttonsContainer.parentElement;

  let tdMaterial = td.parentNode.children[0];
  let divMaterial = tdMaterial.children[0];
  let inputMaterial = divMaterial.children[0];
  delete materiales[inputMaterial.value]; //Borro el material de la lista

  td.parentNode.remove(); //Elimino la fila
  
  let rows = document.querySelectorAll('#tbody tr')
  if(rows.length === 0) 
  {
    table.classList.add('table'); 
  }
}