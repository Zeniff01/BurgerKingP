const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

function logStamp(mensaje) {
  const ahora = new Date();
  const timestamp = ahora.toISOString().replace('T', ' ').substring(0, 19);
  console.log(`${timestamp} - ${mensaje}`);
}

function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve,ms));
}

async function writeHuman(page,selector,texto) {
  await page.waitForSelector(selector,{visible :true});

  //Limpiar campo 
  await page.click(selector,{clickCount: 3});
  await page.keyboard.press('Backspace');

  //Letra por letra
  for(const char of texto){
    await page.type(selector,char)
    const delay = Math.floor(Math.random()* 150 + 50);
    await sleep(delay);

  }
  await sleep(Math.floor(Math.random()* 500 + 300));
}



async function procesarFactura(facturaData) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );
    await page.goto(
      "https://alsea.interfactura.com/RegistroDocumento.aspx?opc=BurgerKing",
      {
        waitUntil: "networkidle2",
      }
    );
    logStamp("Llenado el campo RFC");
    await writeHuman(page,"#rfc",facturaData.rfc);

    logStamp("Llenando campo ticket");
    await writeHuman(page, "#ticket",facturaData.ticket);
    
    logStamp("Llenando campo tienda");
    await writeHuman(page,"#tienda",facturaData.tienda);

    logStamp("Llenando campo fecha");
    await writeHuman(page,"#dtFecha", facturaData.fecha);

    await page.click('button[type="submit"]');
    logStamp("Click en boton enviar");
  } catch (error) {
    logStamp("Error durante la ejecución del script:");
  } finally {
    if (browser) {
      await browser.close();
      logStamp("Navegador cerrado correctamente.");
    }
  }
}

module.exports = { procesarFactura };


/*
Mejoras:

PROTECCIÓN CONTRA DETECCIÓN DE BOTS:(Aplicado)
Usar puppeteer-extra con StealthPlugin
Cambiar el user-agent a uno de navegador normal

SIMULAR COMPORTAMIENTO HUMANO:(Aplicado)
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
