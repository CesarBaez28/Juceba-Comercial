module.exports = {

  //Obtener todos los productos activos de una empresa
  getActiveProducts: function(conexion, codigoEmpresa){
    return conexion.query('call p_getActiveproducts(?)', [codigoEmpresa]);
  },

  //Obtener todos los materiales de un producto
  getMaterialsProduct: function(conexion, codigoProducto){
    return conexion.query('call p_getmaterialsProduct(?)', [codigoProducto]);
  },

  //Obtener producto por su código
  getProductById: function (conexion, codigoProducto){
    return conexion.query('call p_getProductById(?)', codigoProducto);
  },

  //Registrar producto
  insertProduct: function (conexion, codigoEmpresa, product) {
    return conexion.query('insert into productos(codigo_empresa, nombre,' +
      'descripcion, precio, foto) values(?,?,?,?,?)', [codigoEmpresa,
      product.producto, product.descripcion, product.precio, product.foto]);
  },

  //Registrar materiales de producto
  insertMaterialsProduct: async function (conexion, producto, materiales) {

    let query = 'insert into productos_materiales(codigo_material, codigo_producto, cantidad) values '
    
    //Verifico si la propiedad materiales es un arreglo para guardar todos los materiales
    if(Array.isArray(materiales.materiales))
    {
      for (let i = 0; i < materiales.materiales.length; i++) {
        let [codigo_material] = await conexion.query('select codigo from materiales where nombre = ?', [materiales.materiales[i]]);
  
        if (i < materiales.materiales.length - 1) {
          query += `(${codigo_material[0]['codigo']},${producto},${materiales.cantidadMaterial[i]}), `;
        }
        else {
          query += `(${codigo_material[0]['codigo']},${producto},${materiales.cantidadMaterial[i]})`;
        }
      }
      return conexion.query(query);
    }
    
    let [codigo_material] = await conexion.query('select codigo from materiales where nombre = ?', [materiales.materiales]);
    query += `(${codigo_material[0]['codigo']}, ${producto}, ${materiales.cantidadMaterial})`
    return conexion.query(query);
  },

  updateProduct:function (conexion, product){
    return conexion.query('update productos set nombre = ?, descripcion = ?, '+
    'precio = ?, foto = ?, estado = ? where codigo = ?', [product.producto, 
    product.descripcion, product.precio, product.foto, product.estado, product.codigo]);
  },

  //Elima todos los materiales de un producto si hay
  deleteMaterialsProduct: async function (conexion, materialsProduct, codigoProducto) {

    //Verifico si el producto tiene materiales
    if(materialsProduct.length === 0)
    {
      return
    }

    for (const element of materialsProduct) {
      await conexion.query('delete from productos_materiales where codigo_material = ? and codigo_producto = ?', [element.codigo_material, codigoProducto]);
    }
  }
}