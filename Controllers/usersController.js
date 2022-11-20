const { response } = require('express');
let conexion = require('../Config/conectionMysql');
const users = require('../Model/users');
let user = require("../Model/users");

module.exports = {
  index:async function(req, res){
    let codigoEmpresa = req.user[0]['codigo_empresa'];
    const [users] = await user.getUsers(conexion, codigoEmpresa);
    res.render('users/index', {title: 'Usuarios', users:users[0]});
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
  },
}
