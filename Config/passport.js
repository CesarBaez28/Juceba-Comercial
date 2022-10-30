const flash = require('express-flash');
const { use } = require('passport');
const passport = require('passport');
const { beginTransaction } = require('./conectionMysql');
const LocalStrategy = require('passport-local').Strategy;
const conexion = require('./conectionMysql');
const mysql = require("mysql2");
const helpers = require('./helpers');

//Inicio de sesión
passport.use('local.signin', new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, userName, password, done) => {
  const rows = await conexion.query('select * from usuarios where nombre_usuario = ?', [userName]);
  if (rows.length > 0) {
    const user = rows[0]
    const validPassword = await helpers.matchPassword(password, user.passwd);
    if (validPassword) {
      return done(null, user, req.flash('success','Bienvenido ' + user.nombre_usuario));
    } else {
      return done(null, false, req.flash('msg','La contraseña no es correcta'));
    }
  } else {
    return done(null, false, req.flash('msg','El nombre de usuario no existe'));
  }
}));

//Registro de nueva cuenta
passport.use('local.signup', new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, userName, password, done) => {

  const reqBody = req.body;

  //Guardo los datos del usuario
  const newUser = {
    userName: reqBody.userName,
    password: reqBody.password,
    name: reqBody.name,
    telefono: reqBody.telefono,
    email: reqBody.email,
  };

  //Guardo los datos de la compañía
  const newCompany = {
    nameCompany: reqBody.nameCompany,
    emailCompany: reqBody.emailCompany,
    telefonoCompany: reqBody.telefonoCompany,
    provincia: reqBody.provincia,
    municipio: reqBody.municipio,
    sector: reqBody.sector,
    calleYNumero: reqBody.calle_y_numero
  };

  //Continuar validando los demás casos...
  try {
    await conexion.query('START TRANSACTION');
    const sector = await conexion.query('insert into sectores (sector) values (?)', [newCompany.sector]);
    const telefonoUser = await conexion.query('insert into telefonos (telefono) values (?)', newUser.telefono);
  } catch (error) {
    console.log(error);
    await conexion.query('ROLLBACK');
    return done(null, false, req.flash('msg','Número repetido'));
  }

  /*
  //Ingreso los datos de la nueva compañía
  const telefonoCompany = await conexion.query('insert into telefonos (telefono) values (?)', [newCompany.telefonoCompany]);
  const sector = await conexion.query('insert into sectores (sector) values (?)', [newCompany.sector]);
  const calleYNumero = await conexion.query('insert into callesYnumero (calle_y_numero) values (?)', [newCompany.calleYNumero]);
  const direccion = await conexion.query('insert into direcciones (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia) values (?,?,?,?)', [calleYNumero.insertId, sector.insertId, newCompany.municipio, newCompany.provincia]);
  const company = await conexion.query('insert into empresas (codigo_telefono,codigo_direccion,nombre,email) VALUES (?,?,?,?)', [telefonoCompany.insertId, direccion.insertId,newCompany.nameCompany, newCompany.emailCompany]);

  //Encripto la contraseña del usuario
  newUser.password = await helpers.encryptPassword(password)

  //Ingreso los datos del nuevo usuario
  const telefonoUser = await conexion.query('insert into telefonos (telefono) values (?)', newUser.telefono);
  let codigoTipoUsuario = 1; // 1 = Administrador
  const user = await conexion.query('insert into usuarios (codigo_tipo_usuario, codigo_telefono, codigo_empresa, nombre_usuario, nombre, passwd, email) values(?,?,?,?,?,?,?)', [codigoTipoUsuario, telefonoUser.insertId, company.insertId, newUser.userName, newUser.name, newUser.password, newUser.email]);
  newUser.codigo = user.insertId;
  return done(null, newUser);
  */
}));

passport.serializeUser((user, done) => {
  done(null, user.codigo);
});

passport.deserializeUser(async (id, done) => {
  const rows = await conexion.query('select * from usuarios where codigo = ?', [id]);
  done(null, rows[0]);
}); 
