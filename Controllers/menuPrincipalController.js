const users = require('../Model/users');
const conexion = require('../Config/conectionMysql');

module.exports = {
  showMainMenu: async function(req, res){
    //Obtengo el role de usuarios para mostrar las opciones según sus permisos
    return res.render('index', {
      title:'Menú principal',
    });
  }
}

