module.exports = {

  //Registrar salida
  registerSale: function (conexion, sale) {
    return conexion.query('insert into salidas (codigo_empresa, total) values (?,?)', [
      sale.codigoEmpresa, sale.total
    ]);
  },
  
  //Registrar detalles de la salida
  registerDetailsSale: async function (conexion, detailsSales) {

    let query = 'insert into detalles_salida (codigo_salida, codigo_producto, codigo_cliente, codigo_usuario, precio, cantidad) values ';

    //Comprebo si los datos viene en un array
    if(Array.isArray(detailsSales.nameProduct))
    {
      for (let i = 0; i < detailsSales.nameProduct.length; i++) {
        //Obtengo el código del producto
        let [codigo_producto] = await conexion.query('select codigo from productos where nombre = ? and codigo_empresa = ?', [detailsSales.nameProduct[i], detailsSales.codigoEmpresa]);
        console.log(codigo_producto);

        if(i < detailsSales.nameProduct.length - 1){
          query += `(${detailsSales.codigo_salida},${codigo_producto[0]['codigo']},${detailsSales.cliente},${detailsSales.usuario},${detailsSales.salesPrice[i]},${detailsSales.salesAmount[i]}), `;
        } else {
          query += `(${detailsSales.codigo_salida},${codigo_producto[0]['codigo']},${detailsSales.cliente},${detailsSales.usuario},${detailsSales.salesPrice[i]},${detailsSales.salesAmount[i]})`;
        }
      }
      return conexion.query(query);
    }
    let [codigo_producto] = await conexion.query('select codigo from productos where nombre = ? and codigo_empresa = ?', [detailsSales.nameProduct, detailsSales.codigoEmpresa]);
    console.log(codigo_producto);
    query += `(${detailsSales.codigo_salida},${codigo_producto[0]['codigo']},${detailsSales.cliente},${detailsSales.usuario},${detailsSales.salesPrice},${detailsSales.salesAmount})`;
    return conexion.query(query);
  }
}