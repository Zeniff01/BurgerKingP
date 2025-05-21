const puppeteer = require('puppeteer');

const facturaData={
  rfc:'QUBZ020201HH',
  ticket:'232561607' ,
  store:'07097',
  date:'26/12/2024'
};

async function procesarFactura(facturaData) {
  
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.goto('https://alsea.interfactura.com/RegistroDocumento.aspx?opc=BurgerKing', {
      waitUntil: 'networkidle2'
    });
    console.log('Llenando campo rfc')
    await page.waitForSelector('#rfc',{visible: true});
    await page.type('#rfc', facturaData.rfc, { delay: 80 }); 

    console.log('Llenando campo ticket')
    await page.waitForSelector('#ticket',{visible: true});
    await page.type('#ticket', facturaData.ticket, { delay: 75 });

    console.log('Llenando campo tienda')
    await page.waitForSelector('#tienda',{visible: true});
    await page.type('#tienda', facturaData.store, { delay: 100 });

    console.log('Llenando campo fecha')
    await page.waitForSelector('#dtFecha',{visible: true});
    await page.type('#dtFecha', facturaData.date, { delay: 800 });

    await page.click('button[type="submit"]');
    console.log('Clic en boton enviar')

  } catch (error) {
    console.error('Error durante la ejecución del script:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Navegador cerrado correctamente.');
    }
  }
};

module.exports = {procesarFactura};
procesarFactura(facturaData);


/*
Mejoras:

PROTECCIÓN CONTRA DETECCIÓN DE BOTS:
Usar puppeteer-extra con StealthPlugin
Cambiar el user-agent a uno de navegador normal

SIMULAR COMPORTAMIENTO HUMANO:
Crear una función para escribir como humano:
Limpiar campo antes de escribir
Usar velocidades variables al teclear
Hacer que se vea natural

Agregar pausas aleatorias entre acciones

MENSAJES DE ERROR CLAROS:
Agregar timestamp a todos los logs: "2025-05-27 15:42:23 - Acción..."


ESTRUCTURA DE DATOS JSON:
Crear archivo factura-data.json con formato:
{
"rfc": "QUBZ020201HH",
"ticket": "232561607",
"store": "07097",
"date": "26/12/2024"
}
Modificar el código para leer este JSON:
const facturaData = require('./factura-data.json');
Separar la ejecución en un archivo main.js o index.js:
const { procesarFactura } = require('./index');
const facturaData = require('./factura-data.json');
procesarFactura(facturaData);

*/