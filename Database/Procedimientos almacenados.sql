/**-----Procedimientos almacenados relacionados con los usuarios del sistema-----------/

/*Obtener todos los usuarios del sistema según una empresa*/
delimiter //
create procedure p_getUsers (in codigo_empresa int)
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo
  join  empresas on usuarios.codigo_empresa = empresas.codigo where empresas.codigo = codigo_empresa;
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

/*Buscar usuarios por código, nombre, nombre de usuario y tipo de usuario*/
delimiter //
create procedure p_searchUsers (in search varchar(255))
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo
  join empresas on usuarios.codigo_empresa = empresas.codigo 
  where usuarios.nombre like CONCAT('%', search, '%') or usuarios.nombre_usuario like CONCAT('%', search, '%')
  or tipo_usuarios.tipo_usuario like CONCAT ('%', search, '%') or usuarios.codigo like CONCAT('%', search, '%');
end
//




