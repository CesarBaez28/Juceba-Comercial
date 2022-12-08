const PDFGenerator = require('pdfkit-construct')
const fs = require('fs')

/*--------Creación de factura-------------*/
class InvoiceGenerator {
  constructor(invoice) {
    this.invoice = invoice
  }
  // Crear cabeza de la factura...
  generateHeaders(doc) {

    doc.setDocumentHeader({height: '25%'}, () => {
      const date = new Date();
      let company = this.invoice.company[0].nombre;
      company = company.toUpperCase();
      console.log(this.invoice);
  
      doc
        .image('./public/images/Logo.png', 46, 70, { width: 100, height: 100})
        .fillColor('#000')
        .text(`${company}`,50, 50, {align: 'left'})
        .text('FACTURA',275, 50, {align: 'right'})
        .fontSize(10)
        .text(`Número de factura: ${this.invoice.invoiceNumber}`, {align: 'right'})
        .text(`Le atendió: ${this.invoice.user}`, {align: 'right'})
        .text(`Fecha: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}. Hora:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, {align: 'right'})
        .text(`Saldo total: $${this.invoice.total}.00`, {align: 'right'})
        .text(`Cliente: ${this.invoice.client[0].nombre}`, {align: 'right'})
        .moveDown()
        .text(`Dirreción de envío:
               ${this.invoice.client[0].provincia}
               ${this.invoice.client[0].municipio}
               ${this.invoice.client[0].sector}
               ${this.invoice.client[0].calle_y_numero}`, {align: 'right'})
    
      const beginningOfPage = 50;
      const endOfPage = 560;
  
      doc.moveTo(beginningOfPage,200)
         .lineTo(endOfPage,200)
         .stroke()
    });
  }

  //Pie de página 
  generateFooter(doc) {
    doc.setDocumentFooter({}, () => {
      doc
      .fontSize(10)
      .text(`Pago debido al recibo.`, 50, 700, {align: 'center'})
    })
  }

  // Generar tabla con los productos
  generateTable(doc) {

    let products = [{}];

    if(Array.isArray(this.invoice.nameProduct)) 
    {
      for(let i = 0; i < this.invoice.nameProduct.length; i++)
      {
        const item = this.invoice.nameProduct[i];
        const quantity = this.invoice.salesAmount[i];
        const price = this.invoice.salesPrice[i];

        if (i === 0 ) 
        {
          products = [{
            salesAmount:quantity,
            nameProduct: item,
            salesPrice: `$${price}`,
            amount: `$${Number(quantity) * Number(price)}.00`
          }];
          continue;
        }
        products.push({
          salesAmount:quantity,
          nameProduct: item,
          salesPrice: `$${price}`,
          amount: `$${Number(quantity) * Number(price)}.00`
        });
      }
    } 
    else 
    {
      products = [{
        salesAmount: this.invoice.salesAmount,
        nameProduct: this.invoice.nameProduct,
        salesPrice: `$${this.invoice.salesPrice}`,
        amount: `$${Number(this.invoice.salesAmount) * Number(this.invoice.salesPrice)}.00`
      }]
    }

    console.log(products);

    doc.addTable(
      [
        {key: 'salesAmount', label: 'Cantidad', align: 'left'},
        {key: 'nameProduct', label: 'Producto', align: 'left'},
        {key: 'salesPrice', label: 'Precio', align: 'right'},
        {key: 'amount', label: 'Monto', align: 'right'}
      ],products,{
        headBackground : '#ca2921',
        headColor : '#FFF',
        border: {size: 0.1, color: '#cdcdcd'},
        width: "fill_body",
        cellsPadding: 10,
        marginLeft: 40,
        marginRight: 40,
        headAlign: 'center'
      })
    doc.render();
  }

  //Generar la factura
  generate() {
    let theOutput = new PDFGenerator
    const fileName = `Factura ${this.invoice.invoiceNumber}.pdf`

    theOutput.pipe(fs.createWriteStream(`./public/facturas/${fileName}`))

    this.generateHeaders(theOutput);
    theOutput.moveDown();
    this.generateFooter(theOutput);
    this.generateTable(theOutput);
    theOutput.end()
  }
}

module.exports = InvoiceGenerator;