module.exports = {
  index:function(req, res){
    return res.render('reports/index', {title: 'Reportes'});
  }
}