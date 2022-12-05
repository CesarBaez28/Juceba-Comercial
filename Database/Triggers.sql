/*-------Triggers relacionados con las entradas en el inventario-----------*/

/*Actualiza la existencia de material*/
delimiter //
create trigger updateMaterials after insert on detalles_entrada 
for each row update materiales set existencia = existencia + new.cantidad where codigo = new.codigo_material;
//