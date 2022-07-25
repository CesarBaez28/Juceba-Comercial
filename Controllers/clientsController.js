module.exports = {
  index:function(req, res){
    res.render('clients/index', {title: 'Clientes'});
  },

  createClient:function(req, res){
    res.render('clients/createClient', {title: 'Crear cliente'});
  },
  
  editClient:function(req, res){
    res.render('clients/editClient', {title: 'Editar cliente'});
  }
}