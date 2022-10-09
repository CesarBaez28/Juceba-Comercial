const { Console } = require("console");
var mysql = require("mysql");
const { promisify } = require("util");


var conection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'las70semanas',
  port: 3306,
  database:'JucebaComercial'
});

conection.connect(
  (err)=>{
    if(!err)
    {
      console.log('Conexión establecida');
    }
    else
    {
      console.log('Error de conexión');
    }
  }  
);

conection.query = promisify(conection.query);
module.exports=conection;