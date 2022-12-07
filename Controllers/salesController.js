const conexion = require('../Config/conectionMysql');
const products = require('../Model/products');
const clients = require('../Model/clients');
const sales = require('../Model/sales');

module.exports = {

  //Renderizar vista registrar salida
  index: async function (req, res) {

    //Obtengos los clientes y productos de una empresa para mostrarlos en los selects
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [productos] = await products.getActiveProducts(conexion, codigo_empresa);
    const [clientes] = await clients.getClients(conexion, codigo_empresa);

    return res.render('sales/index', {
      title: 'Ventas',
      products: productos[0],
      clients: clientes[0]
    });
  },

  //Obtener producto
  getProduct: async function (req, res) {
    const [product] = await products.getProductById(conexion, req.query.product);
    return res.json(product);
  },

  //Registrar salida
  registerSale: async function (req, res) {

    //Obtengo el codigo de la empresa para registrar las salida de la misma    
    const codigo_empresa = req.user[0]['codigo_empresa'];

    const sale = {
      codigoEmpresa: codigo_empresa,
      total: req.body.totalAmount,
    }

    const detailsSales = {
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
      
      //Registro la salida
      const [newSale] = await sales.registerSale(conexion, sale);

      //Agrego el id de la salida al objeto detailsSales
      detailsSales['codigo_salida'] = newSale.insertId;
      console.log(detailsSales);

      //Registro los detalles de la salida
      await sales.registerDetailsSale(conexion, detailsSales);

      req.flash('success', 'Salida registrada correctamente');
      await conexion.query('COMMIT'); //Si todo va bien, hago el commit 
      return res.redirect('/sales');
    } catch (error) {
      console.log(error);
      await conexion.query('ROLLBACK'); //Si hay un error hago un rollback
      req.flash('msg', 'No dispones de suficiente material para registrar la salida')
      return res.redirect('/sales');
    }
  }
}