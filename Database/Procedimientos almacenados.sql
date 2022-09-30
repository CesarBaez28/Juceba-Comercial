/**-----Procedimientos almacenados relacionados con los usuarios del sistema-----------/

/*Obtener todos los usuarios del sistema*/
delimiter //
create procedure p_getUsers()
begin
  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo;
end
//