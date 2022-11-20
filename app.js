const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const sesion = require('express-session');
const MySqlStore = require('express-mysql-session');
const conexion = require('./Config/conectionMysql');
const sessionStore = new MySqlStore({},conexion);

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authenticationRouter = require('./routes/authentication');
const menuPrincipalRouter = require('./routes/menuPrincipal');
const clientsRouter = require('./routes/clients');
const suppliersRouter = require('./routes/suppliers');
const productsRouter = require('./routes/products');
const entriesRouter = require('./routes/entries');
const salesRouter = require('./routes/sales');
const quoteRouter = require('./routes/quote');
const materialsRouter = require('./routes/materials');
const reportsRouter = require('./routes/reports');

var app = express();
require('./Config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extends: false})); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sesion({
  secret: 'jucebaComercialSesions',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success'); //Mensaje de éxito
  app.locals.msg = req.flash('msg'); //msg = message de error o cualquier otro tipo.
  app.locals.incorrectPassword = req.flash('incorrectPassword');
  app.locals.user = req.user; // Datos de la sesión del usuario.
  next(); //Para que la aplicación continue con las rutas de abajo.
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentication', authenticationRouter);
app.use('/menuPrincipal', menuPrincipalRouter);
app.use('/clients', clientsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/products', productsRouter);
app.use('/entries', entriesRouter);
app.use('/sales', salesRouter);
app.use('/quote', quoteRouter);
app.use('/materials', materialsRouter);
app.use('/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); 
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
