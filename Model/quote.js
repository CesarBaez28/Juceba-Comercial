module.exports = {

  //Registrar cotización
  registerQuote: function (conexion, quote) {
    return conexion.query('insert into cotizaciones (codigo_empresa, total) values (?,?)',
      [quote.codigoEmpresa, quote.total]);
  },

  //Registrar detalles de la cotización
  registerdetailsQuote: async function (conexion, detailsquote) {

    let query = 'insert into detalles_cotizacion (codigo_cotizacion, codigo_producto, codigo_cliente, codigo_usuario, precio, cantidad) values ';

    //Comprebo si los datos viene en un array
    if (Array.isArray(detailsquote.nameProduct)) {
      for (let i = 0; i < detailsquote.nameProduct.length; i++) {
        //Obtengo el código del producto
        let [codigo_producto] = await conexion.query('select codigo from productos where nombre = ?', [detailsquote.nameProduct[i]]);

        if (i < detailsquote.nameProduct.length - 1) {
          query += `(${detailsquote.codigo_salida},${codigo_producto[0]['codigo']},${detailsquote.cliente},${detailsquote.usuario},${detailsquote.salesPrice[i]},${detailsquote.salesAmount[i]}), `;
        } else {
          query += `(${detailsquote.codigo_salida},${codigo_producto[0]['codigo']},${detailsquote.cliente},${detailsquote.usuario},${detailsquote.salesPrice[i]},${detailsquote.salesAmount[i]})`;
        }
      }
      return conexion.query(query);
    }

    let [codigo_producto] = await conexion.query('select codigo from productos where nombre = ?', [detailsquote.nameProduct]);
    query += `(${detailsquote.codigo_salida},${codigo_producto[0]['codigo']},${detailsquote.cliente},${detailsquote.usuario},${detailsquote.salesPrice},${detailsquote.salesAmount})`;
    return conexion.query(query);
  }
}