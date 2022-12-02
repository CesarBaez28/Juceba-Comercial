const buttonFile = document.getElementById('buttonFile');
const inputFile = document.getElementById('file');
const formularioPhoto = document.getElementById('formPhoto');

buttonFile.addEventListener('click', selectPhoto);
inputFile.addEventListener('change', uploadPhoto);

//Activa el evento click del inputFile para seleccionar la foto
function selectPhoto(){
  inputFile.click();
}

//Luego de seleccionada la foto, envía el formulario
function uploadPhoto () {
  HTMLFormElement.prototype.submit.call(formularioPhoto); //Envío el formulario
}

