const buttonFile = document.getElementById('buttonFile');
const inputFile = document.getElementById('file');
const svgCamera = document.getElementById('svgCamera');
const photoContainer = document.getElementById('photo-container');

buttonFile.addEventListener('click', selectPhoto);
inputFile.addEventListener('change', visualizePhoto);

//Activa el evento click del inputFile para seleccionar la foto
function selectPhoto(e){
  inputFile.click();
}

//Visualizar foto seleccionada
function visualizePhoto (){
  const files = inputFile.files; //Guardo el archivo
  const firstFile = files[0]; //Selecciono la primera imagen
  const objectURL = URL.createObjectURL(firstFile); 
  svgCamera.style.display = "none"; //Quito el icono por defecto.

  let imgs = document.querySelectorAll('#photo-container img'); 
  let img

  //Verifico si ya existe un elemento img
  if(imgs.length === 0 ){
    img  = document.createElement('img');
    img.src = objectURL;
    img.classList.add('image-container');
    img.id = 'image';
    photoContainer.appendChild(img);
  }
  else
  {
    document.getElementById('image').src = objectURL;
  }
}