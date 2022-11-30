module.exports = {

  //Obtener todos los suplidores activos de una empresa
  getSuppliers: function (conexion, codigoEmpresa) {
    return conexion.query('call p_getActiveSuppliers(?)', [codigoEmpresa]);
  },

  //Obtener suplidor por su código
  getSupplierById: function (conexion, codigo) {
    return conexion.query('call p_getSupplierById(?)', [codigo]);
  },

  //Regitrar nuevo suplidor
  insertSupplier: function (conexion, telefono, empresa, direccion, nombre) {
    return conexion.query("insert into suplidores(codigo_telefono," +
      "codigo_empresa, codigo_direccion, nombre) values(?,?,?,?)",
      [telefono, empresa, direccion, nombre]);
  },

  //Editar datos de un cliente
  updateSupplier: function (conexion, nombre, telefono, direccion, estado, codigo) {
    return conexion.query("Update suplidores set nombre = ?, codigo_telefono = ?," +
      "codigo_direccion = ?, estado = ? where codigo = ?",
      [nombre, telefono, direccion, estado, codigo]);
  },

  //Eliminar cliente (Cambiarle estado a inactivo)
  deteSupplier: function (conexion, codigo) {
    const estado = false;
    return conexion.query("Update suplidores set estado = ? where codigo = ?", [estado, codigo]);
  },
}