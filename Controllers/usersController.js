const { response } = require('express');
const conexion = require('../Config/conectionMysql');
const users = require('../Model/users');
const user = require("../Model/users");
const phones = require("../Model/phones");
const helpers = require('../Config/helpers');

module.exports = {
  //Renderizar vista usuarios
  index: async function (req, res) {
    let codigoEmpresa = req.user[0]['codigo_empresa'];
    const [users] = await user.getUsers(conexion, codigoEmpresa);
    res.render('users/index', { title: 'Usuarios', users: users[0] });
  },

  //Renderizar vista myProfile
  myProfile: function (req, res) {
    res.render('users/myPerfil', {
      title: 'Mi perfil de usuario'
    });
  },

  //Renderizar vista editProfile
  editProfile: function (req, res) {
    res.render('users/editProfile', {
      title: 'Editar perfil de usuario'
    });
  },

  //Renderizar vista createUser
  createUser: async function (req, res) {

    //Obtengo los tipos de usuario (administrador, empleado, contador...)
    let [tiposUsuarios] = await user.getTypeOfUser(conexion);

    res.render('users/createUser', {
      title: 'Crear nuevo usuario',
      tiposUsuarios
    });
  },

  //Registrar un nuevo usuario
  insertUser: async function (req, res) {

    // Datos del nuevo usuario
    const newUser = {
      typeOfUser: req.body.typeOfUser,
      name: req.body.name,
      userName: req.body.userName,
      telefono: req.body.telefono,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
    }

    await conexion.query('START TRANSACTION');

    let telefono;

    //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el usuario con ese número
    try {
      [telefono] = await phones.insertPhoneNumber(conexion,newUser.telefono);
      telefono = telefono.insertId;
    } catch (error) {
      [telefono] = await phones.getPhoneNumber(conexion, newUser.telefono);
      telefono = telefono[0]['codigo'];
    }

    //Validar email repetido...


    //Registro el nuevo usuario
    let empresa = req.user[0]['codigo_empresa'];
    newUser.password = await helpers.encryptPassword(newUser.password); //Encripto la contraseña
    await users.insertUser(conexion, newUser.typeOfUser, telefono, empresa, 
      newUser.userName,newUser.name,newUser.password,newUser.email);
    await conexion.query('COMMIT');
    req.flash('msg', 'Usuario registrado correctamente');
    res.redirect('/users');
  },

  //Trato de obtener un nombre de usuario para verificar si ya existe
  getUser: async function (req, res) {
    let user = req.query.user;
    const [dato] = await users.getUser(conexion, user);
    res.json(dato);
  },

  //Renderisar vista changePassword
  changePassword: function (req, res) {
    res.render('users/changePassword', {
      title: 'Cambiar contraseña'
    });
  },
}
