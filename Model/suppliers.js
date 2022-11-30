module.exports = {

  //Obtener todos los suplidores activos de una empresa
  getSuppliers: function (conexion, codigoEmpresa) {
    return conexion.query('call p_getActiveSuppliers(?)', [codigoEmpresa]);
  },

  //Regitrar nuevo suplidor
  insertClient:function (conexion, telefono, empresa, direccion, nombre) {
    return conexion.query("insert into suplidores(codigo_telefono," +
      "codigo_empresa, codigo_direccion, nombre) values(?,?,?,?)",
      [telefono, empresa, direccion, nombre]);
  }
}