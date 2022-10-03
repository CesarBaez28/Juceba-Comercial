/*Calles y número de calles*/
CREATE TABLE callesYnumero (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_calleYnumero primary key (codigo),
  calle_y_numero varchar (100) not null unique,
  descripcion varchar (250),
  estado bit default 1
);

/*Sectores*/
CREATE TABLE sectores (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_sector primary key (codigo),
  sector varchar (100) not null unique,
  descripcion varchar (250),
  estado bit default 1
);

/*Municipios*/
CREATE TABLE municipios (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_municipio primary key (codigo),
  municipio varchar (50) not null unique,
  descripcion varchar (250),
  estado bit default 1
);

/*Provincias*/
CREATE TABLE provincias (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_provincia primary key (codigo),
  provincia varchar (50) not null unique,
  descripcion varchar (250),
  estado bit default 1
);

/*Direcciones*/
CREATE TABLE  direcciones (
  codigo int auto_increment unique,
  codigo_calle_y_numero int not null,
  constraint fk_codigo_calle_y_numero_direccion foreign key (codigo_calle_y_numero) references callesYnumero(codigo),
  codigo_sector int not null,
  constraint fk_codigo_sector_direccion foreign key (codigo_sector) references sectores(codigo),
  codigo_municipio int not null,
  constraint fk_codigo_municipio_direccion foreign key (codigo_municipio) references municipios (codigo),
  codigo_provincia int not null,
  constraint fk_codigo_provincia_direccion foreign key (codigo_provincia) references provincias (codigo),
  constraint cc_codigo_direccion primary key (codigo_calle_y_numero, codigo_sector, codigo_municipio, codigo_provincia),
  descripcion varchar (250),
  estado bit default 1
);

/*Compañías, negocios o empresas*/
CREATE TABLE empresas (
  codigo int auto_increment /*pk*/,
  constraint fk_codigo_empresa primary key (codigo),
  codigo_telefono int not null,
  constraint fk_codigo_telefono_empresa foreign key (codigo_telefono) references telefonos (codigo),
  codigo_direccion int not null,
  constraint fk_codigo_direccion_empresa foreign key (codigo_direccion) references direcciones (codigo),
  nombre varchar (100),
  email varchar (100),
  descripcion varchar (250),
  estado bit default 1
);

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