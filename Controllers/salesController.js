module.exports = {
  index:function(req, res){
    return res.render('sales/index', {title: 'Ventas'})
  }
}