//Variables
var side_menu = document.getElementById("menu-side")
var btn_open = document.getElementById("btn_open")
var page_content_container = document.getElementById("page-content")
 
//Ejecutar función en el evento click
document.getElementById("btn-open").addEventListener("click", open_menu);

//Evento para mostrar y ocultar menú
function open_menu()
{
  side_menu.classList.toggle("menu-side-move");

  if(window.innerWidth > 768){
    page_content_container.classList.toggle("move-page-content");
  }
}

window.addEventListener("resize", function(){
  if(window.innerWidth < 768){
    side_menu.classList.remove("menu-side-move")
    page_content_container.classList.remove("move-page-content");
  }
});