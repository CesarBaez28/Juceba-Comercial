/*Números de teléfonos*/
CREATE TABLE telefonos (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_telefono primary key(codigo),
  telefono varchar(25) not null unique,
  descripcion varchar(250),
  estado bit default 1
);

/*Tipo de usuarios: empleado, administrador...*/
CREATE TABLE tipo_usuarios(
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_tipo_usuarios primary key(codigo),
  tipo_usuario varchar(100) NOT NULL UNIQUE,
  descripcion varchar(250) DEFAULT '',
  estado bit default 1
);

/*Usuarios del sistema*/
create table usuarios(
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_usuarios primary key(codigo),
  codigo_tipo_usuario int not null, /*fk*/
  constraint fk_codigo_tipo_usuarios_usuarios foreign key (codigo_tipo_usuario) references tipo_usuarios (codigo),
  codigo_telefono int not null,
  constraint fk_codigo_telefono_usuario foreign key(codigo_telefono) references telefonos(codigo),
  nombre_usuario varchar(100) not null unique,
  nombre varchar(100) not null /*Nombre de la persona*/,
  passwd varchar(250) not null,
  foto varchar(250) default '',
  email varchar(50) not null unique, 
  descripcion varchar(250) default '',
  estado bit default 1
);

Select usuarios.codigo, tipo_usuarios.tipo_usuario, usuarios.nombre_usuario, 
  usuarios.nombre, telefonos.telefono, usuarios.email, 
  CASE WHEN usuarios.estado = 1 Then 'Activo' ELSE 'Inactivo' END AS estado
  FROM usuarios join tipo_usuarios on usuarios.codigo_tipo_usuario = tipo_usuarios.codigo
  join telefonos on usuarios.codigo_telefono = telefonos.codigo;