const nombre = document.getElementById('name');
const telefono = document.getElementById('telefono');
const sector = document.getElementById('sector');
const calleYNumero = document.getElementById('calleYNumero');
const supplierStatus = document.getElementById('SupplierStatus');
const buttonsEdit = document.querySelectorAll('.button-edit');
const buttonNew = document.getElementById('button-new');
let provincia = document.getElementById('provincia');
let municipio = document.getElementById('municipio');
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
  provincia.value = '';
  municipio.value = '';
  //Reseteo las validaciones del formulario
  //Ejecuto esta función del archivo clientValidations.js
  resetValidations();
}

async function editSupplier(button) {
  let suppliers;
  let municipios;
  try {
    codigoSuplidor = button.currentTarget.value;
    let respuesta = await fetch('/suppliers/getSupplier?supplier=' + codigoSuplidor + '');
    suppliers = await respuesta.json();

    if (suppliers.length) {

      //Obtengo los municipios de la provincia del suplidor y los muestro
      respuesta = await fetch('/authentication/getMunicipios?parent_value=' + suppliers[0][0].codigo_provincia + '');
      municipios = await respuesta.json();
      let html = ""
      for (const element of municipios) {
        html += '<option value="' + element.codigo + '">' + element.municipio + '</option>';
      }
      municipio.innerHTML = html;

      nombre.value = suppliers[0][0].nombre;
      telefono.value = suppliers[0][0].telefono;
      sector.value = suppliers[0][0].sector;
      calleYNumero.value = suppliers[0][0].calle_y_numero;
      provincia.value = suppliers[0][0].codigo_provincia;
      municipio.value = suppliers[0][0].codigo_municipio;

      if (suppliers[0][0].estado === 'Activo') {
        supplierStatus.value = 1;
      }
      else {
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

