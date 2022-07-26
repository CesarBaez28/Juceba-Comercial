module.exports={
  index:function(req, res){
    res.render('suppliers/index', {title: 'Suplidores'});
  },

  createSupplier:function(req, res){
    res.render('suppliers/createSupplier', {title: 'Crear Suplidor'});
  },

  editSupplier:function(req, res){
    res.render('suppliers/editSupplier', {title: 'Editar cliente'});
  }
}