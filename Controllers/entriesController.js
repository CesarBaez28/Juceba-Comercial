const conexion = require('../Config/conectionMysql');
const suppliers = require('../Model/suppliers');
const materials = require('../Model/materials');
const entries = require('../Model/entries');

module.exports = {

  //Renderizar vista registrar entrada
  index: async  function (req, res) {
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [suplidores] = await suppliers.getSuppliers(conexion, codigo_empresa);
    const [materiales] = await materials.getActiveMaterials(conexion, codigo_empresa);
    return res.render('entries/index', {
      title: 'Entradas',
      suppliers: suplidores[0],
      materials: materiales[0]
    });
  },

  //Obtner materiales para el select
  getMaterial: async function (req, res) 
  {
    console.log(req.query.material);
    const [material] = await materials.getMaterialById(conexion, req.query.material);
    return res.json(material);
  },

  //Registrar entrada
  registerEntrie: async function (req, res)
  {
    //Obtengo el codigo de la empresa para registrar las entradas de la misma    
    const codigo_empresa = req.user[0]['codigo_empresa'];

    const entrie = {
      codigoEmpresa: codigo_empresa,
      total: req.body.totalAmount,
    }

    const detailsEntrie = {
      suplidor: req.body.suplidor,
      usuario: req.user[0]['codigo'],
      nameMaterial: req.body.nameMaterial,
      entrieAmount: req.body.entrieAmount,
      entrieCost: req.body.entrieCost
    }

    //Registro la entrada
    const [newEntrie] = await entries.registerEntrie(conexion, entrie);

    //Agrego el id de la entrada al objeto detailsEntrie
    detailsEntrie['codigo_entrada'] = newEntrie.insertId;
    console.log(detailsEntrie);

    //Registro los detalles de la entrada
    await entries.registerDetailsEntrie(conexion, detailsEntrie);

    req.flash('success', 'Entrada registrada correctamente');
    return res.redirect('/entries');
  }
}