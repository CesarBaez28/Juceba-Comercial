/**-----Procedimientos almacenados relacionados con los usuarios del sistema-----------/

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