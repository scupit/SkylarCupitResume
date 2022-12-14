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

makePDFFromPage(
  // Run using the dev server, not the production build.
  "http://localhost:5173",
  "./dist/Skylar_Cupit_Resume.pdf"
)
  .catch(console.error)