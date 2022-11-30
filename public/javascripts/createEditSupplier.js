const nombre = document.getElementById('name');
const telefono = document.getElementById('telefono');
const sector = document.getElementById('sector');
const calleYNumero = document.getElementById('calleYNumero');
const supplierStatus = document.getElementById('SupplierStatus');
const buttonsEdit = document.querySelectorAll('.button-edit');
const buttonNew = document.getElementById('button-new');
let codigoSuplidor;

buttonsEdit.forEach((buttonEdit) => {
  buttonEdit.addEventListener('click', editSupplier);
});

buttonNew.addEventListener('click', createSupplier);

function createSupplier() {
  nombre.value = '';
  telefono.value = '';
  sector.value = '';
  calleYNumero.value = '';
  //Reseteo las validaciones del formulario
  //Ejecuto esta función del archivo clientValidations.js
  resetValidations(); 
}

let suppliers;
async function editSupplier(button) {
  try {
    codigoSuplidor = button.currentTarget.value;
    const respuesta = await fetch('/suppliers/getSupplier?supplier=' + codigoSuplidor + '');
    suppliers = await respuesta.json();

    if (suppliers.length) {
      nombre.value = suppliers[0][0].nombre;
      telefono.value = suppliers[0][0].telefono;
      sector.value = suppliers[0][0].sector;
      calleYNumero.value = suppliers[0][0].calle_y_numero;
      console.log(suppliers[0][0].estado )
      if(suppliers[0][0].estado === 'Activo')
      {
        supplierStatus.value = 1;
      } 
      else
      {
        supplierStatus.value = 0;
      }
    }
    //Reseteo las validaciones del formulario
    //Ejecuto esta función del archivo clientValidations.js
    resetValidations(); 
  } catch (error) {
    console.log(error);
  }
}

