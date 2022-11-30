const addresses = require('../Model/addresses');
const conexion = require('../Config/conectionMysql');
const suppliers = require('../Model/suppliers');

module.exports = {
  index: async function (req, res) {
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    const empresa = req.user[0]['codigo_empresa'];
    const [suplidores] = await suppliers.getSuppliers(conexion, empresa);
    return res.render('suppliers/index', {
      title: 'Suplidores',
      suppliers: suplidores[0],
      provincias
    });
  },

  createSupplier: async function (req, res) {
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    return res.render('suppliers/createSupplier', {
      title: 'Crear Suplidor',
      provincias
    });
  },

  editSupplier: async function (req, res) {
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    const [suplidor] = await suppliers.getSupplierById(conexion, req.query.codigo);
    return res.render('suppliers/editSupplier', {
      title: 'Editar suplidor',
      suppliers: suplidor[0],
      provincias
    });
  },

  //Registrar suplidor
  insertSupplier: async function (req, res) {

    const supplier = {
      name: req.body.name,
      telefono: req.body.telefono,
      provincia: req.body.provincia,
      municipio: req.body.municipio,
      sector: req.body.sector,
      calleYNumero: req.body.calle_y_numero,
    }

    //------ Validar datos del suplidor-----------//
    let telefono, sector, calleYNumero, direccion

    //await conexion.query('START TRANSACTION');

    //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con ese número
    try {
      [telefono] = await conexion.query('insert into telefonos (telefono) values (?)', [supplier.telefono]);
      telefono = telefono.insertId;
    } catch (error) {
      [telefono] = await conexion.query('select codigo from telefonos where telefono = ?', [supplier.telefono]);
      telefono = telefono[0]['codigo']
    }

    //Valido si el sector suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con ese sector
    try {
      [sector] = await conexion.query('insert into sectores (sector) values (?)', [supplier.sector]);
      sector = sector.insertId;
    } catch (error) {
      [sector] = await conexion.query('select codigo from sectores where sector = ?', [supplier.sector]);
      sector = sector[0]['codigo']
    }

    //Valido si la calle y el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa calle y número
    try {
      [calleYNumero] = await conexion.query('insert into callesYnumero (calle_y_numero) values (?)', [supplier.calleYNumero]);
      calleYNumero = calleYNumero.insertId;
    } catch (error) {
      [calleYNumero] = await conexion.query('select codigo from callesYnumero where calle_y_numero = ?', [supplier.calleYNumero]);
      calleYNumero = calleYNumero[0]['codigo']
    }

    //Valido si la dirección completa ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa dirección
    try {
      [direccion] = await conexion.query('insert into direcciones (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia) values (?,?,?,?)', [calleYNumero, sector, supplier.municipio, supplier.provincia]);
      direccion = direccion.insertId;
    } catch (error) {
      [direccion] = await conexion.query('select codigo from direcciones where codigo_calle_y_numero = (?) and codigo_sector = (?) and codigo_municipio = (?) and codigo_provincia = (?)', [calleYNumero, sector, supplier.municipio, supplier.provincia]);
      direccion = direccion[0]['codigo'];
    }

    //Registro el nuevo suplidor
    let empresa = req.user[0]['codigo_empresa'];
    await suppliers.insertSupplier(conexion, telefono, empresa, direccion, supplier.name);
    //await conexion.query('COMMIT');
    req.flash('success', 'Suplidor registrado correctamente');
    return res.redirect('/suppliers');
  },

  //Actualizar datos de un suplidor
  updateSupplier: async function (req, res) {

    const supplier = {
      name: req.body.name,
      telefono: req.body.telefono,
      provincia: req.body.provincia,
      municipio: req.body.municipio,
      sector: req.body.sector,
      calleYNumero: req.body.calle_y_numero,
      estado: req.body.status
    }

    //------ Validar datos del suplidor-----------//
    let telefono, sector, calleYNumero, direccion

   // await conexion.query('START TRANSACTION');

    //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con ese número
    try {
      [telefono] = await conexion.query('insert into telefonos (telefono) values (?)', [supplier.telefono]);
      telefono = telefono.insertId;
    } catch (error) {
      [telefono] = await conexion.query('select codigo from telefonos where telefono = ?', [supplier.telefono]);
      telefono = telefono[0]['codigo']
    }

    //Valido si el sector suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con ese sector
    try {
      [sector] = await conexion.query('insert into sectores (sector) values (?)', [supplier.sector]);
      sector = sector.insertId;
    } catch (error) {
      [sector] = await conexion.query('select codigo from sectores where sector = ?', [supplier.sector]);
      sector = sector[0]['codigo']
    }

    //Valido si la calle y el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa calle y número
    try {
      [calleYNumero] = await conexion.query('insert into callesYnumero (calle_y_numero) values (?)', [supplier.calleYNumero]);
      calleYNumero = calleYNumero.insertId;
    } catch (error) {
      [calleYNumero] = await conexion.query('select codigo from callesYnumero where calle_y_numero = ?', [supplier.calleYNumero]);
      calleYNumero = calleYNumero[0]['codigo']
    }

    //Valido si la dirección completa ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa dirección
    try {
      [direccion] = await conexion.query('insert into direcciones (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia) values (?,?,?,?)', [calleYNumero, sector, supplier.municipio, supplier.provincia]);
      direccion = direccion.insertId;
    } catch (error) {
      [direccion] = await conexion.query('select codigo from direcciones where codigo_calle_y_numero = (?) and codigo_sector = (?) and codigo_municipio = (?) and codigo_provincia = (?)', [calleYNumero, sector, supplier.municipio, supplier.provincia]);
      direccion = direccion[0]['codigo'];
    }

    //Editar el cliente
    (supplier.estado === '1' || supplier.estado === 'true') ? supplier.estado = true : supplier.estado = false; 
    await suppliers.updateSupplier(conexion, supplier.name, telefono,direccion, supplier.estado, req.query.codigo);
    //await conexion.query('COMMIT');
    req.flash('success', 'Suplidor actualizado correctamente');
    return res.redirect('/suppliers');
  },

  deleteSupplier: async function (req, res){
    await suppliers.deteSupplier(conexion, req.body.codigo);
    req.flash('success', 'Suplidor eliminado correctamente');
    return res.redirect('/suppliers');
  },

  getSupplier: async function(req, res){
    const [datos] = await suppliers.getSupplierById(conexion, req.query.supplier);
    return res.json(datos);
  },

  searchSuppliers: async function (req, res){
    //Obtengo el código de la empresa para realizar la búsqueda en la empresa que pertenecen los clientes
    //Lo obtengo de la sesión del usuario
    const codigo_empresa = req.user[0]['codigo_empresa'];

    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);

    const [suplidores] = await suppliers.searchSuppliers(conexion, codigo_empresa, req.body.search);
    return res.render('suppliers/index', {
      title: 'Suplidores',
      suppliers: suplidores[0],
      provincias
    });
  },

  //Buscar suplidores por estado (activos, inactivos o todos);
  searchSuppliersFilter: async function (req, res){
    //Obtengo el código de la empresa para realizar la búsqueda en la empresa que pertenecen los clientes
    //Lo obtengo de la sesión del usuario
    const codigo_empresa = req.user[0]['codigo_empresa'];

    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    
    const [suplidores] = await suppliers.searchSuppliersFilter(conexion, codigo_empresa, req.body.filter);
    return res.render('suppliers/index', {
      title: 'Suplidores',
      suppliers: suplidores[0],
      provincias
    });
  }
}