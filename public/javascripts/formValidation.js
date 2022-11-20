const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //Acceder a todos los inputs del formulario.
let usuarioRepetido = false; // Se usa para validar si se ingresa un nombre de usuario repetido.
let empresaRepetida = false; // Se usa para validar si se ingresa un nombre de empresa repetido.

//Expresiones reguales para las validaciones
const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, números, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  calle_numero: /^[a-zA-Z0-9\s#\_\-]{4,100}$/, //Letras, números, guion, guion bajo y #.

  //8 a 100 carácteres. No carácteres consecutivo. 1 minúscula. 1 mayúscula. 1 número. 1 Caracter especial.
  password: /^(?!.*(.)\1{1})(?=(.*[\d]){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[@#$%!]){1,})(?:[\da-zA-Z@#$%!]){8,100}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{10,14}$/ // 10 a 14 numeros.
}

//Objeto para verificar que los campos estén correctos. 
//Por defecto, están en falso, es decir, incorrectos.
const campos = {
  name: false,
  username: false,
  telefono: false,
  email: false,
  confirm_email: false,
  password: false,
  confirm_password: false,
  nameCompany: false,
  emailCompany: false,
  telefonoCompany: false,
  sector: false,
  calleYNumero: false
}

//Validar cada uno de los campos del formulario
const validarFormulario = async (e) => {
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.nombre, e.target, 'name');
      break;
    case "userName":
      await validarUsuarioRepetido();
      validarCampo(expresiones.usuario, e.target, 'username');
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, 'telefono');
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, 'email');
      validarmail();
      break;
    case "confirm_email":
      validarCampo(expresiones.correo, e.target, 'confirm_email');
      validarmail();
      break;
    case "password":
      validarCampo(expresiones.password, e.target, 'password');
      validarPassword();
      break;
    case "confirm_password":
      validarCampo(expresiones.password, e.target, 'confirm_password');
      validarPassword();
      break;
    case "nameCompany":
      await validarEmpresaRepetida();
      validarCampo(expresiones.nombre, e.target, 'nameCompany');
      break;
    case "emailCompany":
      validarCampo(expresiones.correo, e.target, 'emailCompany');
      break;
    case "telefonoCompany":
      validarCampo(expresiones.telefono, e.target, 'telefonoCompany');
      break;
    case "sector":
      validarCampo(expresiones.nombre, e.target, 'sector');
      break;
    case "calle_y_numero":
      validarCampo(expresiones.calle_numero, e.target, 'calleYNumero');
      break;
  }
}

//Valida si un campo cumple con los requisitos
const validarCampo = (expresion, input, campo) => {
  let icon = document.querySelector(`#group-${campo} span`);
  if (expresion.test(input.value)) {
    icon.removeChild(icon.firstChild);
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="m8.938 13 4.958-4.938L12.833 7l-3.895 3.875-1.771-1.75-1.063 1.063ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById(`group-${campo}`).classList.remove('group-incorrect');
    document.getElementById(`group-${campo}`).classList.add('group-correct');
    document.querySelector(`#group-${campo} p`).classList.remove('input-error');
    campos[campo] = true;
  } else {
    icon.removeChild(icon.firstChild);
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById(`group-${campo}`).classList.add('group-incorrect');
    document.getElementById(`group-${campo}`).classList.remove('group-correct');
    document.querySelector(`#group-${campo} p`).classList.add('input-error');
    campos[campo] = false;
  }

  //Verifico usuario repetido
  if(usuarioRepetido){
    document.querySelector('#group-username span').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById('group-username').classList.add('group-incorrect');
    document.getElementById('group-username').classList.remove('group-correct');
    document.querySelector('#group-username p').classList.add('input-error');
    document.querySelector(`#group-username p`).innerHTML = 'Este usuario ya existe';
    campos['username'] = false;
  } else {
    document.querySelector(`#group-username p`).innerHTML = 'El usuario tiene que ser de 4 a 16 dígitos y solo puede contener números, letras y guion bajo.';
  }

  //Verifico nombre de empresa repetida
  if (empresaRepetida) {
    document.querySelector('#group-nameCompany span').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById('group-nameCompany').classList.add('group-incorrect');
    document.getElementById('group-nameCompany').classList.remove('group-correct');
    document.querySelector('#group-nameCompany p').classList.add('input-error');
    document.querySelector(`#group-nameCompany p`).innerHTML = 'Este nombre de compañía ya existe';
    campos['nameCompany'] = false;
  } else {
    document.querySelector(`#group-nameCompany p`).innerHTML = 'El nombre de la empresa tiene que ser de 4 a 16 dígitos y solo puede contener números, letras y guion bajo.';
  }
}

//Valida que las contraseñas sean iguales
const validarPassword = () => {
  const password = document.getElementById('password');
  const confirm_password = document.getElementById('confirm_password');
  if (password.value === confirm_password.value) {
    document.querySelector('#group-confirm_password span').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="m8.938 13 4.958-4.938L12.833 7l-3.895 3.875-1.771-1.75-1.063 1.063ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById('group-confirm_password').classList.remove('group-incorrect');
    document.getElementById('group-confirm_password').classList.add('group-correct');
    document.querySelector('#group-confirm_password p').classList.remove('input-error');
    campos['confirm_password'] = true;
  } else {
    document.querySelector('#group-confirm_password span').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById('group-confirm_password').classList.add('group-incorrect');
    document.getElementById('group-confirm_password').classList.remove('group-correct');
    document.querySelector('#group-confirm_password p').classList.add('input-error');
    campos['confirm_password'] = false;
  }
}

//Validar que los correos electrónicos sean iguales
const validarmail = () => {
  const email = document.getElementById('email');
  const confirm_email = document.getElementById('confirm_email');
  if (email.value === confirm_email.value) {
    document.querySelector('#group-confirm_email span').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="m8.938 13 4.958-4.938L12.833 7l-3.895 3.875-1.771-1.75-1.063 1.063ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById('group-confirm_email').classList.remove('group-incorrect');
    document.getElementById('group-confirm_email').classList.add('group-correct');
    document.querySelector('#group-confirm_email p').classList.remove('input-error');
    campos['confirm_email'] = true;
  } else {
    document.querySelector('#group-confirm_email span').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById('group-confirm_email').classList.add('group-incorrect');
    document.getElementById('group-confirm_email').classList.remove('group-correct');
    document.querySelector('#group-confirm_email p').classList.add('input-error');
    campos['confirm_email'] = false;
  }
}

//Verifico si el nombre de usuario ingresado ya existe
const validarUsuarioRepetido = async () =>{
  const username = document.getElementById('userName');
  try {
    const respuesta  = await fetch('/authentication/getUser?user='+username.value+'');
    const usuario = await respuesta.json();

    if(usuario.length > 0){
      usuarioRepetido = true;
    } else {
      usuarioRepetido = false;
    }

  } catch (error) {
    console.error(error);
  }
}

//Verifico si el nombre de la empresa ya existe
const validarEmpresaRepetida = async () => {
  const empresa = document.getElementById('nameCompany');
  try {
    const respuesta = await fetch('/authentication/getCompany?company='+empresa.value+'');
    const company = await respuesta.json();

    if (company.length > 0) {
      empresaRepetida = true;
    } else {
      empresaRepetida = false; 
    }

  } catch (error) {
    console.error();
  }
}

//Eventos para validar los formularios
inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario); //Ejecuta cuando se levanta una tecla
  input.addEventListener('blur', validarFormulario); //Ejecuta cuando se da un clic fuera del campo
})

//Validar que todos los campos estén correctos antes de enviar los datos
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); //Previene el submit

  if (campos.username && campos.telefonoCompany && campos.telefono && campos.sector && campos.password && campos.nameCompany && campos.name && campos.emailCompany && campos.email && campos.confirm_password && campos.confirm_email && campos.calleYNumero) {
    HTMLFormElement.prototype.submit.call(formulario); //Envío el formulario
  }

});


