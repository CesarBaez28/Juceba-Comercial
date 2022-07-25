let ui_dialog = document.getElementById("ui-dialog");
let button_open_dialog = document.getElementsByClassName("button-open-dialog");
let dialog_title = document.getElementById("ui-dialog-title");

document.getElementById("ui-dialog-button-close").addEventListener("click", close_dialog);
document.getElementById("button-cancel").addEventListener("click", close_dialog);

//Open ui-dialog
for(const button of button_open_dialog)
{
  button.addEventListener("click", function open_dialog () {
    if(window.innerWidth >= 768 && window.innerHeight>= 450){
  
      // Get the browser window and ui-dialog width for calculate the center
      let windowWidth = document.documentElement.scrollWidth;
      let widthDialog = 300;
      let left = (windowWidth - widthDialog) / 2;

      if (document.title === 'Clientes') 
      {
        (button.classList.item(0) === 'button-edit') ? dialog_title.textContent = "Editar cliente" : 
          dialog_title.textContent = "Crear cliente";
      }
  
      button.setAttribute('href','#');
      ui_dialog.setAttribute('style', 'position: absolute;'+'top:'+'15'+'%;' + 'left:' + left+'px;');
      ui_dialog.classList.add('show-dialog');
    }
  });
}

/*
//open ui-dialog
function open_dialog () {
  if(window.innerWidth >= 768 && window.innerHeight>= 450){

    // Get the browser window and ui-dialog size for calculate the center
    let windowWidth = document.documentElement.scrollWidth;
    let windowHeight = document.documentElement.scrollHeight; 
    let widthDialog = 300;
    let heightDialog = 558.688;

    let left = (windowWidth - widthDialog) / 2;
    let top = ((windowHeight - heightDialog) / 2);

    button.setAttribute('href','#');
    ui_dialog.setAttribute('style', 'position: absolute;'+'top:'+'15'+'%;' + 'left:' + left+'px;');
    ui_dialog.classList.add('show-dialog');
  }
}
*/

//close ui-dialog
function close_dialog() {
  ui_dialog.classList.remove('show-dialog');
}

//Hide ui-dialog depending on the size of the screen
//Change the URL depending on the path
window.addEventListener("resize", function(){
  if(window.innerWidth < 768 || window.innerHeight < 450) {

    for(const button of button_open_dialog)
    {
      if (document.title === 'Mi perfil de usuario') 
      {
        button.setAttribute('href','/users/editProfile');
      }
      else if (document.title === 'Clientes')
      {
        (button.classList.item(0) === 'button-edit') ? button.setAttribute('href','/clients/editClient') : 
          button.setAttribute('href','/clients/createClient');
      }
    }

    ui_dialog.classList.remove('show-dialog');
  }
});