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
  nombre_usuario varchar(100) not null unique,
  nombre varchar(100) not null /*Nombre de la persona*/,
  passwd varchar(250) not null,
  foto varchar(250) default '',
  email varchar(50) not null unique, 
  descripcion varchar(250) default '',
  estado bit default 1
);