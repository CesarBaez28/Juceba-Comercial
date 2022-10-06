var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var sesion = require('express-session');
var MySqlStore = require('express-mysql-session');

var conexion = require('./Config/conectionMysql');

// Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentication');
var menuPrincipalRouter = require('./routes/menuPrincipal');
var clientsRouter = require('./routes/clients');
var suppliersRouter = require('./routes/suppliers');
var productsRouter = require('./routes/products');
var entriesRouter = require('./routes/entries');
var salesRouter = require('./routes/sales');
var quoteRouter = require('./routes/quote');
var materialsRouter = require('./routes/materials');
var reportsRouter = require('./routes/reports');

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
  store: new MySqlStore(conexion)
}));
app.use(passport.initialize());
app.use(passport.session());

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
