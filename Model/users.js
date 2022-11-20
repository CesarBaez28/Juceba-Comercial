module.exports = {
  getUsers:function (conexion) {
   return conexion.query("call p_getUsers();");
  },

  login:function(conexion, datos, funcion){
    conexion.query("select * from usuarios where nombre_usuario = ? and passwd = ?",[datos.userName, datos.password], funcion);
  },

  getUser:function (conexion, user){
    return conexion.query('select nombre_usuario from usuarios where nombre_usuario = ?', user);
  }
}