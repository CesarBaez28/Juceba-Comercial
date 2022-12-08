module.exports = {

  //Obtener los datos de una empresa
  getCompany:function(conexion, company){
    return conexion.query('call p_geCompany(?)', company);
  }
}