const materials = require('../Model/materials');
const conexion = require('../Config/conectionMysql');
const products = require('../Model/products')

module.exports = {
  index: function (req, res) {
    return res.render('products/index', { title: 'Productos' });
  },

  createProduct: async function (req, res) {
    const codigoEmpresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.getActiveMaterials(conexion, codigoEmpresa);
    return res.render('products/createProduct', {
      title: 'Crear producto',
      materials: materiales[0]
    });
  },

  editProduct: function (req, res) {
    return res.render('products/editProduct', {
      title: 'Editar producto'
    });
  },

  insertProduct: async function (req, res) {

    const product = {
      producto: req.body.producto,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      //Verifico si se agregó una imagen 
      foto: (req.file) ? req.file.filename : ''
    }

    const materialsProduct = {
      materiales: req.body.materiales,
      cantidadMaterial: req.body.cantidadMaterial
    }

    //Registro el nuevo producto
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [newProduct] = await products.insertProduct(conexion, codigo_empresa, product);

    //Registro los materiales del producto si hay
    if(materialsProduct.materiales){
      await products.insertMaterialsProduct(conexion, newProduct.insertId, materialsProduct);
    }

    req.flash('success', 'Producto registrado correctamente');
    return res.redirect('/products');
  }
}