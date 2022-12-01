let provincia = document.getElementById('provincia');
let municipio = document.getElementById('municipio');
let fieldProvincias = document.getElementById('field-provincias');
let fieldMunicipio = document.getElementById('field-municipio');

function fetch_data (parent_element, child_element) {
  provincia.value = fieldProvincias.getAttribute('value');
  fetch('/authentication/getMunicipios?parent_value=' + provincia.value + '').then(
    function (reponse) {
      return reponse.json();
    }).then(function (responseData) {

      let html = "";

      for (const element of responseData) {
        html += '<option value="' + element.codigo + '">' + element.municipio + '</option>';
      }
      child_element.innerHTML = html;
      municipio.value = fieldMunicipio.getAttribute('value');
    });
} 

fetch_data(provincia, municipio);

