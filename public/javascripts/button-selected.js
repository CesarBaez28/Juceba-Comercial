let buttons = [
  document.getElementById("btn-todos"),
  document.getElementById("btn-codigo"),
  document.getElementById("btn-nombre"),
  document.getElementById("btn-activos"),
  document.getElementById("btn-inactivos"),
  document.getElementById("btn-provincia"),
  document.getElementById("btn-municipio")
]

for (const button of buttons) 
{
  if(button != null)
  {
    button.addEventListener("click", function buttonSelected (){
      for (const button of buttons) 
      {
        if(button != null)
        {
          button.classList.remove("button-selected");
        }
      }
      button.classList.add('button-selected');
    });
  }
}
