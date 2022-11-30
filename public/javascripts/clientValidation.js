const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //Acceder a todos los inputs del formulario.
let campos;

//Expresiones reguales para las validaciones
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  calle_numero: /^[a-zA-ZÀ-ÿ0-9\s#\_\-]{4,100}$/, //Letras, números, guion, acentos, guion bajo y #.
  telefono: /^\d{10,14}$/ // 10 a 14 numeros.
}

function camposEstados() {
  //Objeto para verificar que los campos estén correctos. 
  //Cambio los estados por defecto de true a false dependiendo si es para crear o editar un cliente 
  if (document.title === 'Editar cliente') { // Vista editar Cliente
    campos = {
      name: true,
      telefono: true,
      sector: true,
      calleYNumero: true
    }
  }
  else if (document.title === 'Clientes')//Vista clientes
  {
    let dialog_title = document.getElementById("ui-dialog-title");
    if (dialog_title.textContent === 'Editar cliente') {
      campos = {
        name: true,
        telefono: true,
        sector: true,
        calleYNumero: true
      }
    }
    else {
      campos = {
        name: false,
        telefono: false,
        sector: false,
        calleYNumero: false
      }
    }
  }
  else { //Vista crear Cliente
    campos = {
      name: false,
      telefono: false,
      sector: false,
      calleYNumero: false
    }
  }
}

camposEstados();

//Validar cada uno de los campos del formulario
const validarFormulario = async (e) => {
  const inputsValidations = {
    'name': () => { validarCampo(expresiones.nombre, e.target, 'name') },
    'telefono': () => { validarCampo(expresiones.telefono, e.target, 'telefono') },
    'sector': () => { validarCampo(expresiones.nombre, e.target, 'sector') },
    'calle_y_numero': () => { validarCampo(expresiones.calle_numero, e.target, 'calleYNumero') }
  }

  const validate = inputsValidations[e.target.name]
    ? inputsValidations[e.target.name]()
    : null
}

//Resetear cada uno de los campos del formulario
const resetearFormulario = async (input) => {
  const inputsValidations = {
    'name': () => { resetearCampo(expresiones.nombre, input, 'name') },
    'telefono': () => { resetearCampo(expresiones.telefono, input, 'telefono') },
    'sector': () => { resetearCampo(expresiones.nombre, input, 'sector') },
    'calle_y_numero': () => { resetearCampo(expresiones.calle_numero, input, 'calleYNumero') }
  }

  const validate = inputsValidations[input.name]
    ? inputsValidations[input.name]()
    : null
}

//Valida si un campo cumple con los requisitos
const validarCampo = (expresion, input, campo) => {
  let icon = document.querySelector(`#group-${campo} span`);
  if (expresion.test(input.value)) {
    if(icon.firstElementChild != null){ icon.removeChild(icon.firstChild); }
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="m8.938 13 4.958-4.938L12.833 7l-3.895 3.875-1.771-1.75-1.063 1.063ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById(`group-${campo}`).classList.remove('group-incorrect');
    document.getElementById(`group-${campo}`).classList.add('group-correct');
    document.querySelector(`#group-${campo} p`).classList.remove('input-error');
    campos[campo] = true;
  } else {
    if(icon.firstElementChild != null){ icon.removeChild(icon.firstChild); }
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor"><path d="M7.062 14 10 11.062 12.938 14 14 12.938 11.062 10 14 7.062 12.938 6 10 8.938 7.062 6 6 7.062 8.938 10 6 12.938ZM10 18q-1.646 0-3.104-.625-1.458-.625-2.552-1.719t-1.719-2.552Q2 11.646 2 10q0-1.667.625-3.115.625-1.447 1.719-2.541Q5.438 3.25 6.896 2.625T10 2q1.667 0 3.115.625 1.447.625 2.541 1.719 1.094 1.094 1.719 2.541Q18 8.333 18 10q0 1.646-.625 3.104-.625 1.458-1.719 2.552t-2.541 1.719Q11.667 18 10 18Z"/></svg>'
    document.getElementById(`group-${campo}`).classList.add('group-incorrect');
    document.getElementById(`group-${campo}`).classList.remove('group-correct');
    document.querySelector(`#group-${campo} p`).classList.add('input-error');
    campos[campo] = false;
  }
}

//Resetear los campos
const resetearCampo = (expresion, input, campo) => {
  let icon = document.querySelector(`#group-${campo} span svg`);

  if (icon != null) { icon.remove(icon); }
  document.getElementById(`group-${campo}`).classList.remove('group-incorrect');
  document.querySelector(`#group-${campo} p`).classList.remove('input-error');
  document.getElementById(`group-${campo}`).classList.remove('group-correct');
}

//Eventos para validar los formularios
inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario); //Ejecuta cuando se levanta una tecla
  input.addEventListener('blur', validarFormulario); //Ejecuta cuando se da un clic fuera del campo
})

//Validar que todos los campos estén correctos antes de enviar los datos
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); //Previene el submit

  if (campos.name && campos.telefono && campos.sector && campos.calleYNumero) {
    HTMLFormElement.prototype.submit.call(formulario); //Envío el formulario
  }
});

//Restear validaciones
const resetValidations = () => {
  inputs.forEach((input) => {
    resetearFormulario(input)
  });
}
