module.exports = {
  getUsers:function (conexion, funcion) {
    conexion.query("call p_getUsers();", funcion);
  }
}