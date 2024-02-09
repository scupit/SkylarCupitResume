const puppeteer = require("puppeteer");

const urls = {
  dev: "http://localhost:5173",
  localDist: `file://${__dirname}/dist/index.html`,
  preview: "http://localhost:4173",
};

const chosenUrl = chooseUrlUsingArgs();

if (Array.isArray(chosenUrl)) {
  console.error(`Error: Invalid URL selector '${chosenUrl[0]}' given.`);
  process.exit(1);
}

withBrowserDo(browser => {
  console.log(`Making PDFs using "${chosenUrl}"`)

  return Promise.all([
    makePDFFromPage(
      browser,
      chosenUrl,
      "./dist/Skylar_Cupit_Resume.pdf",
      {
        omitShadows: false,
        whichDoc: "resume"
      }
    ),
    makePDFFromPage(
      browser,
      chosenUrl,
      "./dist/Skylar_Cupit_Resume_IOS_Friendly.pdf",
      {
        omitShadows: true,
        whichDoc: "resume"
      }
    ),
    makePDFFromPage(
      browser,
      chosenUrl,
      "./dist/Skylar_Cupit_Cover_Letter.pdf",
      {
        omitShadows: false,
        whichDoc: "cover-letter"
      }
    )
  ])
})
.catch(console.error);

// ========================================
// Helper functions 
// ========================================

function chooseUrlUsingArgs() {
  // 1: node
  // 2: make-pdf.js
  if (process.argv.length < 3) {
    return urls.localDist;
  }

  // 3: 'selector string'
  switch (process.argv[2]) {
    case "dev":     return urls.dev;
    case "preview": return urls.preview;
    case "dist":    return urls.localDist;
    default:        return [process.argv[2]];
  }
}

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

  // await page.goto(pageURL, {waitUntil: "domcontentloaded"});
  
  // https://pptr.dev/api/puppeteer.page.goto
  // https://pptr.dev/api/puppeteer.puppeteerlifecycleevent
  await page.goto(pageURL, {waitUntil: "networkidle0"});

  if (options.omitShadows) {
    await page.addStyleTag({
      content: "* { box-shadow: none !important; }"
    });
  }

  switch (options.whichDoc) {
    case "resume":
      await page.addStyleTag({
        content: "#cover-letter { display: none !important; }"
      })
      break;
    case "cover-letter":
      await page.addStyleTag({
        content: "#resume { display: none !important; }"
      })
      break;
    default:
      throw new Error(`Invalid whichDoc ${options.whichDoc}`);
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
