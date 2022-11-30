module.exports = {
  index:function(req, res){
    return res.render('quote/index', {title: 'Cotizaciones'});
  }
}