module.exports = {

  //Registrar entrada
  registerEntrie: function(conexion, entrie){
    return conexion.query('insert into entradas (codigo_empresa, total) values(?,?)',[
      entrie.codigoEmpresa, entrie.total
    ]);
  },

  //Registrar detalles de la entrada
  registerDetailsEntrie: async function (conexion, detailsEntrie){

    let query = 'insert into detalles_entrada (codigo_entrada, codigo_material, codigo_suplidor, codigo_usuario, costo, cantidad) values ';

    //Comprueba si los datos vienen en un array
    if(Array.isArray(detailsEntrie.nameMaterial))
    {
      console.log('entré');
      for (let i = 0; i < detailsEntrie.nameMaterial.length; i++) {
        //Obtengo el codigo del material
        let [codigo_material] = await conexion.query('select codigo from materiales where nombre = ?', [detailsEntrie.nameMaterial[i]]);

        if(i < detailsEntrie.nameMaterial.length - 1){
          query += `(${detailsEntrie.codigo_entrada},${codigo_material[0]['codigo']},${detailsEntrie.suplidor},${detailsEntrie.usuario},${detailsEntrie.entrieCost[i]},${detailsEntrie.entrieAmount[i]}), `;
        } else {
          query += `(${detailsEntrie.codigo_entrada},${codigo_material[0]['codigo']},${detailsEntrie.suplidor},${detailsEntrie.usuario},${detailsEntrie.entrieCost[i]},${detailsEntrie.entrieAmount[i]})`;
        }
      }
      return conexion.query(query);
    }

    let [codigo_material] = await conexion.query('select codigo from materiales where nombre = ?', [detailsEntrie.nameMaterial]);
    query += `(${detailsEntrie.codigo_entrada},${codigo_material[0]['codigo']},${detailsEntrie.suplidor},${detailsEntrie.usuario},${detailsEntrie.entrieCost},${detailsEntrie.entrieAmount})`;
    return conexion.query(query);
  }

}