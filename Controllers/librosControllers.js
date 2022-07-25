var conection = require('../Config/conectionMysql');
var libro = require('../Model/libro');

module.exports=
{
  index:function(req, res) 
  {
    libro.obtener(conection, function(err, data){
      console.log(data);
      res.render('index', { title: 'Genial' });
    }) 
  }
}