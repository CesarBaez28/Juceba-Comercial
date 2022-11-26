const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //Acceder a todos los inputs del formulario.

//Expresiones reguales para las validaciones
const expresiones = {
  //8 a 100 carácteres. No carácteres consecutivo. 1 minúscula. 1 mayúscula. 1 número. 1 Caracter especial.
  password: /^(?!.*(.)\1{1})(?=(.*[\d]){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[@#$%!]){1,})(?:[\da-zA-Z@#$%!]){8,100}$/
}

//Objeto para verificar que los campos estén correctos. 
//Por defecto, están en falso, es decir, incorrectos.
const campos = {
  password: false,
  confirm_password: false
}

//Validar cada uno de los campos del formulario
const validarFormulario = async (e) => {
  const inputsValidations = {
    'password': () => { validarCampo(expresiones.password, e.target, 'password'); validarPassword()},
    'confirm_password': () => { validarCampo(expresiones.password, e.target, 'confirm_password'); validarPassword()}
  }

  const validate = inputsValidations[e.target.name]
    ? inputsValidations[e.target.name]()
    : null
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

//Eventos para validar los formularios
inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario); //Ejecuta cuando se levanta una tecla
  input.addEventListener('blur', validarFormulario); //Ejecuta cuando se da un clic fuera del campo
})

//Validar que todos los campos estén correctos antes de enviar los datos
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); //Previene el submit

  if (campos.password && campos.confirm_password) {
    HTMLFormElement.prototype.submit.call(formulario); //Envío el formulario
  }

});
