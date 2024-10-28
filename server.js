const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // headless: false allows you to see the browser
    const page = await browser.newPage();
    await page.goto('https://sports.yahoo.com/odds/');
  
    
    await page.waitForSelector('div > .bet-packs-wrapper');
  
    const data = await page.evaluate(() => {
       const  element = document.querySelector('div > .bet-packs-wrapper');
       return element ? element.outerHTML : null;
    });
    console.log(data);

    await new Promise(resolve => setTimeout(resolve, 10000));

    await browser.close();
  })();