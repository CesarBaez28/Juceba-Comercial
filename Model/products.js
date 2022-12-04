module.exports = {

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
  }
}