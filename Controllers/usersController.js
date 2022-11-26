const { response } = require('express');
const conexion = require('../Config/conectionMysql');
const users = require('../Model/users');
const user = require("../Model/users");
const phones = require("../Model/phones");
const helpers = require('../Config/helpers');
const { use } = require('passport');

module.exports = {
  //Renderizar vista usuarios
  index: async function (req, res) {
    let codigoEmpresa = req.user[0]['codigo_empresa'];
    const [users] = await user.getUsers(conexion, codigoEmpresa);
    res.render('users/index', { title: 'Usuarios', users: users[0] });
  },

  //Renderizar vista myProfile
  myProfile: async function (req, res) {

    //Obtengo los tipos de usuario (administrador, empleado, contador...)
    let [tiposUsuarios] = await users.getTypeOfUser(conexion);
    let codigoUser = req.query.codigo;
    const [user] = await users.getUserByID(conexion, codigoUser);
    res.render('users/myPerfil', {
      title: 'Mi perfil de usuario',
      user: user[0],
      tiposUsuarios
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
      [telefono] = await phones.insertPhoneNumber(conexion, newUser.telefono);
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
      newUser.userName, newUser.name, newUser.password, newUser.email);
    await conexion.query('COMMIT');
    req.flash('success', 'Usuario registrado correctamente');
    res.redirect('/users');
  },

  //Editar datos de un usuario
  editUser: async function (req, res) {
    const user = {
      codigo: req.query.codigo,
      typeOfUser: req.body.typeOfUser,
      name: req.body.name,
      userName: req.body.userName,
      telefono: req.body.telefono,
      email: req.body.email,
      status: req.body.status
    }

    await conexion.query('START TRANSACTION');

    let telefono;

    //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el usuario con ese número
    try {
      [telefono] = await phones.insertPhoneNumber(conexion, user.telefono);
      telefono = telefono.insertId;
    } catch (error) {
      [telefono] = await phones.getPhoneNumber(conexion, user.telefono);
      telefono = telefono[0]['codigo'];
    }

    //Validar email repetido...

    //Editar el usuario
    (user.status === 'true') ? user.status = true : user.status = false; 
    console.log(user)
    await users.editUser(conexion, user.typeOfUser, telefono,
      user.userName, user.name, user.email, user.status, user.userName);
    await conexion.query('COMMIT');

    req.flash('success', 'Usuario actualizado correctamente')
    res.redirect('/users/myUserProfile?codigo=' + user.codigo + '');
  },

  //Eliminar usuario (Cambiar estado a inactivo)
  deleteUser: async function (req, res) {
  },

  //Trato de obtener un nombre de usuario para verificar si ya existe
  getUser: async function (req, res) {
    let user = req.query.user;
    const [dato] = await users.getUser(conexion, user);
    res.json(dato);
  },

  //Renderizar vista changePassword
  changePasswordView: async function (req, res) {
    let codigoUser = req.query.codigo;
    const [user] = await users.getUserByID(conexion, codigoUser);
    res.render('users/changePassword', {
      title: 'Cambiar contraseña',
      user: user[0]
    });
  },

  //Cambiar contraseña
  changePassword: async function (req, res) {
    //Obtengo los datos del usuario para validar la contraseña.
    const [user] = await conexion.query('select * from usuarios where codigo = ?', req.query.codigo);

    //Verifico si las contraseñas son iguales.
    const validPassword = await helpers.matchPassword(req.body.oldPassword, user[0]['passwd']);
    console.log(validPassword);
    if(validPassword){
      console.log(validPassword);
      //Encripto la contraseña y actualizo
      const newPassword = await helpers.encryptPassword(req.body.password);
      users.changePassword(conexion, req.query.codigo, newPassword);

      //Mando mensaje de éxito y redirecciono.
      req.flash('success', 'Ha cambiado su contraseña correctamente');
      res.redirect('/users/changePassword?codigo='+req.query.codigo+'');
    }
    else
    {
      req.flash('msg', 'Las contraseñas no son iguales');
      res.redirect('/users/changePassword?codigo='+req.query.codigo+'');
    }
  }
}