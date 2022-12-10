const conexion = require('../Config/conectionMysql');
const users = require('../Model/users');

module.exports = {
  //Verifica el rol del usuario
  async checkRole(req, res, next)
  {
    if(req.user[0]['tipo_usuario'] === 'Administrador')
    {
      return next();
    }
    else 
    {
      return  res.redirect('/menuPrincipal')
    }
  }
}