module.exports = {
  getProvincias:function(conexion){
    return conexion.query("select codigo, provincia from provincias");
  }
}