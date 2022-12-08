const conexion = require('../Config/conectionMysql');
const products = require('../Model/products');
const clients = require('../Model/clients');
const sales = require('../Model/sales');
const helpers = require('../Config/helpers');
const createInvoice = require('../Config/createInvoice');
const company = require('../Model/company');
const fs = require('fs');

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

    /*-----------Registrar la salida------------*/

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

      //Si todo va bien, hago el commit 
      await conexion.query('COMMIT'); 

      /*---------Genero la factura------------*/

      //Obtengo todos los datos del cliente
      const [cliente] = await clients.getClientById(conexion,detailsSales.cliente);

      //Obtengo los datos de la empresa
      const [empresa] = await company.getCompany(conexion, sale.codigoEmpresa);

      //Creo objeto con todos los datos de la factura
      const invoiceData = {
        client: cliente[0],
        company: empresa[0],
        user: req.user[0]['nombre'],
        nameProduct: req.body.nameProduct,
        salesAmount: req.body.salesAmount,
        salesPrice: req.body.salesPrice,
        total: req.body.totalAmount,
        invoiceNumber: newSale.insertId
      }

      //Genero la factura
      const invoice = new createInvoice(invoiceData);
      invoice.generate();
      
      req.flash('generateInvoice', 'Salida registrada correctamente');
      return res.redirect('/sales');
    } catch (error) {
      console.log(error);
      await conexion.query('ROLLBACK'); //Si hay un error hago un rollback
      req.flash('msg', 'No dispones de suficiente material para registrar la salida')
      return res.redirect('/sales');
    }
  },

  //Descargar factura
  downloadInvoice: async function (req,res){

    let file = await fs.promises.readdir('./public/facturas');
    console.log(file);

    //Elimino todas las facturas anteriores
    for (let i = 0; i < file.length - 1; i++) {
      if(file[i] === '.DS_Store'){ continue; } //Me aseguro de no borrar el archivo .DS_Store
      fs.unlinkSync(`./public/facturas/${file[i]}`);
    }
    return res.download('./public/facturas/'+file[file.length-1]);
  }
}