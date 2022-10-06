let users = require("../Model/users");
let conexion = require('../Config/conectionMysql');
let passport = require('passport');

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
  }
}
