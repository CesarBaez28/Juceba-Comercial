const conexion = require('../Config/conectionMysql');
const products = require('../Model/products');
const clients = require('../Model/clients');

module.exports = {

  //Renderizar vista registrar salida
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
  },

  //Obtener producto
  getProduct: async function (req, res){
    const [product] = await products.getProductById(conexion, req.query.product);
    return  res.json(product);
  }
}