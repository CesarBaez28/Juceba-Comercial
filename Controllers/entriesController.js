module.exports = {
  index:function(req, res){
    return res.render('entries/index', {title: 'Entradas'});
  }
}