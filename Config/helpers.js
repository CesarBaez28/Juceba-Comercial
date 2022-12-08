const bcrypt = require('bcrypt');
const multer = require('multer');
const PDF = require('pdfkit');
const fs = require('fs');
let fecha = Date.now();

const helpers = {

};

/*-----------Encriptación y verifiación de contraseñas-------------*/

//Encriptar contraseñas
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//Comprobar contraseñas
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

/*-----------Guardar archivos----------------*/

//Guardar fotos de usuarios
helpers.storeRuteUsers = multer.diskStorage({
  destination: function (request, file, callback) {
    return callback(null, './public/images/users/')
  },

  filename: function (request, file, callback) {
    console.log(file);
    return callback(null, fecha + "_" + file.originalname);
  }
});

//Guardar fotos de los materiales
helpers.storeRuteMaterials = multer.diskStorage({
  destination: function (request, file, callback) {
    return callback(null, './public/images/materials/')
  },

  filename: function (request, file, callback) {
    console.log(file);
    return callback(null, fecha + "_" + file.originalname);
  }
});

//Guardar foto de los productos
helpers.storeRuteProducts = multer.diskStorage({
  destination: function (request, file, callback) {
    return callback(null, './public/images/products/')
  },

  filename: function (request, file, callback) {
    console.log(file);
    return callback(null, fecha + "_" + file.originalname);
  }
});

helpers.createInvoice = async (invoiceData) => {

  console.log(invoiceData);

  const doc = new PDF();

  const filename = `Factura${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(`./public/facturas/${filename}`));
  doc.text('Hola, mundo desde PDFKIT', 30, 30);
  doc.end();
}

module.exports = helpers;
