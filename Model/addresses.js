module.exports = {
   getProvincias:async function (conexion, funcion){
    await conexion.query("select codigo, provincia from provincias", funcion);
  },
}