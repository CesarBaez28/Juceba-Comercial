//Configuración Base de datos
module.exports = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'las70semanas',
  DB_NAME: process.env.DB_HOST || 'JucebaComercial',
  DB_PORT: process.env.DB_HOST || 3306
}