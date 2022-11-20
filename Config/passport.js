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
  const [rows] = await conexion.query('select * from usuarios where nombre_usuario = ?', [userName]);
  if (rows.length > 0) {
    const user = rows[0]
    const validPassword = await helpers.matchPassword(password, user.passwd);
    if (validPassword) {
      return done(null, user, req.flash('success','Bienvenido, ' + user.nombre));
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

  //------ Validar datos de la compañía-----------//
  let telefonoCompany, sector, calleYNumero, direccion, company;

  await conexion.query('START TRANSACTION');
  //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con ese número
  try {
    [telefonoCompany] = await conexion.query('insert into telefonos (telefono) values (?)', [newCompany.telefonoCompany]);
    telefonoCompany = telefonoCompany.insertId;
  } catch (error) {
    [telefonoCompany] = await conexion.query('select codigo from telefonos where telefono = ?', [newCompany.telefonoCompany]);
    telefonoCompany = telefonoCompany[0]['codigo']
    console.log(telefonoCompany);
  }

  //Valido si el sector suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con ese sector
  try {
    [sector] = await conexion.query('insert into sectores (sector) values (?)', [newCompany.sector]);
    sector = sector.insertId;
  } catch (error) {
    [sector] = await conexion.query('select codigo from sectores where sector = ?', [newCompany.sector]);
    sector = sector[0]['codigo']
    console.log(sector);
  }

  //Valido si la calle y el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con esa calle y número
  try {
    [calleYNumero] = await conexion.query('insert into callesYnumero (calle_y_numero) values (?)', [newCompany.calleYNumero]);
    calleYNumero = calleYNumero.insertId;
  } catch (error) {
    [calleYNumero] = await conexion.query('select codigo from callesYnumero where calle_y_numero = ?', [newCompany.calleYNumero]);
    calleYNumero = calleYNumero[0]['codigo']
    console.log(calleYNumero);
  }

  //Valido si la dirección completa ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con esa dirección
  try {
    [direccion] = await conexion.query('insert into direcciones (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia) values (?,?,?,?)', [calleYNumero, sector, newCompany.municipio, newCompany.provincia]);
    direccion = direccion.insertId;
  } catch (error) {
    console.log(error)
    [direccion] = await conexion.query('select codigo from direcciones where codigo_calle_y_numero = (?) and codigo_sector = (?) and codigo_municipio = (?) and codigo_provincia = (?)', [calleYNumero, sector, newCompany.municipio, newCompany.provincia]);
    direccion = direccion[0]['codigo'];
    console.log(direccion);
  }

  //--------- Valido los datos del usuario -----------//

  let telefonoUser;

  //Valido si el numero de telefono ya existe, si es así obtengo el código(pk) del registro para registrar al usuario con ese número.
  try {
    [telefonoUser] = await conexion.query('insert into telefonos (telefono) values (?)', [newUser.telefono]);
    telefonoUser = telefonoUser.insertId;
  } catch (error) {
    [telefonoUser] = await conexion.query('select codigo from telefonos where telefono = ?', [newUser.telefono]);
    telefonoUser = telefonoUser[0]['codigo']
    console.log(telefonoUser);
  }

  try {
    newUser.password = await helpers.encryptPassword(password) //Encripta la contraseña del usuario
    let codigoTipoUsuario = 1; // 1 = Administrador
    const [user] = await conexion.query('insert into usuarios (codigo_tipo_usuario, codigo_telefono, codigo_empresa, nombre_usuario, nombre, passwd, email) values(?,?,?,?,?,?,?)', [codigoTipoUsuario, telefonoUser, company.insertId, newUser.userName, newUser.name, newUser.password, newUser.email]);
    newUser.codigo = user.insertId;
    console.log(user);
    await conexion.query('COMMIT');
    return done(null, newUser);
  } catch (error) {
    await conexion.query('ROLLBACK');
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.codigo);
});

passport.deserializeUser(async (id, done) => {
  const rows = await conexion.query('select * from usuarios where codigo = ?', [id]);
  done(null, rows[0]);
}); 