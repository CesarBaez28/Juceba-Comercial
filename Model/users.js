module.exports = {
  //Obtener todos los usuarios por empresa
  getUsers:function (conexion, codigoEmpresa) {
   return conexion.query("call p_getUsers(?);", [codigoEmpresa]);
  },

  //Verificar usuario para proceso de inicio de sesión
  login:function(conexion, username){
    conexion.query('select * from usuarios where nombre_usuario = ?', [username]);
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
  },

  //Editar un usuario
  editUser:function(conexion, tipoUsuario, telefono, username, name, email, estado){
    return conexion.query('update usuarios SET  codigo_tipo_usuario = ?, codigo_telefono = ?, nombre_usuario = ?, nombre = ?, email = ?, estado = ? Where nombre_usuario = ?', [tipoUsuario, telefono, username, name, email, estado, username]);
  },

  //Obtener un usuario por su código
  getUserByID:function(conexion, codigo){
    return conexion.query('call p_getUserById(?)', [codigo]);
  },

  //Cambiar contraseña
  changePassword:function(conexion, codigo, password){
    return conexion.query('update usuarios set passwd = ? where codigo = ?', [password, codigo]);
  },

  //Subir foto
  uploadPhoto:function(conexion, codigo, photo){
    return conexion.query('update usuarios set foto = ? where codigo = ?', [photo, codigo]);
  },

  //Eliminar usuario (Cambia estado a inactivo)
  deleteUser: function(conexion, codigo){
    const estado = false;
    return conexion.query('update usuarios set estado = ? where codigo = ?', [estado, codigo]);
  }
}