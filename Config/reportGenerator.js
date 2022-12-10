const PDFGenerator = require('pdfkit-construct')
const fs = require('fs')

module.exports = {

  /*--------Creación de de reporte general de entradas-----------*/
  entryGeneralReport: class entryGeneralReportGenerator {
    constructor(reportData, companyName, reportName) {
      this.reportData = reportData
      this.companyName = companyName
      this.reportName = reportName
    }
    // Crear cabeza de la factura...
    generateHeaders(doc) {

      doc.setDocumentHeader({ height: '15%' }, () => {
        const date = new Date();
        let company = this.companyName;
        company = company.toUpperCase();
        let reportName = this.reportName;
        reportName = reportName.toUpperCase();
        let total = 0;

        const getTotal = this.reportData.map((data) => {
          total += Number(data.total);
          return total;
        });

        doc
          .fillColor('#000')
          .text(`${company}`, 50, 50, { align: 'left' })
          .text(`REPORTE DE ${reportName} GENERAL`, 275, 50, { align: 'right' })
          .fontSize(10)
          .text(`Fecha: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}. Hora:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, { align: 'right' })
          .text(`Total: $${getTotal[getTotal.length - 1]}.00`, { align: 'right' })

        const beginningOfPage = 50;
        const endOfPage = 560;

        doc.moveTo(beginningOfPage, 115)
          .lineTo(endOfPage, 115)
          .stroke()
      });
    }

    //Pie de página 
    generateFooter(doc) {
      doc.setDocumentFooter({ height: '10%' }, () => {
        //doc
        //.fontSize(10)
        //.text(`GRACIAS POR SU CONFIANZA.`, 50, 700, {align: 'center'})
      })
    }

    // Generar tabla con los datos del reporte
    generateTable(doc) {

      doc.addTable(
        [
          { key: 'fecha', label: 'Fecha', align: 'center' },
          { key: 'suplidor', label: 'Suplidor', align: 'center' },
          { key: 'total', label: 'Total', align: 'right' }
        ], this.reportData, {
        headBackground: '#ca2921',
        headColor: '#FFF',
        border: { size: 0.1, color: '#cdcdcd' },
        width: "fill_body",
        cellsPadding: 10,
        marginLeft: 40,
        marginRight: 40,
        headAlign: 'center'
      })
      doc.render();
    }

    //Generar la factura
    generate(res) {
      let theOutput = new PDFGenerator({bufferPage:true})
      const fileName = `Reporte ${this.reportName}.pdf`

      const stream  = res.writeHead(200,{
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${fileName}`
      });

      theOutput.on('data', (data) =>{stream.write(data)});
      theOutput.on('end',()=>{stream.end()});

      this.generateHeaders(theOutput);
      theOutput.moveDown();
      this.generateFooter(theOutput);
      this.generateTable(theOutput);
      theOutput.end()
    }
  },

  /*---------Creación de de reporte detallado de entradas-----------*/
  entryDetailedReport: class entryDetailedReportGenerator {
    constructor(reportData, companyName, reportName) {
      this.reportData = reportData
      this.companyName = companyName
      this.reportName = reportName
    }
    // Crear cabeza de la factura...
    generateHeaders(doc) {

      doc.setDocumentHeader({ height: '15%' }, () => {
        const date = new Date();
        let company = this.companyName;
        company = company.toUpperCase();
        let reportName = this.reportName;
        reportName = reportName.toUpperCase();
        let total = 0;

        const getTotal = this.reportData.map((data) => {
          total += Number(data.total);
          return total;
        });

        doc
          .fillColor('#000')
          .text(`${company}`, 50, 50, { align: 'left' })
          .text(`REPORTE DE ${reportName} DETALLADO`, 275, 50, { align: 'right' })
          .fontSize(10)
          .text(`Fecha: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}. Hora:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, { align: 'right' })
          .text(`Total: $${getTotal[getTotal.length - 1]}.00`, { align: 'right' })

        const beginningOfPage = 50;
        const endOfPage = 560;

        doc.moveTo(beginningOfPage, 115)
          .lineTo(endOfPage, 115)
          .stroke()
      });
    }

    //Pie de página 
    generateFooter(doc) {
      doc.setDocumentFooter({ height: '10%' }, () => {
        //doc
        //.fontSize(10)
        //.text(`GRACIAS POR SU CONFIANZA.`, 50, 700, {align: 'center'})
      })
    }

    // Generar tabla con los datos del reporte
    generateTable(doc) {

      doc.addTable(
        [
          { key: 'fecha', label: 'Fecha', align: 'center' },
          { key: 'suplidor', label: 'Suplidor', align: 'center' },
          { key: 'usuario', label: 'Usuario', align: 'center' },
          { key: 'material', label: 'Material', align: 'center' },
          { key: 'cantidad', label: 'Cantidad', align: 'center' },
          { key: 'costo', label: 'Costo', align: 'center' },
          { key: 'total', label: 'Monto', align: 'right' }
        ], this.reportData, {
        headBackground: '#ca2921',
        headColor: '#FFF',
        border: { size: 0.1, color: '#cdcdcd' },
        width: "fill_body",
        cellsPadding: 10,
        marginLeft: 40,
        marginRight: 40,
        headAlign: 'center'
      })
      doc.render();
    }

    //Generar la factura
    generate(res) {
      let theOutput = new PDFGenerator({bufferPage:true})
      const fileName = `Reporte ${this.reportName}.pdf`

      const stream  = res.writeHead(200,{
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${fileName}`
      });

      theOutput.on('data', (data) =>{stream.write(data)});
      theOutput.on('end',()=>{stream.end()});

      this.generateHeaders(theOutput);
      theOutput.moveDown();
      this.generateFooter(theOutput);
      this.generateTable(theOutput);
      theOutput.end()
    }
  },

  /*--------Creación de de reporte general de salidas-----------*/
  saleGeneralReport: class saleGeneralReportGenerator {
    constructor(reportData, companyName, reportName) {
      this.reportData = reportData
      this.companyName = companyName
      this.reportName = reportName
    }
    // Crear cabeza de la factura...
    generateHeaders(doc) {

      doc.setDocumentHeader({ height: '15%' }, () => {
        const date = new Date();
        let company = this.companyName;
        company = company.toUpperCase();
        let reportName = this.reportName;
        reportName = reportName.toUpperCase();
        let total = 0;

        const getTotal = this.reportData.map((data) => {
          total += Number(data.total);
          return total;
        });

        doc
          .fillColor('#000')
          .text(`${company}`, 50, 50, { align: 'left' })
          .text(`REPORTE DE ${reportName} GENERAL`, 275, 50, { align: 'right' })
          .fontSize(10)
          .text(`Fecha: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}. Hora:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, { align: 'right' })
          .text(`Total: $${getTotal[getTotal.length - 1]}.00`, { align: 'right' })

        const beginningOfPage = 50;
        const endOfPage = 560;

        doc.moveTo(beginningOfPage, 115)
          .lineTo(endOfPage, 115)
          .stroke()
      });
    }

    //Pie de página 
    generateFooter(doc) {
      doc.setDocumentFooter({ height: '10%' }, () => {
        //doc
        //.fontSize(10)
        //.text(`GRACIAS POR SU CONFIANZA.`, 50, 700, {align: 'center'})
      })
    }

    // Generar tabla con los datos del reporte
    generateTable(doc) {

      doc.addTable(
        [
          { key: 'fecha', label: 'Fecha', align: 'center' },
          { key: 'cliente', label: 'Cliente', align: 'center' },
          { key: 'total', label: 'Total', align: 'right' }
        ], this.reportData, {
        headBackground: '#ca2921',
        headColor: '#FFF',
        border: { size: 0.1, color: '#cdcdcd' },
        width: "fill_body",
        cellsPadding: 10,
        marginLeft: 40,
        marginRight: 40,
        headAlign: 'center'
      })
      doc.render();
    }

    //Generar la factura
    generate(res) {
      let theOutput = new PDFGenerator({bufferPage:true})
      const fileName = `Reporte ${this.reportName}.pdf`

      const stream  = res.writeHead(200,{
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${fileName}`
      });

      theOutput.on('data', (data) =>{stream.write(data)});
      theOutput.on('end',()=>{stream.end()});

      this.generateHeaders(theOutput);
      theOutput.moveDown();
      this.generateFooter(theOutput);
      this.generateTable(theOutput);
      theOutput.end()
    }
  },

  /*--------Creación de de reporte detallado de salidas-----------*/
  saleDetailedReport: class saleDetailedReportGenerator {
    constructor(reportData, companyName, reportName) {
      this.reportData = reportData
      this.companyName = companyName
      this.reportName = reportName
    }
    // Crear cabeza de la factura...
    generateHeaders(doc) {

      doc.setDocumentHeader({ height: '15%' }, () => {
        const date = new Date();
        let company = this.companyName;
        company = company.toUpperCase();
        let reportName = this.reportName;
        reportName = reportName.toUpperCase();
        let total = 0;

        const getTotal = this.reportData.map((data) => {
          total += Number(data.total);
          return total;
        });

        doc
          .fillColor('#000')
          .text(`${company}`, 50, 50, { align: 'left' })
          .text(`REPORTE DE ${reportName} DETALLADO`, 275, 50, { align: 'right' })
          .fontSize(10)
          .text(`Fecha: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}. Hora:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, { align: 'right' })
          .text(`Total: $${getTotal[getTotal.length - 1]}.00`, { align: 'right' })

        const beginningOfPage = 50;
        const endOfPage = 560;

        doc.moveTo(beginningOfPage, 115)
          .lineTo(endOfPage, 115)
          .stroke()
      });
    }

    //Pie de página 
    generateFooter(doc) {
      doc.setDocumentFooter({ height: '10%' }, () => {
        //doc
        //.fontSize(10)
        //.text(`GRACIAS POR SU CONFIANZA.`, 50, 700, {align: 'center'})
      })
    }

    // Generar tabla con los datos del reporte
    generateTable(doc) {

      doc.addTable(
        [
          { key: 'fecha', label: 'Fecha', align: 'center' },
          { key: 'cliente', label: 'Cliente', align: 'center' },
          { key: 'usuario', label: 'Usuario', align: 'center' },
          { key: 'producto', label: 'Producto', align: 'center' },
          { key: 'cantidad', label: 'Cantidad', align: 'center' },
          { key: 'precio', label: 'Precio', align: 'center' },
          { key: 'total', label: 'Monto', align: 'right' }
        ], this.reportData, {
        headBackground: '#ca2921',
        headColor: '#FFF',
        border: { size: 0.1, color: '#cdcdcd' },
        width: "fill_body",
        cellsPadding: 10,
        marginLeft: 40,
        marginRight: 40,
        headAlign: 'center'
      })
      doc.render();
    }

    //Generar la factura
    generate(res) {
      let theOutput = new PDFGenerator({bufferPage:true})
      const fileName = `Reporte ${this.reportName}.pdf`

      const stream  = res.writeHead(200,{
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${fileName}`
      });

      theOutput.on('data', (data) =>{stream.write(data)});
      theOutput.on('end',()=>{stream.end()});

      this.generateHeaders(theOutput);
      theOutput.moveDown();
      this.generateFooter(theOutput);
      this.generateTable(theOutput);
      theOutput.end()
    }
  },
}
