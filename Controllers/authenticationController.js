let users = require("../Model/users");
let conexion = require('../Config/conectionMysql');
let passport = require('passport');
let addresses = require('../Model/addresses');

module.exports={

  login:function(req, res){
    res.render('Authentication/login');
  },

  authenticate:function(req, res, next){
    passport.authenticate('local.signin', {
      successRedirect: '/menuPrincipal',
      failureRedirect: '/authentication/login',
      failureFlash: true
    })(req, res, next);
  },

  createAccount:function(req, res){
    
    let provincias;

    addresses.getProvincias(conexion,function(err, datos){
      provincias = datos;
      res.render('Authentication/createAccount', {provincias});
    });
  },

  signup:function(req, res, next){
    passport.authenticate('local.signup',{
      successRedirect: '/menuPrincipal',
      failureRedirect: '/authentication/createAccount',
      failureFlash: true
    })(req, res, next);
  },

  getMunicipios:async function (req, res){
    let searchQuery = req.query.parent_value;
    const municipios = await conexion.query('SELECT codigo, municipio FROM municipios where codigo_provincia = ?', searchQuery);
    res.json(municipios);
  }
}
