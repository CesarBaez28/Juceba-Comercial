const addresses = require('../Model/addresses');
const conexion = require('../Config/conectionMysql');
const client = require('../Model/clients');
const clients = require('../Model/clients');

module.exports = {
  index: async function (req, res) {
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    const empresa = req.user[0]['codigo_empresa'];
    const [clients] = await client.getClients(conexion, empresa);
    return res.render('clients/index', {
      title: 'Clientes',
      provincias,
      clients: clients[0]
    });
  },

  createClient: async function (req, res) {
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    return res.render('clients/createClient', { title: 'Crear cliente', provincias });
  },

  editClient: async function (req, res) {
    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    const [cliente] = await clients.getClientById(conexion, req.query.codigo);
    return res.render('clients/editClient', {
      title: 'Editar cliente',
      clients: cliente[0],
      provincias
    });
  },

  insertClient: async function (req, res) {

    const client = {
      name: req.body.name,
      telefono: req.body.telefono,
      provincia: req.body.provincia,
      municipio: req.body.municipio,
      sector: req.body.sector,
      calleYNumero: req.body.calle_y_numero,
    }

    //------ Validar datos del cliente-----------//
    let telefono, sector, calleYNumero, direccion

    //await conexion.query('START TRANSACTION');

    //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con ese número
    try {
      [telefono] = await conexion.query('insert into telefonos (telefono) values (?)', [client.telefono]);
      telefono = telefono.insertId;
    } catch (error) {
      [telefono] = await conexion.query('select codigo from telefonos where telefono = ?', [client.telefono]);
      telefono = telefono[0]['codigo']
    }

    //Valido si el sector suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con ese sector
    try {
      [sector] = await conexion.query('insert into sectores (sector) values (?)', [client.sector]);
      sector = sector.insertId;
    } catch (error) {
      [sector] = await conexion.query('select codigo from sectores where sector = ?', [client.sector]);
      sector = sector[0]['codigo']
    }

    //Valido si la calle y el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa calle y número
    try {
      [calleYNumero] = await conexion.query('insert into callesYnumero (calle_y_numero) values (?)', [client.calleYNumero]);
      calleYNumero = calleYNumero.insertId;
    } catch (error) {
      [calleYNumero] = await conexion.query('select codigo from callesYnumero where calle_y_numero = ?', [client.calleYNumero]);
      calleYNumero = calleYNumero[0]['codigo']
    }

    //Valido si la dirección completa ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa dirección
    try {
      [direccion] = await conexion.query('insert into direcciones (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia) values (?,?,?,?)', [calleYNumero, sector, client.municipio, client.provincia]);
      direccion = direccion.insertId;
    } catch (error) {
      [direccion] = await conexion.query('select codigo from direcciones where codigo_calle_y_numero = (?) and codigo_sector = (?) and codigo_municipio = (?) and codigo_provincia = (?)', [calleYNumero, sector, client.municipio, client.provincia]);
      direccion = direccion[0]['codigo'];
    }

    //Registro el nuevo cliente
    let empresa = req.user[0]['codigo_empresa'];
    await clients.insertClient(conexion, telefono, empresa, direccion, client.name);
    //await conexion.query('COMMIT');
    req.flash('success', 'Cliente registrado correctamente');
    return res.redirect('/clients');
  },

  updateClient: async function (req, res) {

    const client = {
      name: req.body.name,
      telefono: req.body.telefono,
      provincia: req.body.provincia,
      municipio: req.body.municipio,
      sector: req.body.sector,
      calleYNumero: req.body.calle_y_numero,
      estado: req.body.status
    }

    //------ Validar datos del cliente-----------//
    let telefono, sector, calleYNumero, direccion

    //await conexion.query('START TRANSACTION');

    //Valido si el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con ese número
    try {
      [telefono] = await conexion.query('insert into telefonos (telefono) values (?)', [client.telefono]);
      telefono = telefono.insertId;
    } catch (error) {
      [telefono] = await conexion.query('select codigo from telefonos where telefono = ?', [client.telefono]);
      telefono = telefono[0]['codigo']
    }

    //Valido si el sector suministrado ya existe, si es así obtengo el código(pk) del registro para registrar la compañía con ese sector
    try {
      [sector] = await conexion.query('insert into sectores (sector) values (?)', [client.sector]);
      sector = sector.insertId;
    } catch (error) {
      [sector] = await conexion.query('select codigo from sectores where sector = ?', [client.sector]);
      sector = sector[0]['codigo']
    }

    //Valido si la calle y el número suministrado ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa calle y número
    try {
      [calleYNumero] = await conexion.query('insert into callesYnumero (calle_y_numero) values (?)', [client.calleYNumero]);
      calleYNumero = calleYNumero.insertId;
    } catch (error) {
      [calleYNumero] = await conexion.query('select codigo from callesYnumero where calle_y_numero = ?', [client.calleYNumero]);
      calleYNumero = calleYNumero[0]['codigo']
    }

    //Valido si la dirección completa ya existe, si es así obtengo el código(pk) del registro para registrar el cliente con esa dirección
    try {
      [direccion] = await conexion.query('insert into direcciones (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia) values (?,?,?,?)', [calleYNumero, sector, client.municipio, client.provincia]);
      direccion = direccion.insertId;
    } catch (error) {
      [direccion] = await conexion.query('select codigo from direcciones where codigo_calle_y_numero = (?) and codigo_sector = (?) and codigo_municipio = (?) and codigo_provincia = (?)', [calleYNumero, sector, client.municipio, client.provincia]);
      direccion = direccion[0]['codigo'];
    }

    (client.estado === '1' || client.estado === 'true') ? client.estado = true : client.estado = false; 
    await clients.updateClient(conexion, client.name, telefono,direccion, client.estado, req.query.codigo);
    //await conexion.query('COMMIT');
    req.flash('success', 'Cliente Actualizado correctamente');
    return res.redirect('/clients');
  },

  deleteClient: async function(req, res){
    await clients.deteClient(conexion, req.body.codigo);
    req.flash('success', 'Cliente eliminado correctamente');
    return res.redirect('/clients');
  },

  getClients: async function(req, res){
    const [datos] = await clients.getClientById(conexion, req.query.client);
    return res.json(datos);
  },

  searchClients: async function (req, res){
    //Obtengo el código de la empresa para realizar la búsqueda en la empresa que pertenecen los clientes
    //Lo obtengo de la sesión del usuario
    const codigo_empresa = req.user[0]['codigo_empresa'];

    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);

    const [clients] = await client.searchClients(conexion,codigo_empresa,req.body.search);
    return res.render('clients/index', {
      title: 'Clientes',
      provincias,
      clients: clients[0]
    });
  },

  searchClientsFilter: async function(req, res){
    //Obtengo el código de la empresa para realizar la búsqueda en la empresa que pertenecen los clientes
    //Lo obtengo de la sesión del usuario
    const codigo_empresa = req.user[0]['codigo_empresa'];

    //Obtengo las provincias de país para registrar la dirección
    const [provincias] = await addresses.getProvincias(conexion);
    const [clients] = await client.searchClientsFilter(conexion, codigo_empresa, req.body.filter);
    return res.render('clients/index', {
      title: 'Clientes',
      provincias,
      clients: clients[0]
    });
  }
}