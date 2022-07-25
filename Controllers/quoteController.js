module.exports = {
  index:function(req, res){
    res.render('quote/index', {title: 'Cotizaciones'});
  }
}