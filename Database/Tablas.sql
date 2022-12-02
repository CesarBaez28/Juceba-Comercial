/*create database JucebaComercial;*/
use JucebaComercial;
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
  codigo_provincia int not null,
  constraint fk_codigo_provincia_municipio foreign key (codigo_provincia) references provincias(codigo),
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

/*Números de teléfonos*/
CREATE TABLE telefonos (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_telefono primary key(codigo),
  telefono varchar(25) not null unique,
  descripcion varchar(250),
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
  nombre varchar (100) not null unique,
  email varchar (100),
  descripcion varchar (250),
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
  constraint fk_codigo_telefono_usuarios foreign key(codigo_telefono) references telefonos(codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_usuarios foreign key (codigo_empresa) references empresas(codigo),
  nombre_usuario varchar(100) not null unique,
  nombre varchar(100) not null /*Nombre de la persona*/,
  passwd varchar(250) not null,
  foto varchar(250) default '',
  email varchar(50) not null unique, 
  descripcion varchar(250) default '',
  estado bit default 1
);

/*Clientes*/
create table clientes (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_cliente primary key(codigo),
  codigo_telefono int not null, /*fk*/
  constraint fk_codigo_telefono_clientes foreign key(codigo_telefono) references telefonos(codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_clientes foreign key(codigo_empresa) references empresas(codigo),
  codigo_direccion int not null,
  constraint fk_codigo_direccion_cientes foreign key(codigo_direccion) references direcciones (codigo),
  nombre varchar(100),
  descripcion varchar(250) default '',
  fecha_registro datetime default CURRENT_TIMESTAMP,
  estado bit default 1
);

/*Suplidores*/
create table suplidores (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_suplidores primary key(codigo),
  codigo_telefono int not null, /*fk*/
  constraint fk_codigo_telefono_suplidores foreign key(codigo_telefono) references telefonos(codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_suplidores foreign key(codigo_empresa) references empresas(codigo),
  codigo_direccion int not null,
  constraint fk_codigo_direccion_suplidores foreign key(codigo_direccion) references direcciones (codigo),
  nombre varchar(100),
  descripcion varchar(250) default '',
  fecha_registro datetime default CURRENT_TIMESTAMP,
  estado bit default 1
);

/*Tipos de materiales (perfiles, barras...)*/
create table tipos_materiales(
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_tipos_materiales primary key(codigo),
  nombre varchar(100) unique,
  descripcion varchar(800) default '',
  estado bit default 1
);

/*Materiales*/
create table materiales (
  codigo int auto_increment, /**/
  constraint pk_codigo_materiales primary key(codigo),
  codigo_tipo_material int not null,
  constraint fk_codigo_tipo_material_materiales foreign key(codigo_tipo_material) references tipos_materiales(codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_materiales foreign key(codigo_empresa) references empresas(codigo),
  nombre varchar (100) unique,
  costo decimal (20,2),
  punto_reorden int default 5,
  existencia int default 0,
  foto varchar(800) default '',
  descripcion varchar(800) default '',
  fecha_registro datetime default CURRENT_TIMESTAMP,
  estado bit default 1
);
