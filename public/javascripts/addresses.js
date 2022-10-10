function _(element) {
  return document.getElementById(element);
}

function fetch_data(parent_element, child_element){
  fetch('/authentication/getMunicipios?parent_value='+parent_element.value+'').then(
    function(reponse){
      return reponse.json();
    }).then(function(responseData){

      let html = "";

      for(const element of responseData){
        html += '<option value="'+element.codigo+'">'+element.municipio+'</option>';
      }
      child_element.innerHTML = html;
    });
}

_('provincia').onchange = function(){
  fetch_data(_('provincia'),_('municipio'),_('load_municipios'));
};