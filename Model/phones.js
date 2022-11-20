module.exports = {

  //Insertar número de teléfono
  insertPhoneNumber:function(conexion, phone){
    return conexion.query('insert into telefonos (telefono) values (?)', [phone]);
  },

  //Obtener número de teléfono
  getPhoneNumber:function(conexion, phone) {
    return conexion.query('select codigo from telefonos where telefono = ?', [phone]);
  }
}