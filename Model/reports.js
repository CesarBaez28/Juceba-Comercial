module.exports = {
  
  //Reporte  de entradas general
  entrieGeneralReport: function (conexion, inputsReport){
    return conexion.query('call p_generalEntrieReport(?,?,?)', 
    [inputsReport.initialDate, inputsReport.finalDate, 
      inputsReport.codigoEmpresa]);
  },

  //Reporte de entradas detallado
  entrieDetailedReport: function (conexion, inputsReport) {
    return conexion.query('call p_detailEntrieReport(?,?,?)', 
    [inputsReport.initialDate, inputsReport.finalDate, 
      inputsReport.codigoEmpresa]);
  },

  //Reporte de salidas general
  saleGeneralReport: function(conexion, inputsReport){
    return conexion.query('call p_generalSalesReport(?,?,?)', 
    [inputsReport.initialDate, inputsReport.finalDate, 
      inputsReport.codigoEmpresa]);
  },

  //Reporte de salidas detallado
  salesDetailedReport: function(conexion, inputsReport){
    return conexion.query('call p_detailSalesReport(?,?,?)', 
    [inputsReport.initialDate, inputsReport.finalDate, 
      inputsReport.codigoEmpresa]);
  }
}