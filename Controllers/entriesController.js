module.exports = {
  index:function(req, res){
    res.render('entries/index', {title: 'Entradas'});
  }
}