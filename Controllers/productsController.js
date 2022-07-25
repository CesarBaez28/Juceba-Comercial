module.exports = {
  index:function(req, res){
    res.render('products/index', {title: 'Productos'});
  }
}