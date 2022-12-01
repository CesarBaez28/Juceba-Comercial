const nombre = document.getElementById('name');
const telefono = document.getElementById('telefono');
const sector = document.getElementById('sector');
const calleYNumero = document.getElementById('calleYNumero');
const clientStatus = document.getElementById('ClientStatus');
const buttonsEdit = document.querySelectorAll('.button-edit');
const buttonNew = document.getElementById('button-new');
let provincia = document.getElementById('provincia');
let municipio = document.getElementById('municipio');
let codigoCliente;

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

let clients;
async function editSupplier(button) {
  try {
    codigoCliente = button.currentTarget.value;
    let respuesta = await fetch('/clients/getClients?client=' + codigoCliente + '');
    clients = await respuesta.json();

    if (clients.length) {

      //Obtengo los municipios de la provincia del suplidor y los muestro
      respuesta = await fetch('/authentication/getMunicipios?parent_value=' + clients[0][0].codigo_provincia + '');
      municipios = await respuesta.json();
      let html = ""
      for (const element of municipios) {
        html += '<option value="' + element.codigo + '">' + element.municipio + '</option>';
      }
      municipio.innerHTML = html;

      nombre.value = clients[0][0].nombre;
      telefono.value = clients[0][0].telefono;
      sector.value = clients[0][0].sector;
      calleYNumero.value = clients[0][0].calle_y_numero;
      provincia.value = clients[0][0].codigo_provincia;
      municipio.value = clients[0][0].codigo_municipio;

      if (clients[0][0].estado === 'Activo') {
        clientStatus.value = 1;
      }
      else {
        clientStatus.value = 0;
      }
    }
    //Reseteo las validaciones del formulario
    //Ejecuto esta función del archivo clientValidations.js
    resetValidations();
  } catch (error) {
    console.log(error);
  }
}

