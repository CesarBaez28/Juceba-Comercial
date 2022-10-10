const mysql = require("mysql");
const { Console } = require("console");
const { promisify } = require("util");

var conection = mysql.createPool({
  host:'localhost',
  user: 'root',
  password:'las70semanas',
  port: 3306,
  database:'JucebaComercial'
});

conection.getConnection((err, connection) => {
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('DATABASE HAS TOO MANY CONNECTIONS');
    }
    if(err.code === 'ECONNREFUSED'){
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }

  if(connection) connection.release();
  console.log('Conexión establecida');
  return;
});

//Promisify conection querys
conection.query = promisify(conection.query);
module.exports=conection;