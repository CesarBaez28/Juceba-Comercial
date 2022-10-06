const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const conexion = require('./conectionMysql');
const helpers = require('./helpers');


passport.use('local.signin', new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, userName, password, done) => {
  const rows = await conexion.query('select * from usuarios where nombre_usuario = ? and passwd = ?', [userName, password]);
  if (rows.length > 0) {
    const user = rows[0]
    const validPassword = await helpers.matchPassword(password, user.password);
    if (validPassword) {
      done(null, user);
    } else {
      done(null, false);
    }
  } else {
    console.log("Usuario no existe");
    return done(null, false);
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, userName, password, done) => {

  const newUser = {
    userName,
    password
  };

  newUser.password = await helpers.encryptPassword(password)
  const result = await conexion.query("select * from usuarios where nombre_usuario = ? and passwd = ?", [newUser]);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await conexion.query('select * from usuarios where codigo = ?', [id]);
  done(null, rows[0]);
});