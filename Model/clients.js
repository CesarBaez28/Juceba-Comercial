module.exports = {

  //Obtener todos los clientes activos de una empresa
  getClients: function (conexion, codigoEmpresa){
    return conexion.query('call p_getActiveClients(?)', [codigoEmpresa]);
  },

  //Obtener cliente por su código
  getClientById: function(conexion, codigo){
    return conexion.query('call p_getClientById(?)', [codigo]);
  },

  //Regitrar nuevo cliente
  insertClient:function(conexion, telefono, empresa, direccion, nombre){
    return conexion.query("insert into clientes(codigo_telefono,"+ 
      "codigo_empresa, codigo_direccion, nombre) values(?,?,?,?)", 
      [telefono, empresa, direccion, nombre]);
  },

  //Editar datos de un cliente
  updateClient:function(conexion, nombre, telefono, direccion, estado, codigo){
    return conexion.query("Update clientes set nombre = ?, codigo_telefono = ?, codigo_direccion = ?, estado = ? where codigo = ?", [nombre, telefono, direccion, estado, codigo]);
  },

  //Eliminar cliente (Cambiarle estado a inactivo)
  deteClient:function(conexion, codigo){
    const estado = false;
    return conexion.query("Update clientes set estado = ? where codigo = ?",[estado, codigo] );
  },

  //Buscar clientes por su código, nombre o dirección
  searchClients:function(conexion, codigoEmpresa, search){
    return conexion.query('call p_searchClients(?,?)', [codigoEmpresa, search]);
  },

  //Buscar clientes por estado (Activos, inactivos o todos)
  searchClientsFilter:function (conexion, codigoEmpresa, search){
    return conexion.query('call p_getClientsByStatus(?,?)', [codigoEmpresa, search]);
  }
}