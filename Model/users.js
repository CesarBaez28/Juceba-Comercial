module.exports = {
  //Obtener todos los usuarios por empresa
  getUsers:function (conexion, codigoEmpresa) {
   return conexion.query("call p_getUsers(?);", [codigoEmpresa]);
  },

  //Verificar usuario para proceso de inicio de sesión
  login:function(conexion, datos, funcion){
    conexion.query("select * from usuarios where nombre_usuario = ? and passwd = ?",[datos.userName, datos.password], funcion);
  },

  //Verificar si un nombre de usuario existe
  getUser:function (conexion, user){
    return conexion.query('select nombre_usuario from usuarios where nombre_usuario = ?', user);
  },

  //Obtener los tipos de usuarios (administrador, empleado, contador...)
  getTypeOfUser:function(conexion){
    return conexion.query('select codigo, tipo_usuario from tipo_usuarios');
  },

  //Insertar un nuevo usuario
  insertUser:function(conexion, tipoUsuario, telefono, empresa, username, name, password, email){
    return conexion.query('insert into usuarios (codigo_tipo_usuario, codigo_telefono, codigo_empresa, nombre_usuario, nombre, passwd, email) values(?,?,?,?,?,?,?)', [tipoUsuario, telefono, empresa, username, name, password, email]);
  }
}