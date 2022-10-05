let users = require("../Model/users");
let conexion = require('../Config/conectionMysql');

module.exports={
  login:function(req, res){
    res.render('Authentication/login');
  },

  authenticate:function(req, res){
    users.login(conexion, req.body, function(err, datos){
      if(datos.length > 0 ){
        res.redirect('/menuPrincipal');
      } else {
        res.redirect('/authentication/login');
        console.log("Usuario o contraseña incorrecta");
      }
    });
  }
}
