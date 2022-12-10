const beginDate = document.getElementById('fecha-inicio');
const lastDate = document.getElementById('fecha-final');

const date = new Date()
 
//Retorna fecha actual en formato yy-mm-dd
const formatear = f =>{
    const año = f.getFullYear();
    const mes = ("0" + (f.getMonth()+1)).substr(-2);
    const dia = ("0" + f.getDate()).substr(-2);
    return `${año}-${mes}-${dia}`
}

beginDate.value = formatear(date);
beginDate.max = formatear(date);
lastDate.value = formatear(date);
lastDate.max = formatear(date);


