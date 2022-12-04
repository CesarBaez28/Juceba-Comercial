/*-----Procedimientos almacenados relacionados con los usuarios del sistema-----------/*

/*Obtener todos los usuarios del sistema según una empresa (menos el usuario actual que inicia sesión)*/
delimiter //
create procedure p_getUsers (in codigo_empresa int, in currentUser int)
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo
  join  empresas on usuarios.codigo_empresa = empresas.codigo where empresas.codigo = codigo_empresa and usuarios.codigo != currentUser;
end
//

/*Obtener todos los usuarios activos del sistema según una empresa (menos el usuario actual que inicia sesión)*/
delimiter //
create procedure p_getActiveUsers (in codigo_empresa int, in currentUser int)
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo
  join  empresas on usuarios.codigo_empresa = empresas.codigo where empresas.codigo = codigo_empresa and usuarios.estado = 1 and usuarios.codigo != currentUser;
end
//

/*Obtener un usuario por su código*/
delimiter //
create procedure p_getUserById (in codigo int)
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, usuarios.foto,
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo WHERE usuarios.codigo = codigo;
end
//

/*Buscar usuarios por código, nombre, nombre de usuario y tipo de usuario (menos el usuario actual que inicia sesión)*/
delimiter //
create procedure p_searchUsers (in search varchar(255), in codigo_empresa int, in currentUser int)
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo
  join  empresas on usuarios.codigo_empresa = empresas.codigo 
  where empresas.codigo = codigo_empresa and (usuarios.nombre like CONCAT('%', search, '%') or usuarios.nombre_usuario like CONCAT('%', search, '%')
  or tipo_usuarios.tipo_usuario like CONCAT ('%', search, '%') or usuarios.codigo like CONCAT('%', search, '%')) and usuarios.codigo != currentUser;
end
//

/*Obtener todos los usuarios del sistema según una empresa, estado (Activo, inactivo o todos menos el usuario actual que inicia sesión)*/
delimiter //
create procedure p_getUserByStatus (in codigo_empresa int, in search varchar(25), in currentUser int)
begin
  /*Busca usuarios por el estado especificado*/
  if search = 'Activos' or search = 'Inactivos' then 
      
      if search = 'Activos' then
        set @estado = 1;
	  else 
        set @estado = 0;
	  end if;
  
      Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
	  usuarios.nombre, telefonos.telefono, usuarios.email, 
      CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
      FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
	  join telefonos on usuarios.codigo_telefono = telefonos.codigo
      join  empresas on usuarios.codigo_empresa = empresas.codigo where empresas.codigo = codigo_empresa and usuarios.estado = (select @estado) and usuarios.codigo != currentUser;
      
  /*Buscar todos los usuarios (Activos e inactivos)*/
  else 
    call p_getUsers(codigo_empresa, currentUser);
  end if;
end
//

/*---------Procedimientos almacenados relacionados con los clientes del sistema--------*/

/*Obtener todos los clientes activos del sistema de una empresa*/
delimiter //
create procedure p_getActiveClients (in codigo_empresa int)
begin
  select clientes.codigo, clientes.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, clientes.fecha_registro,
  CASE WHEN clientes.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM clientes join telefonos on telefonos.codigo = clientes.codigo_telefono
  join empresas on empresas.codigo = clientes.codigo_empresa
  join direcciones on direcciones.codigo = clientes.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where clientes.codigo_direccion = direcciones.codigo and clientes.estado = 1 and clientes.codigo_empresa = codigo_empresa;
end
//

/*Obtener un cliente por su código*/
delimiter //
create procedure p_getClientById (in codigo int)
begin
  select clientes.codigo, clientes.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, clientes.fecha_registro, 
  CASE WHEN clientes.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM clientes join telefonos on telefonos.codigo = clientes.codigo_telefono
  join empresas on empresas.codigo = clientes.codigo_empresa
  join direcciones on direcciones.codigo = clientes.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where clientes.codigo_direccion = direcciones.codigo and clientes.codigo = codigo;
end
//

/*Buscar clientes por su nombre, código o dirección*/
delimiter //
create procedure p_searchClients (in codigo_empresa int, in search varchar(255))
begin
  select clientes.codigo, clientes.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, clientes.fecha_registro,  
  CASE WHEN clientes.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM clientes join telefonos on telefonos.codigo = clientes.codigo_telefono
  join empresas on empresas.codigo = clientes.codigo_empresa
  join direcciones on direcciones.codigo = clientes.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where clientes.codigo_direccion = direcciones.codigo and clientes.estado = 1 and clientes.codigo_empresa = codigo_empresa
  and (clientes.codigo like CONCAT('%', search, '%') or clientes.nombre like CONCAT('%', search, '%') 
  or provincias.provincia like CONCAT('%', search, '%') or municipios.municipio like CONCAT('%', search, '%')
  or sectores.sector like CONCAT('%', search, '%') or callesYnumero.calle_y_numero like CONCAT('%', search, '%'));
end
//

/*Obtener todos los clientes  del sistema de una empresa*/
delimiter //
create procedure p_getClients (in codigo_empresa int)
begin
  select clientes.codigo, clientes.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, clientes.fecha_registro,  
  CASE WHEN clientes.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM clientes join telefonos on telefonos.codigo = clientes.codigo_telefono
  join empresas on empresas.codigo = clientes.codigo_empresa
  join direcciones on direcciones.codigo = clientes.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where clientes.codigo_direccion = direcciones.codigo and clientes.codigo_empresa = codigo_empresa;
end
//

/*Obtener todos los cliente del sistema según una empresa y estado (Activo, inactivo o todos)*/
delimiter //
create procedure p_getClientsByStatus (in codigo_empresa int, in search varchar(25))
begin
  /*Busca usuarios por el estado especificado*/
  if search = 'Activos' or search = 'Inactivos' then 
      
      if search = 'Activos' then
        set @estado = 1;
	  else 
        set @estado = 0;
	  end if;
      
	  select clientes.codigo, clientes.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
      provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
      callesYnumero.calle_y_numero, clientes.fecha_registro,  
      CASE WHEN clientes.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
      FROM clientes join telefonos on telefonos.codigo = clientes.codigo_telefono
      join empresas on empresas.codigo = clientes.codigo_empresa
      join direcciones on direcciones.codigo = clientes.codigo_direccion
      join provincias on provincias.codigo = direcciones.codigo_provincia 
      join municipios on municipios.codigo = direcciones.codigo_municipio
      join sectores on sectores.codigo = direcciones.codigo_sector
      join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
      where clientes.codigo_direccion = direcciones.codigo and clientes.estado = (select @estado) and clientes.codigo_empresa = codigo_empresa;
  /*Buscar todos los clientes (Activos e inactivos)*/
  else 
    call p_getClients(codigo_empresa);
  end if;
end
//

/*---------Procedimientos almacenados relacionados con los suplidores del sistema--------*/

/*Obtener todos los suplodores activos del sistema de una empresa*/
delimiter //
create procedure p_getActiveSuppliers (in codigo_empresa int)
begin
  select suplidores.codigo, suplidores.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, suplidores.fecha_registro,
  CASE WHEN suplidores.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM suplidores join telefonos on telefonos.codigo = suplidores.codigo_telefono
  join empresas on empresas.codigo = suplidores.codigo_empresa
  join direcciones on direcciones.codigo = suplidores.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where suplidores.codigo_direccion = direcciones.codigo and suplidores.estado = 1 and suplidores.codigo_empresa = codigo_empresa;
end
//

/*Obtener un suplidor por su código*/
delimiter //
create procedure p_getSupplierById (in codigo int)
begin
  select suplidores.codigo, suplidores.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, suplidores.fecha_registro,
  CASE WHEN suplidores.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM suplidores join telefonos on telefonos.codigo = suplidores.codigo_telefono
  join empresas on empresas.codigo = suplidores.codigo_empresa
  join direcciones on direcciones.codigo = suplidores.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where suplidores.codigo_direccion = direcciones.codigo and suplidores.codigo = codigo;
end
//

/*Buscar suplidores por su nombre, código o dirección*/
delimiter //
create procedure p_searchSuppliers (in codigo_empresa int, in search varchar(255))
begin
  select suplidores.codigo, suplidores.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, suplidores.fecha_registro,  
  CASE WHEN suplidores.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM suplidores join telefonos on telefonos.codigo = suplidores.codigo_telefono
  join empresas on empresas.codigo = suplidores.codigo_empresa
  join direcciones on direcciones.codigo = suplidores.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where suplidores.codigo_direccion = direcciones.codigo and suplidores.estado = 1 and suplidores.codigo_empresa = codigo_empresa
  and (suplidores.codigo like CONCAT('%', search, '%') or suplidores.nombre like CONCAT('%', search, '%') 
  or provincias.provincia like CONCAT('%', search, '%') or municipios.municipio like CONCAT('%', search, '%')
  or sectores.sector like CONCAT('%', search, '%') or callesYnumero.calle_y_numero like CONCAT('%', search, '%'));
end
//

/*Obtener todos los suplidores del sistema de una empresa*/
delimiter //
create procedure p_getSuppliers (in codigo_empresa int)
begin
  select suplidores.codigo, suplidores.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
  provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
  callesYnumero.calle_y_numero, suplidores.fecha_registro,
  CASE WHEN suplidores.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
  FROM suplidores join telefonos on telefonos.codigo = suplidores.codigo_telefono
  join empresas on empresas.codigo = suplidores.codigo_empresa
  join direcciones on direcciones.codigo = suplidores.codigo_direccion
  join provincias on provincias.codigo = direcciones.codigo_provincia 
  join municipios on municipios.codigo = direcciones.codigo_municipio
  join sectores on sectores.codigo = direcciones.codigo_sector
  join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
  where suplidores.codigo_direccion = direcciones.codigo and suplidores.codigo_empresa = codigo_empresa;
end
//

/*Obtener todos los suplidores del sistema según una empresa y estado (Activo, inactivo o todos)*/
delimiter //
create procedure p_getSuppliersByStatus (in codigo_empresa int, in search varchar(25))
begin
  /*Busca usuarios por el estado especificado*/
  if search = 'Activos' or search = 'Inactivos' then 
      
      if search = 'Activos' then
        set @estado = 1;
	  else 
        set @estado = 0;
	  end if;
      
    select suplidores.codigo, suplidores.nombre, telefonos.telefono, provincias.codigo as 'codigo_provincia', 
    provincias.provincia, municipios.codigo as 'codigo_municipio', municipios.municipio, sectores.sector, 
    callesYnumero.calle_y_numero, suplidores.fecha_registro,
    CASE WHEN suplidores.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado 
    FROM suplidores join telefonos on telefonos.codigo = suplidores.codigo_telefono
    join empresas on empresas.codigo = suplidores.codigo_empresa
    join direcciones on direcciones.codigo = suplidores.codigo_direccion
    join provincias on provincias.codigo = direcciones.codigo_provincia 
    join municipios on municipios.codigo = direcciones.codigo_municipio
    join sectores on sectores.codigo = direcciones.codigo_sector
    join callesYnumero on callesYnumero.codigo = direcciones.codigo_calle_y_numero
    where suplidores.codigo_direccion = direcciones.codigo and suplidores.estado = (select @estado) and suplidores.codigo_empresa = codigo_empresa;
  /*Buscar todos los clientes (Activos e inactivos)*/
  else 
    call p_getSuppliers(codigo_empresa);
  end if;
end
//

/*---------Procedimientos almacenados relacionados con los materiales del sistema------------*/

/*Obtener todos los materiales activos del sistema de una empresa*/
delimiter //
create procedure p_getActiveMaterials (in codigo_empresa int)
begin
  select materiales.codigo, materiales.nombre, materiales.codigo_tipo_material, tipos_materiales.nombre as 'tipo_material', 
  materiales.costo, materiales.punto_reorden, materiales.existencia, materiales.foto, materiales.descripcion,
  CASE when materiales.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from materiales join empresas on materiales.codigo_empresa = empresas.codigo
  join tipos_materiales on tipos_materiales.codigo = materiales.codigo_tipo_material
  where materiales.codigo_tipo_material = tipos_materiales.codigo and materiales.estado = 1 and materiales.codigo_empresa = codigo_empresa;
end
//

/*Obtener un material según su código*/
delimiter //
create procedure p_getMaterialByID (in codigo int)
begin
  select materiales.codigo, materiales.nombre, materiales.codigo_tipo_material, tipos_materiales.nombre as 'tipo_material', 
  materiales.costo, materiales.punto_reorden, materiales.existencia, materiales.foto, materiales.descripcion,
  CASE when materiales.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from materiales join empresas on materiales.codigo_empresa = empresas.codigo
  join tipos_materiales on tipos_materiales.codigo = materiales.codigo_tipo_material
  where materiales.codigo_tipo_material = tipos_materiales.codigo and materiales.codigo = codigo;
end
//

/*Buscar materiales por su nombre*/
delimiter //
create procedure p_searchMaterials (in codigo_empresa int, in search varchar(255))
begin
  select materiales.codigo, materiales.nombre, materiales.codigo_tipo_material, tipos_materiales.nombre as 'tipo_material', 
  materiales.costo, materiales.punto_reorden, materiales.existencia, materiales.foto, materiales.descripcion,
  CASE when materiales.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from materiales join empresas on materiales.codigo_empresa = empresas.codigo
  join tipos_materiales on tipos_materiales.codigo = materiales.codigo_tipo_material
  where materiales.codigo_tipo_material = tipos_materiales.codigo and materiales.estado = 1 and 
  materiales.codigo_empresa = codigo_empresa and materiales.nombre like CONCAT('%', search, '%');
end
//

/*Obtener todos los materiales  del sistema de una empresa*/
delimiter //
create procedure p_getMaterials (in codigo_empresa int)
begin
  select materiales.codigo, materiales.nombre, materiales.codigo_tipo_material, tipos_materiales.nombre as 'tipo_material', 
  materiales.costo, materiales.punto_reorden, materiales.existencia, materiales.foto, materiales.descripcion,
  CASE when materiales.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from materiales join empresas on materiales.codigo_empresa = empresas.codigo
  join tipos_materiales on tipos_materiales.codigo = materiales.codigo_tipo_material
  where materiales.codigo_tipo_material = tipos_materiales.codigo and materiales.codigo_empresa = codigo_empresa;
end
//

/*Obtener todos los materiales del sistema según una empresa y estado (Activo, inactivo o todos)*/
delimiter //
create procedure p_getMaterialsByStatus (in codigo_empresa int, in search varchar(25))
begin
  /*Busca usuarios por el estado especificado*/
  if search = 'Activos' or search = 'Inactivos' then 
      
      if search = 'Activos' then
        set @estado = 1;
	  else 
        set @estado = 0;
	  end if;
      
  select materiales.codigo, materiales.nombre, materiales.codigo_tipo_material, tipos_materiales.nombre as 'tipo_material', 
  materiales.costo, materiales.punto_reorden, materiales.existencia, materiales.foto, materiales.descripcion,
  CASE when materiales.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from materiales join empresas on materiales.codigo_empresa = empresas.codigo
  join tipos_materiales on tipos_materiales.codigo = materiales.codigo_tipo_material
  where materiales.codigo_tipo_material = tipos_materiales.codigo and materiales.estado = (select @estado) and materiales.codigo_empresa = codigo_empresa;
  /*Buscar todos los clientes (Activos e inactivos)*/
  else 
    call p_getMaterials(codigo_empresa);
  end if;
end
//

/*---------Procedimientos almacenados relacionados con los productos del sistema------------*/

/*Obtener todos los productos activos del sistema de una empresa*/
delimiter //
create procedure p_getActiveproducts (in codigo_empresa int)
begin
  select productos.codigo, productos.codigo_empresa, productos.nombre, productos.precio, productos.foto, productos.descripcion,
  CASE when productos.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from productos join empresas on productos.codigo_empresa = empresas.codigo
  where productos.estado = 1 and productos.codigo_empresa = codigo_empresa;
end
//

/*Obtener  los materiales de un producto*/
delimiter //
create procedure p_getmaterialsProduct (in codigo_producto int)
begin
  select productos_materiales.codigo_producto, productos_materiales.codigo_material, materiales.nombre, productos_materiales.cantidad
  from productos_materiales join materiales on productos_materiales.codigo_material = materiales.codigo
  where productos_materiales.codigo_producto = codigo_producto;
end
//

call p_getmaterialsProduct (27)

/*Obtener un producto por su código*/
delimiter //
create procedure p_getProductById (in codigo_producto int)
begin
  select productos.codigo, productos.codigo_empresa, productos.nombre, productos.precio, productos.foto, productos.descripcion,
  CASE when productos.estado = 1 then 'Activo' ELSE 'Inactivo' END AS estado 
  from productos where productos.codigo = codigo_producto;
end
//