/*-------Triggers relacionados con las entradas en el inventario-----------*/

/*Actualiza la existencia de material*/
delimiter //
create trigger updateMaterials after insert on detalles_entrada 
for each row update materiales set existencia = existencia + new.cantidad where codigo = new.codigo_material;
//

/*-------Triggers relacionados con las salidas en el inventario-----------*/

/*Acualiza la existencia de materiales al registrar una salida y verifica si se dispone de los materiales suficientes para realizarla*/
delimiter //
create trigger registrar_salida after insert on detalles_salida 
for each row 
begin
  /* Creo una tabla temporal de productos_materiales para verificar si está disponible la cantidad suficiente de material para registrar el producto*/
  create temporary table if not exists t_productos_materiales(
   codigo_material int, 
   codigo_producto int,
   cantidad int 
  );

  /*  Inserto en la tabla temporal los detalles del producto que se registró*/
  insert into t_productos_materiales (codigo_material, codigo_producto, cantidad)
  select codigo_material, codigo_producto, cantidad from productos_materiales where codigo_producto = new.codigo_producto;

  /* Declaro una variable @contador para ir verificando si están disponibles cada uno de los materiales necesarios del producto.*/
  set @contador  = (select count(*) from t_productos_materiales);

  while (select @contador) > 0 do
    /*Declaro las variables cantidad y existencia para verificar si se cuentan con los materiales suficientes.*/
    set @cantidad = (select  cantidad from t_productos_materiales limit 1);
    set @existencia = (select existencia from materiales where materiales.codigo = (select codigo_material from t_productos_materiales limit 1));
    
    /*Verifico si está disponible la cantidad de material y actualizo  la existencia en la tabla materiales. De lo contrario, envía un error.*/
    if @existencia > @cantidad * (new.cantidad) then
      update materiales set materiales.existencia = materiales.existencia - @cantidad * new.cantidad
	  where materiales.codigo = (select codigo_material from t_productos_materiales limit 1);
	else
	  call raise_error; /*llamo un procedimiento que no existe para generar el error*/
    end if;
    
    delete from t_productos_materiales limit 1;
    set @contador = (select count(*) from t_productos_materiales);
  end while; 
end;
//



select * from materiales;
select * from salidas;
select * from detalles_salida;

drop trigger registrar_salida;

  create temporary table t_productos_materiales(
   codigo_material int, 
   codigo_producto int,
   cantidad int 
  );

  /*  Inserto en la tabla temporal los detalles del producto que se registró*/
  insert into t_productos_materiales (codigo_material, codigo_producto, cantidad)
  select codigo_material, codigo_producto, cantidad from productos_materiales where codigo_producto = 26;
  

