module.exports = {
  getCompany:function(conexion, company){
    return conexion.query('select nombre from empresas where nombre = ?', company);
  }
}