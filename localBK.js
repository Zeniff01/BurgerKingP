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
