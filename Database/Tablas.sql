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

/*Provincias*/
CREATE TABLE provincias (
  codigo int auto_increment /*pk*/,
  constraint pk_codigo_provincia primary key (codigo),
  provincia varchar (50) not null unique,
  descripcion varchar (250),
  estado bit default 1
);

/*Municipios*/
CREATE TABLE municipios (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_municipio primary key (codigo),
  codigo_provincia int not null,
  constraint fk_codigo_provincia_municipio foreign key (codigo_provincia) references provincias(codigo),
  municipio varchar (50) not null unique,
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
  nombre varchar(100),
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
  nombre varchar (100),
  costo decimal (20,2),
  punto_reorden int default 5,
  existencia int default 0,
  foto varchar(800) default '',
  descripcion varchar(800) default '',
  fecha_registro datetime default CURRENT_TIMESTAMP,
  estado bit default 1
);

/*Productos*/
create table productos (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_producto primary key(codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_producto foreign key (codigo_empresa) references empresas(codigo),
  nombre VARCHAR(100), 
  descripcion varchar(800) DEFAULT '',
  precio NUMERIC(20,2),
  foto varchar(800) default '',
  estado BIT DEFAULT 1
);

/*Materiales que necesita cada producto para elaborarse*/
create table productos_materiales (
  codigo_material int not null,
  constraint fk_codigo_material_productos_materiales foreign key (codigo_material) references materiales(codigo),
  codigo_producto int not null,
  constraint fk_codigo_producto_productos_materiales foreign key (codigo_producto) references productos(codigo),
  CONSTRAINT pk_servicios_materiales PRIMARY KEY(codigo_material, codigo_producto) /*pk*/,
  cantidad int 
);

/*Entradas*/
create table entradas (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_entradas primary key (codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_entradas foreign key (codigo_empresa) references empresas(codigo),
  fecha datetime default CURRENT_TIMESTAMP,
  total decimal (20,2) default 0,
  estado bit default 1
);

/*Detalles de la entrada*/
create table detalles_entrada (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_detalles_entrada primary key (codigo),
  codigo_entrada int not null,
  constraint fk_codigo_detalles_entrada_entradas foreign key (codigo_entrada) references entradas(codigo),
  codigo_material int not null, 
  constraint fk_codigo_materiales_detalles_entrada foreign key (codigo_material) references materiales(codigo),
  codigo_suplidor int not null,
  constraint fk_codigo_suplidor_detalles_entrada foreign key (codigo_suplidor) references suplidores(codigo),
  codigo_usuario int not null,
  constraint fk_codigo_usuario_detalles_entrada foreign key (codigo_usuario) references usuarios(codigo),
  costo decimal (20,2) default 0,
  cantidad int, 
  estado bit default 1
);

/*Salidas*/
create table salidas (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_salidas primary key (codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_salidas foreign key (codigo_empresa) references empresas(codigo),
  fecha datetime default CURRENT_TIMESTAMP,
  total decimal (20,2) default 0,
  estado bit default 1
);

/*Detalles de la salida*/
create table detalles_salida (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_detalles_salida primary key (codigo),
  codigo_salida int not null,
  constraint fk_codigo_detalles_salida_salida foreign key (codigo_salida) references salidas(codigo),
  codigo_producto int not null, 
  constraint fk_codigo_codigo_productos_detalles_salida foreign key (codigo_producto) references productos(codigo),
  codigo_cliente int not null,
  constraint fk_codigo_cliente_detalles_salida foreign key (codigo_cliente) references clientes(codigo),
  codigo_usuario int not null,
  constraint fk_codigo_usuario_detalles_salia foreign key (codigo_usuario) references usuarios(codigo),
  precio decimal (20,2) default 0,
  cantidad int, 
  estado bit default 1
);

/*Cotizaciones*/
create table cotizaciones (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_cotizaciones primary key (codigo),
  codigo_empresa int not null,
  constraint fk_codigo_empresa_cotizaciones foreign key(codigo_empresa) references empresas(codigo),
  fecha datetime default CURRENT_TIMESTAMP,
  total decimal (20,2) default 0,
  estado bit default 1
);

/*Detalles de la cotización*/
create table detalles_cotizacion (
  codigo int auto_increment, /*pk*/
  constraint pk_codigo_detalles_cotizacion primary key (codigo),
  codigo_cotizacion int not null,
  constraint fk_codigo_cotizaciones_detalles_cotizacion foreign key (codigo_cotizacion) references cotizaciones (codigo),
  codigo_producto int not null,
  constraint fk_codigo_producto_detalles_cotizacion foreign key (codigo_producto) references productos(codigo),
  codigo_cliente int not null,
  constraint fk_codigo_cliente_detalles_cotizacion foreign key(codigo_cliente) references clientes(codigo),
  codigo_usuario int not null,
  constraint fk_codigo_usuario_detalles_cotizacion foreign key (codigo_usuario) references usuarios(codigo),
  precio decimal (20,2) default 0,
  cantidad int, 
  estado bit default 1
);