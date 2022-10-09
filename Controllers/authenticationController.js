let users = require("../Model/users");
let conexion = require('../Config/conectionMysql');
let addresses = require('../Model/addresses');


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
  },

  createAccount:function(req, res){
    let provincias;

    addresses.getProvincias(conexion,function(err, datos){
      provincias = datos;
      res.render('Authentication/createAccount', {provincias});
    });
  },

  getMunicipios:async function (req, res){
    let searchQuery = req.query.parent_value;
    const municipios = await conexion.query('SELECT codigo, municipio FROM municipios where codigo_provincia = ?', searchQuery);
    res.json(municipios);
  }
}
