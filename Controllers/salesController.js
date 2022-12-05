const conexion = require('../Config/conectionMysql');
const products = require('../Model/products');
const clients = require('../Model/clients');

module.exports = {
  index: async function(req, res){

    //Obtengos los clientes y productos de una empresa para mostrarlos en los selects
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [productos] = await products.getActiveProducts(conexion,codigo_empresa);
    const [clientes] = await clients.getClients(conexion, codigo_empresa);

    return res.render('sales/index', {
      title: 'Ventas',
      products: productos[0],
      clients: clientes[0]
    });
  }
}