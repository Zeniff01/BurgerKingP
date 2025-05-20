const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({ headless: false, edefaultViewport: false,userDataDir: "./tmp", }); // headless:false para ver el navegador
  const page = await browser.newPage();

  await page.goto('https://alsea.interfactura.com/RegistroDocumento.aspx?opc=BurgerKing', { waitUntil: 'networkidle2' });

  await page.type('#rfc', 'QUBZ020201HH', { delay: 800 }); 
  await new Promise(resolve => setTimeout(resolve, 850));
  await page.type('#ticket', '232561607',{delay: 750});
  await new Promise(resolve => setTimeout(resolve, 1500));
  await page.type('#tienda','07097',{delay: 1000});
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.type('#dtFecha','26/12/2024',{delay: 800});
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await page.click('button[type="submit"]');

  await browser.close();
})();


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