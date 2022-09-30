module.exports = {
  getUsers:function (conexion, funcion) {
    conexion.query("Select usuarios.codigo, tipo_usuarios.tipo_usuario,"+ 
    "usuarios.nombre_usuario, usuarios.nombre, telefonos.telefono,"+ 
    "usuarios.email, CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE "+
    "'Inactivo' END AS estado FROM usuarios join tipo_usuarios on "+
    "usuarios.codigo_tipo_usuario = tipo_usuarios.codigo join telefonos "+
    "on usuarios.codigo_telefono = telefonos.codigo;", funcion);
  }
}