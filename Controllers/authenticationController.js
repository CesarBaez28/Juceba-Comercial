let users = require("../Model/users");
let conexion = require('../Config/conectionMysql');
let passport = require('passport');
let addresses = require('../Model/addresses');
let companys = require('../Model/company');

module.exports={

  //Obtener vista para el inicio de sesión
  login:function(req, res){
    res.render('Authentication/login');
  },

  //Autenticar proceso de inicio de sesión
  authenticate:function(req, res, next){
    passport.authenticate('local.signin', {
      successRedirect: '/menuPrincipal',
      failureRedirect: '/authentication/login',
      failureFlash: true
    })(req, res, next);
  },

  //Cerrar sesión
  logout:function(req, res, next){
    req.logOut(req.user, err =>{
      if(err) return next(err);
      res.redirect('/authentication/login');
    });
  },

  //Obtener vista crear nueva cuenta de usuario
  createAccount: async function(req, res){
    
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    res.render('Authentication/createAccount', {provincias});
  },

  //Proceso de autenticación de registro de nueva cuenta de usuario
  signup:function(req, res, next){
    passport.authenticate('local.signup',{
      successRedirect: '/menuPrincipal',
      failureRedirect: '/authentication/createAccount',
      failureFlash: true
    })(req, res, next);
  },

  //Obtengo los municipio acorde a una provincia especificada
  getMunicipios:async function (req, res){
    let searchQuery = req.query.parent_value;
    const [municipios] = await conexion.query('SELECT codigo, municipio FROM municipios where codigo_provincia = ?', searchQuery);
    return res.json(municipios);
  },

  //Trato de obtener un nombre de usuario para verificar si ya existe
  getUser:async function(req, res){
    let user = req.query.user;
    const [dato] = await users.getUser(conexion, user); 
    return res.json(dato);
  },

  getCompany: async function(req, res){
    let company = req.query.company
    const [dato] = await companys.getCompany(conexion, company);
    return res.json(dato);
  }
}
 