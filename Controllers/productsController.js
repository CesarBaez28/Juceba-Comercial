module.exports = {
  index:function(req, res){
    return res.render('products/index', {title: 'Productos'});
  },

  createProduct:function(req, res){
    return res.render('products/createProduct', {
      title: 'Crear producto'
    });
  },

  editProduct:function(req, res){
    return res.render('products/editProduct',{
      title: 'Editar producto'
    });
  }
}