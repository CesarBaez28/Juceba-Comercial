const { response } = require('express');
let conexion = require('../Config/conectionMysql');
let users = require("../Model/users");

module.exports = {
  index:function(req, res){
    users.getUsers(conexion, function(err, datos){
      res.render('users/index', {title: 'Usuarios', users:datos[0]});
    });
  },

  myProfile:function(req, res){
    res.render('users/myPerfil', {
      title: 'Mi perfil de usuario'
    });
  },

  editProfile:function(req, res){
    res.render('users/editProfile', {
      title: 'Editar perfil de usuario'
    });
  },

  createUser:function(req, res){
    res.render('users/createUser', {
      title: 'Crear nuevo usuario'
    });
  },

  changePassword:function(req, res){
    res.render('users/changePassword', {
      title: 'Cambiar contraseña'
    });
  }

}
