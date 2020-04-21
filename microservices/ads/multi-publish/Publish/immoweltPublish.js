const puppeteer = require('puppeteer');

// Only for renting for now 
// Immowelt.de
const email = "damaskeheiko@gmail.com";
const password = "RBK-s#xW_-z4S+D";


async function clickXPath(page, XPath){
  const el = await page.$x(XPath)
  await el[0].click();
}

async function typeXPath(page, XPath, text){
  const el = await page.$(XPath)
  await el.type(text);
}

(async () => {


    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];
 
    let browser = await puppeteer.launch({
        headless: false,
        args: args
    });


//   const browser = await puppeteer.launch();



  const page = await browser.newPage();

//   page.on('response', async resp => {
//     if (resp.ok && resp.url === url) {
//       console.log(await resp.text());
//     }
//   });

  await page.goto('https://signin.immowelt.de/');

  // Login
  await page.type('#user-name-input', email);
  await page.type('#password-input', password); 
  await page.click("#signin-button");

  // Go to Publish rent ad page
    await page.goto('https://www.immowelt.de/anbieten/immobilienanzeigen');
    // vermiete, verkauf, nachmiete
    await clickXPath(page, `//*[@id="js_stepper"]/div[2]/div[1]/button[1]`);
    // Wohnung, Haus, Wohnen auf Zeit, WG-Zimmer, Sonsitges
    await clickXPath(page, `//*[@id="js_stepper"]/div[2]/div[2]/button[1]`);
    // Deutschland, Ausland
    await clickXPath(page, `//*[@id="js_stepper"]/div[2]/div[3]/button[1]`);
    // Click on Anzeige Aufgeben Button
    await clickXPath(page, `//*[@id="js_stepper"]/div[2]/div[4]/a`);


  // Enter address
    // Street
    // await page.waitForNavigation()
    setTimeout(null, )
    await page.waitForXPath(`//*[@id="app"]/div[3]/div[2]/div[1]/div/div[2]/div[1]/div[1]/input`)
    const el = await page.$(`//*[@id="app"]/div[3]/div[2]/div[1]/div/div[2]/div[1]/div[1]/input`)
    await el.type("Eichbuschallee");
    // await typeXPath(page, `//*[@id="app"]/div[3]/div[2]/div[1]/div/div[2]/div[1]/div[1]/input`, "Eichbuschallee")

  // await page.click('//*[@id="js_stepper"]/div[2]/div[1]/button[1]');
  // await page.click('//*[@id="js_stepper"]/div[2]/div[2]/button[1]');
  // await page.click('//*[@id="js_stepper"]/div[2]/div[3]/button[1]');



  await page.screenshot({path: "immowelt.png"});


//   await Promise.all([
//     page.waitForNavigation(),
//   ]);

//   await page.waitForNavigation();
  

//   const [response] = await Promise.all([
//     page.waitForNavigation(waitOptions),
//     page.click(selector, clickOptions),
//   ]);
//   await page.screenshot({path: "ebaykleinanzeige.png"});
//   await browser.close();
})();
