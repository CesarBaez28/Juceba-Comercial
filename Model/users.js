module.exports = {
  getUsers:function (conexion, funcion) {
    conexion.query("call p_getUsers();", funcion);
  },

  login:function(conexion, datos, funcion){
    conexion.query("select * from usuarios where nombre_usuario = ? and passwd = ?",[datos.userName, datos.password], funcion);
  }
}