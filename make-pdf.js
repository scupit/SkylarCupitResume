const puppeteer = require("puppeteer");

const urls = {
  dev: "http://localhost:5173",
  localDist: `file://${__dirname}/dist/index.html`,
  preview: "http://localhost:4173",
};

withBrowserDo(browser => {
  return Promise.all([
    makePDFFromPage(
      browser,
      urls.localDist,
      "./dist/Skylar_Cupit_Resume.pdf",
      { omitShadows: false }
    ),
    makePDFFromPage(
      browser,
      urls.localDist,
      "./dist/Skylar_Cupit_Resume_IOS_Friendly.pdf",
      { omitShadows: true }
    )
  ])
})
.catch(console.error);

// ========================================
// Helper functions 
// ========================================

async function withBrowserDo(actionFunc) {
  const browser = await puppeteer.launch({headless: true});
  await actionFunc(browser);
  return await browser.close();
}

async function makePDFFromPage(
  browser,
  pageURL,
  outFilePath,
  options
) {
  const page = await browser.newPage();

  await page.goto(pageURL, {waitUntil: "domcontentloaded"});

  if (options.omitShadows) {
    await page.addStyleTag({
      content: "* { box-shadow: none !important; }"
    });
  }

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
}
