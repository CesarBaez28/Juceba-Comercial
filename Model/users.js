module.exports = {
  //Obtener todos los usuarios por empresa (A exepción del usuario actual que inicia sesión);
  getUsers:function (conexion, codigoEmpresa, usuarioActual) {
   return conexion.query("call p_getActiveUsers(?,?);", [codigoEmpresa, usuarioActual]);
  },

  //Verificar usuario para proceso de inicio de sesión
  login:function(conexion, username){
    return conexion.query('call p_login(?)', [username]);
  },

  //Verificar si un nombre de usuario existe
  getUser:function (conexion, user){
    return conexion.query('select nombre_usuario from usuarios where nombre_usuario = ?', user);
  },

  //Obtener los tipos de usuarios (administrador, empleado, contador...)
  getTypeOfUser:function(conexion, tipoDeUsuario){
    return conexion.query('select codigo, tipo_usuario from tipo_usuarios where codigo = ?', [tipoDeUsuario]);
  },

  //Insertar un nuevo usuario
  insertUser:function(conexion, tipoUsuario, telefono, empresa, username, name, password, email){
    return conexion.query('insert into usuarios (codigo_tipo_usuario, codigo_telefono, codigo_empresa, nombre_usuario, nombre, passwd, email) values(?,?,?,?,?,?,?)', [tipoUsuario, telefono, empresa, username, name, password, email]);
  },

  //Editar un usuario
  editUser:function(conexion, tipoUsuario, telefono, username, name, email, estado, codigo){
    return conexion.query('update usuarios SET  codigo_tipo_usuario = ?, codigo_telefono = ?, nombre_usuario = ?, nombre = ?, email = ?, estado = ? Where codigo = ?', [tipoUsuario, telefono, username, name, email, estado, codigo]);
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
  deleteUser:function(conexion, codigo){
    const estado = false;
    return conexion.query('update usuarios set estado = ? where codigo = ?', [estado, codigo]);
  },

  //Buscar usuarios (por nombre, codigo, tipo de usuario, nombre de usuario menos el usuario actual que inicia sesión)
  searchUser:function(conexion, search, codigo_empresa, usuarioActual){
    return conexion.query('call p_searchUsers(?,?,?)', [search, codigo_empresa, usuarioActual]);
  },

  //Buscar usuario por filtro (Activos, inactivos o todos menos el usuario actual que inicia sesión)
  searchUserFilter:function(conexion, search, codigo_empresa, usuarioActual){
    return conexion.query('call p_getUserByStatus(?,?,?)', [codigo_empresa, search, usuarioActual]);
  }
}