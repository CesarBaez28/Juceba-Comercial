const reports = require('../Model/reports');
const conexion = require('../Config/conectionMysql');
const createReport = require('../Config/reportGenerator');
const company = require('../Model/company');

module.exports = {
  //Renderizar vista reportes
  index: function (req, res) {
    return res.render('reports/index', { title: 'Reportes' });
  },

  //Generar reporte
  generateReport: async function (req, res) {

    let report;

    //Valores de entrada para los reportes
    const inputsReport = {
      report: req.body.reporte_de,
      typeOfReport: req.body.tipo_reporte,
      initialDate: req.body.fecha_inicio + ' 00:00:00',
      finalDate: req.body.fecha_final + ' 23:59:59',
      codigoEmpresa: req.user[0]['codigo_empresa']
    }

    //Objeto de reportes y sus tipos
    const objectReport = {
      Entradas: {
        General: async () => {
          report = createReport.entryGeneralReport;
          return await reports.entrieGeneralReport(conexion, inputsReport)
        },
        Detallado: async () => {
          report = createReport.entryDetailedReport;
          return await reports.entrieDetailedReport(conexion, inputsReport)
        }
      },
      Salidas: {
        General: async () => {
          report = createReport.saleGeneralReport;
          return await reports.saleGeneralReport(conexion, inputsReport)
        },
        Detallado: async () => {
          report = createReport.saleDetailedReport;
          return await reports.salesDetailedReport(conexion, inputsReport)
        }
      }
    }

    //Obentengo los datos del reporte
    const [dataReport] = await objectReport[inputsReport.report][inputsReport.typeOfReport]();

    //Verifico si se obtuvieron datos
    if ([dataReport[0].length] != 0) {
      //Reseteo el formato de las fechas de los datos
      dataReport[0].map((data) => {
        data.fecha = `${data.fecha.getFullYear()}-${data.fecha.getMonth() + 1}-${data.fecha.getDate()}. Hora:${data.fecha.getHours()}:${data.fecha.getMinutes()}:${data.fecha.getSeconds()}`
      });

      //Obtengo los datos de la empresa
      const [empresa] = await company.getCompany(conexion, req.user[0]['codigo_empresa']);

      //Genero el reporte
      report = new report(dataReport[0], empresa[0][0].nombre, inputsReport.report);
      return report.generate(res);
    }
    else
    {
      req.flash('msg', 'No obtuvimos resultados con su búsqueda. Intente un rango de fechas diferente');
      return  res.redirect('/reports');
    }
  }
}