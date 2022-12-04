module.exports = {

  //Obtener todos los materiales activos de una empresa
  getActiveMaterials: function (conexion, codigoEmpresa) {
    return conexion.query('call p_getActiveMaterials(?)', [codigoEmpresa]);
  },

  //Obtener un material por su código
  getMaterialById: function (conexion, codigo) {
    return conexion.query('call p_getMaterialByID(?)', [codigo]);
  },

  //Registrar nuevo material
  insertMaterial: function (conexion, material, codigoEmpresa) {
    return conexion.query('insert into materiales(nombre, codigo_tipo_material,' +
      'costo, existencia, punto_reorden, descripcion, foto, codigo_empresa)' +
      'values(?,?,?,?,?,?,?,?)', [material.material, material.tipo_material,
      material.costo, material.existencia, material.punto_reorden,
      material.descripcion, material.foto, codigoEmpresa]);
  },

  //Registrar nuevo material
  updateMaterial: function (conexion, material) {
    return conexion.query('update materiales set nombre = ?, codigo_tipo_material = ?,' +
      'costo = ?, existencia = ?, punto_reorden =?, descripcion = ?,' +
      'foto = ?, estado = ? where codigo = ?', [material.material, material.tipo_material,
      material.costo, material.existencia, material.punto_reorden,
      material.descripcion, material.foto, material.estado, material.codigo]);
  },

  //Eliminar material (Cambiar estado a inactivo)
  deleteMaterial: function (conexion, codigo) {
    return conexion.query('update materiales set estado = 0 where codigo = ?', [codigo]);
  },

  //Buscar material por su nombre
  searchMaterials: function (conexion, codigoEmpresa, search) {
    return conexion.query('call p_searchMaterials(?,?)', [codigoEmpresa, search]);
  },

  //Buscar material por estado (activos, inactivos o todos)
  searchMaterialsFilter: function (conexion, codigoEmpresa, search) {
    return conexion.query('call p_getMaterialsByStatus(?,?)', [codigoEmpresa, search]);
  }
}