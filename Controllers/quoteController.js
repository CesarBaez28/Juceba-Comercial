const conexion = require('../Config/conectionMysql');
const products = require('../Model/products');
const clients = require('../Model/clients');
const quotes = require('../Model/quote');

module.exports = {

  //Renderizar vista cotizaciones
  index: async function (req, res) {

    //Obtengos los clientes y productos de una empresa para mostrarlos en los selects
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [productos] = await products.getActiveProducts(conexion, codigo_empresa);
    const [clientes] = await clients.getClients(conexion, codigo_empresa);

    return res.render('quote/index', {
      title: 'Cotizaciones',
      products: productos[0],
      clients: clientes[0]
    });
  },

  //Registrar cotización
  registerQuote: async function (req, res) {

    //Obtengo el codigo de la empresa para registrar las salida de la misma    
    const codigo_empresa = req.user[0]['codigo_empresa'];

    const quote = {
      codigoEmpresa: codigo_empresa,
      total: req.body.totalAmount,
    }

    const detailsquote = {
      cliente: req.body.cliente,
      usuario: req.user[0]['codigo'],
      nameProduct: req.body.nameProduct,
      salesAmount: req.body.salesAmount,
      salesPrice: req.body.salesPrice
    }

    //Establezco el set isolation level para leer commits
    await conexion.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

    //Inicio la transacción
    await conexion.query('START TRANSACTION');
    try {

      //Registro la cotización
      const [newQuote] = await quotes.registerQuote(conexion, quote);

      //Agrego el id de la cotización al objeto detailsquote
      detailsquote['codigo_salida'] = newQuote.insertId;

      //Registro los detalles de la cotización
      await quotes.registerdetailsQuote(conexion, detailsquote);

      req.flash('success', 'Cotización registrada correctamente');
      await conexion.query('COMMIT'); //Si todo va bien, hago el commit 
      return res.redirect('/quote');
    } catch (error) {
      console.log(error);
      await conexion.query('ROLLBACK'); //Si hay un error hago un rollback
      req.flash('msg', 'No dispones de suficiente material para registrar la salida')
      return res.redirect('/quote');
    }
  }
}