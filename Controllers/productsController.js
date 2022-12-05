const materials = require('../Model/materials');
const conexion = require('../Config/conectionMysql');
const products = require('../Model/products')
const fs = require('fs');

module.exports = {

  //Renderizar vista productos
  index: async function (req, res) {
    const codigoEmpresa = req.user[0]['codigo_empresa'];
    const [productos] = await products.getActiveProducts(conexion, codigoEmpresa);
    return res.render('products/index', {
      title: 'Productos',
      products: productos[0]
    });
  },

  //Renderizar vista crear productos
  createProduct: async function (req, res) {
    //Obtengo el código de la empresa para obtener los materiales de la misma
    const codigoEmpresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.getActiveMaterials(conexion, codigoEmpresa);
    return res.render('products/createProduct', {
      title: 'Crear producto',
      materials: materiales[0]
    });
  },

  //Renderizar vista editar productos
  editProduct: async function (req, res) {

    //Obtengo el código de la empresa para obtener los materiales de la misma
    const codigoEmpresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.getActiveMaterials(conexion, codigoEmpresa);

    //Obtengo datos del productos y los materiales del mismo.
    const [productos] = await products.getProductById(conexion, req.query.codigo);
    const [productosMateriales] = await products.getMaterialsProduct(conexion, req.query.codigo);
    return res.render('products/editProduct', {
      title: 'Editar producto',
      materials: materiales[0],
      products: productos[0],
      materialsProduct: productosMateriales[0]
    });
  },

  //Insertar productos
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
    if (materialsProduct.materiales) {
      await products.insertMaterialsProduct(conexion, newProduct.insertId, materialsProduct);
    }

    req.flash('success', 'Producto registrado correctamente');
    return res.redirect('/products');
  },

  updateProduct: async function (req, res) {

    //Hago una consulta al producto actual para obtener el valor de la foto si no se ha cambiado
    const [producto] = await products.getProductById(conexion, req.query.codigo);

    //Si se agrega una imagen nueva, borro la anterior
    if (req.file) {
      let nombreImagen = 'public/images/products/' + producto[0][0].foto;
      if (fs.existsSync(nombreImagen)) {
        fs.unlinkSync(nombreImagen);
      }
    }

    const product = {
      codigo: req.query.codigo,
      producto: req.body.producto,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
      //Verifico si se agregó una imagen 
      foto: (req.file) ? req.file.filename : producto[0][0].foto,
      estado: req.body.status
    };

    const materialsProduct = {
      materiales: req.body.materiales,
      cantidadMaterial: req.body.cantidadMaterial
    };

    //Actualizo los datos del producto
    const codigo_empresa = req.user[0]['codigo_empresa'];
    (product.estado === 'true') ? product.estado = true : product.estado = false;
    await products.updateProduct(conexion, product);

    //Actualizo los materiales del producto si hay
    const [materialesProducto] = await products.getMaterialsProduct(conexion, product.codigo)
    console.log(materialesProducto[0]);
    console.log(materialsProduct.materiales);
    await products.deleteMaterialsProduct(conexion, materialesProducto[0], product.codigo)

    //Registro los nuevos materiales del producto si hay
    if (materialsProduct.materiales) {
      await products.insertMaterialsProduct(conexion, product.codigo, materialsProduct);
    }

    req.flash('success', 'Producto actualizado correctamente');
    return res.redirect('/products');
  },

  //Buscar productos
  searchProducts: async function (req, res){
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [productos] = await products.searchProduct(conexion, codigo_empresa, req.body.search);
    return res.render('products/index', {
      title: 'Productos',
      products: productos[0]
    });
  },

  searchProductFilter: async function (req, res){
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [productos] = await products.searchProductsByStatus(conexion, codigo_empresa, req.body.filter);
    return res.render('products/index', {
      title: 'Productos',
      products: productos[0]
    });
  }
}