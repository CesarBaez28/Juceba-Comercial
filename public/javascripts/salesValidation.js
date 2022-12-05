const cantidad = document.getElementById('cantidad');
const monto = document.getElementById('monto');
const clientes = document.getElementById('clientes');
const productos = document.getElementById('productos');
const button = document.getElementById('button');
const resultArea = document.getElementById('resultArea');
let totalAmountInput = document.getElementById('totalAmount');
let buttonRegister = document.getElementById('button-register');
let totalAmout = 0;
let products = {};

button.addEventListener('click', addSale);


//Añadir salida
async function addSale () {
  let c = parseFloat(cantidad.value);

  //Verifico los campos entén llenos, tengan un valor selecionado
  //, el campo cantidad sea entero y no se ingrese un producto repetido
  if(clientes.value && productos.value && monto.value && cantidad.value && Number.isInteger(c) && c > 0 (!products[productos.options[productos.selectedIndex].text]))
  {
    
  }
}
