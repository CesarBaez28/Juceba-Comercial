module.exports = {
  showMainMenu:function(req, res){
    return res.render('index', {title:'Menú principal'});
  }
}

