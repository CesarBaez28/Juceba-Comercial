const mysql = require("mysql2/promise");
const { Console } = require("console");
const { promisify } = require("util");
const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT 
} = require('../Config/config')

var conection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database:DB_NAME
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
//conection.query = promisify(conection.query);
module.exports=conection;