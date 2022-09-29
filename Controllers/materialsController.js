module.exports = {
  index:function(req, res){
    res.render('materials/index', {title: 'Materiales'});
  },

  createMaterial:function(req, res){
    res.render('materials/createMaterial', {
      title: 'Registrar material'
    });
  }
}