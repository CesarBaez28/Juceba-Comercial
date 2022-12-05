const conexion = require('../Config/conectionMysql');
const suppliers = require('../Model/suppliers');
const materials = require('../Model/materials');

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
    console.log(req.body);
  }
}