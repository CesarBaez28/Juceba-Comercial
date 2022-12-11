const { response } = require('express');
const conexion = require('../Config/conectionMysql');
const users = require('../Model/users');
const user = require("../Model/users");
const phones = require("../Model/phones");
const helpers = require('../Config/helpers');
const { use } = require('passport');
const fs = require('fs');


module.exports = {
  //Renderizar vista usuarios
  index: async function (req, res) {
    let codigoEmpresa = req.user[0]['codigo_empresa'];
    let usuarioActual = req.user[0]['codigo'];
    const [users] = await user.getUsers(conexion, codigoEmpresa, usuarioActual);
    return res.render('users/index', { title: 'Usuarios', users: users[0] });
  },

  //Renderizar vista myProfile
  myProfile: async function (req, res) {

    //Obtengo los tipos de usuario (administrador, empleado, contador...)
    let [tiposUsuarios] = await users.getTypesOfUser(conexion);
    let codigoUser = req.query.codigo;
    const [user] = await users.getUserByID(conexion, codigoUser);
    console.log(user[0]);
    return res.render('users/myPerfil', {
      title: 'Mi perfil de usuario',
      users: user[0],
      tiposUsuarios
    });
  },

  //Renderizar vista editProfile
  editProfile: async function (req, res) {

    //Obtengo el código del usuario
    let codigoUser = req.query.codigo;
    const [user] = await users.getUserByID(conexion, codigoUser);

    //Obtengo los tipos de usuario (administrador, empleado, contador...)
    let [tiposUsuarios] = await users.getTypesOfUser(conexion);

    return res.render('users/editProfile', {
      title: 'Editar perfil de usuario',
      user: user[0],
      tiposUsuarios
    });
  },

  //Renderizar vista createUser
  createUser: async function (req, res) {

    //Obtengo los tipos de usuario (administrador, empleado, contador...)
    let [tiposUsuarios] = await user.getTypesOfUser(conexion);

    return res.render('users/createUser', {
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

    //await conexion.query('START TRANSACTION');

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
    //await conexion.query('COMMIT');
    req.flash('success', 'Usuario registrado correctamente');
    return res.redirect('/users');
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

    //await conexion.query('START TRANSACTION');

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
      user.userName, user.name, user.email, user.status, user.codigo);
    //await conexion.query('COMMIT');

    req.flash('success', 'Usuario actualizado correctamente')
    return res.redirect('/users/myUserProfile?codigo=' + user.codigo + '');
  },

  //Eliminar usuario (Cambiar estado a inactivo)
  deleteUser: async function (req, res) {
    await users.deleteUser(conexion, req.body.codigo)
    req.flash('success', 'Usuario eliminado correctamente')
    return res.redirect('/users');
  },

  //Trato de obtener un nombre de usuario para verificar si ya existe
  getUser: async function (req, res) {
    let user = req.query.user;
    const [dato] = await users.getUser(conexion, user);
    return res.json(dato);
  },

  //Renderizar vista changePassword
  changePasswordView: async function (req, res) {
    let codigoUser = req.query.codigo;
    const [user] = await users.getUserByID(conexion, codigoUser);
    return res.render('users/changePassword', {
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
      await users.changePassword(conexion, req.query.codigo, newPassword);

      //Mando mensaje de éxito y redirecciono.
      req.flash('success', 'Ha cambiado su contraseña correctamente');
      return res.redirect('/users/changePassword?codigo='+req.query.codigo+'');
    }
    else
    {
      req.flash('msg', 'Las contraseñas no son iguales');
      return res.redirect('/users/changePassword?codigo='+req.query.codigo+'');
    }
  },

  //Subir foto de perfil
  uploadPhoto: async function(req, res){

    //Verifico si ya el usuario ha registrado una foto para eliminarla(si son diferentes) y cambiarla
    const [user] = await users.getUserByID(conexion, req.query.codigo);
    if(req.file.filename != user[0][0].foto)
    {
      let nombreImagen = 'public/images/users/'+user[0][0].foto;
      if(fs.existsSync(nombreImagen) && user[0][0].foto != ''){
        fs.unlinkSync(nombreImagen);
      }
    }

    await users.uploadPhoto(conexion,req.query.codigo,req.file.filename);
    req.flash('success', 'Ha cambiado su foto de perfil correctamente')
    return res.redirect('/users/myUserProfile?codigo=' + req.query.codigo + '');
  },

  //Buscar usuarios (por nombre, codigo, tipo de usuario, nombre de usuario menos el usuario actual que inicia sesión)
  searchUser: async function(req, res) {
    //Obtengo el código de la empresa para realizar la búsqueda en la empresa que pertenece el usuario
    //Lo obtengo de la sesión del usuario
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const usuarioActual = req.user[0]['codigo'];
    const [users] = await user.searchUser(conexion, req.body.search, codigo_empresa, usuarioActual);
    return res.render('users/index', { title: 'Usuarios', users: users[0] });
  },

  //Buscar usuarios por estados (activos, inactivos o todos menos el usuario actual que inicia sesión)
  searchUserFilter: async function(req, res){
    //Obtengo el código de la empresa para realizar la búsqueda en la empresa que pertenece el usuario
    //Lo obtengo de la sesión del usuario
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const usuarioActual = req.user[0]['codigo'];
    const[users] = await user.searchUserFilter(conexion, req.body.filter, codigo_empresa, usuarioActual);
    return res.render('users/index', { title: 'Usuarios', users: users[0]});
  }
}