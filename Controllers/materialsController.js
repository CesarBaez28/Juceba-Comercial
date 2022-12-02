const materials = require("../Model/materials");
const conexion = require("../Config/conectionMysql");
const fs = require('fs');

module.exports = {
  //Renderizar vista materials
  index: async function (req, res) {

    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.getActiveMaterials(conexion, codigo_empresa);
    return res.render('materials/index', {
      title: 'Materiales',
      materials: materiales[0]
    });
  },

  //Renderizar vista createMaterial
  createMaterial: function (req, res) {
    return res.render('materials/createMaterial', {
      title: 'Registrar material'
    });
  },

  //Renderizar vista editMaterial
  editMaterial: async function (req, res) {
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.getMaterialById(conexion, req.query.codigo);

    return res.render('materials/editMaterial', {
      title: 'Editar material',
      materials: materiales[0]
    });
  },

  //Registrar material
  insertMaterial: async function (req, res) {

    const material = {
      material: req.body.material,
      tipo_material: req.body.tipo_material,
      costo: req.body.costo,
      existencia: req.body.existencia,
      punto_reorden: req.body.punto_reorden,
      descripcion: req.body.descripcion,
      //Verifico si se agregó una imagen 
      foto: (req.file) ? req.file.filename : ''
    }

    //----Validar datos del material----//

    //Verifico si el tipo de material existe. Si es así, obtengo su código para registrarlo con el nuevo material.
    try {
      [material.tipo_material] = await conexion.query('insert into tipos_materiales (nombre) values (?)', [material.tipo_material]);
      material.tipo_material = material.tipo_material.insertId;
    } catch (error) {
      [material.tipo_material] = await conexion.query('select codigo from tipos_materiales where nombre = ?', [material.tipo_material]);
      material.tipo_material = material.tipo_material[0]['codigo']
    }

    const codigo_empresa = req.user[0]['codigo_empresa'];
    await materials.insertMaterial(conexion, material, codigo_empresa);
    req.flash('success', 'Material registrado correctamente');
    return res.redirect('/materials');
  },

  //Actualizar material
  updateMaterial: async function (req, res) {

    //Hago una consulta al material actual para obtener el valor de la foto si no se ha cambiado
    const [materiales] = await materials.getMaterialById(conexion, req.query.codigo);

    //Si se agrega una imagen nueva, borro la anterior
    if(req.file)
    {
      let nombreImagen = 'public/images/materials/'+materiales[0][0].foto;
      if(fs.existsSync(nombreImagen)){
        fs.unlinkSync(nombreImagen);
      }
    }

    const material = {
      codigo: req.query.codigo,
      material: req.body.material,
      tipo_material: req.body.tipo_material,
      costo: req.body.costo,
      existencia: req.body.existencia,
      punto_reorden: req.body.punto_reorden,
      descripcion: req.body.descripcion,
      //Verifico si se agregó una imagen 
      foto: (req.file) ? req.file.filename : materiales[0][0].foto
    }

    //----Validar datos del material----//

    //Verifico si el tipo de material existe. Si es así, obtengo su código para registrarlo con el nuevo material.
    try {
      [material.tipo_material] = await conexion.query('insert into tipos_materiales (nombre) values (?)', [material.tipo_material]);
      material.tipo_material = material.tipo_material.insertId;
    } catch (error) {
      [material.tipo_material] = await conexion.query('select codigo from tipos_materiales where nombre = ?', [material.tipo_material]);
      material.tipo_material = material.tipo_material[0]['codigo']
    }

    const codigo_empresa = req.user[0]['codigo_empresa'];
    await materials.updateMaterial(conexion, material);
    req.flash('success', 'Material actualizado correctamente');
    return res.redirect('/materials');
  },

  //Eliminar material (cambiar estado a inactivo)
  deleteMaterial: async function (req, res) {
    await materials.deleteMaterial(conexion, req.body.codigo);
    req.flash('success', 'Material Eliminado correctamente');
    return res.redirect('/materials');
  },

  //Buscar materiales por su nombre
  searchMaterials: async function (req, res) {
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.searchMaterials(conexion, codigo_empresa, req.body.search);
    return res.render('materials/index', {
      title: 'Materiales',
      materials: materiales[0]
    });
  },

  //Buscar materiales por estado (activos, inactivos o todos)
  searchMaterialsFilter: async function(req, res){
    const codigo_empresa = req.user[0]['codigo_empresa'];
    const [materiales] = await materials.searchMaterialsFilter(conexion, codigo_empresa, req.body.filter);
    return res.render('materials/index', {
      title: 'Materiales',
      materials: materiales[0]
    });
  }
}