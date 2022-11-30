const nombre = document.getElementById('name');
const telefono = document.getElementById('telefono');
const sector = document.getElementById('sector');
const calleYNumero = document.getElementById('calleYNumero');
const clientStatus = document.getElementById('ClientStatus');
const buttonsEdit = document.querySelectorAll('.button-edit');
const buttonNew = document.getElementById('button-new');
let codigoCliente;

buttonsEdit.forEach((buttonEdit) => {
  buttonEdit.addEventListener('click', editUser);
});

buttonNew.addEventListener('click', createClient);

function createClient() {
  nombre.value = '';
  telefono.value = '';
  sector.value = '';
  calleYNumero.value = '';
  //Reseteo las validaciones del formulario
  //Ejecuto esta función del archivo clientValidations.js
  resetValidations(); 
}

let clients;
async function editUser(button) {
  try {
    codigoCliente = button.currentTarget.value;
    const respuesta = await fetch('/clients/getClients?client=' + codigoCliente + '');
    clients = await respuesta.json();

    if (clients.length) {
      nombre.value = clients[0][0].nombre;
      telefono.value = clients[0][0].telefono;
      sector.value = clients[0][0].sector;
      calleYNumero.value = clients[0][0].calle_y_numero;
      console.log(clients[0][0].estado )
      if(clients[0][0].estado === 'Activo')
      {
        clientStatus.value = 1;
      } 
      else
      {
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

