const puppeteer = require("puppeteer");

async function makePDFFromPage(pageURL, outFilePath) {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(pageURL, {waitUntil: "domcontentloaded"});

  await page.pdf({
    preferCSSPageSize: true,
    printBackground: true,
    path: outFilePath,
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  });
  await browser.close();
}

const urls = {
  dev: "http://localhost:5173",
  localDist: `file://${__dirname}/dist/index.html`,
  preview: "http://localhost:4173",
};

makePDFFromPage(
  urls.localDist,
  "./dist/Skylar_Cupit_Resume.pdf"
)
  .catch(console.error)