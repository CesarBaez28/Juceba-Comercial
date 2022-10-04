/**-----Procedimientos almacenados relacionados con los usuarios del sistema-----------/

/*Obtener todos los usuarios del sistema*/
delimiter //
create procedure p_getUsers()
begin
  set @nombre_empresa = '';
  set @nombre_empresa = (select empresas.nombre from empresas join usuarios on usuarios.codigo_empresa = empresas.codigo where usuarios.nombre_usuario = "Nini");

  Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo
  join  empresas on usuarios.codigo_empresa = empresas.codigo where empresas.nombre = @nombre_empresa;
end
//

drop procedure p_getUsers;

call p_getUsers();

