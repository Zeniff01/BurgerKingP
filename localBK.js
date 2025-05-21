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
Mejoras
 1. Manejo de errores con try/catch:
 Deberías envolver toda la función asíncrona en un bloque try/catch para capturar cualquier error que pueda ocurrir durante la ejecución.
 El browser.close() debe colocarse en un bloque finally para asegurar que el navegador se cierre siempre, incluso si hay errores.

 2. Parametrización con variables:
 En lugar de valores codificados, definir variables al principio para facilitar cambios y reutilización:
 const facturaData = {
   rfc: 'QUBZ020201HH',
   ticket: '232561607',
   tienda: '07097',
   fecha: '26/12/2024'
 };

 3. Reemplazo de setTimeout:
 Los setTimeout fijos se pueden reemplazar por waitForSelector o waitForFunction para esperar eventos específicos en la página.
 Por ejemplo:
 - En lugar de: await new Promise(resolve => setTimeout(resolve, 850));
 - Usar: await page.waitForSelector('#ticket', { visible: true });
 Esto espera específicamente a que el campo esté listo para interactuar.

 4. Comentarios y logs:
 Agregar mensajes de console.log para seguir el progreso y facilitar la depuración.

 Resumen:
 Modifica este script para convertirlo en una función exportable llamada 'procesarFactura' que reciba un objeto
 con los datos (rfc, ticket, tienda, fecha) en lugar de tener valores fijos.
 Incluye manejo de errores con try/catch y asegúrate de que el navegador se cierre correctamente.
 Reemplaza los setTimeout por métodos de espera más eficientes cuando sea posible.
*/