// const puppeteer = require("puppeteer");
//
//
export const tempDoestnotExist = 10;

// async function getQuotes() {
//   // Start a Puppeteer session with:
//   // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
//   // - no default viewport (`defaultViewport: null` - website page will in full width and height)
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: null,
//   });

//   // Open a new page
//   const page = await browser.newPage();

//   // On this new page:
//   // - open the "http://quotes.toscrape.com/" website
//   // - wait until the dom content is loaded (HTML is ready)
//   await page.goto("https://amsrvs.registry.faa.gov/airmeninquiry/", {
//     waitUntil: "domcontentloaded",
//   });

//   // Find the input field and enter text into it
//   const inputField1 = await page.$("#ctl00_content_ctl01_txtbxLastName");
//   await inputField1.type("Golden");

//   // Find the input field and enter text into it
//   const inputField2 = await page.$("#ctl00_content_ctl01_txtbxCertNo");
//   await inputField2.type("4644603");

//   // Find the button and click it
//   const button = await page.$("#ctl00_content_ctl01_btnSearch");
//   await button.click();

//   // Wait for the page to load after clicking the button
//   await page.waitForNavigation();

//   // Click on a link with the specified ID
//   const link = await page.$(
//     "#ctl00_content_ctl01_drAirmenList_ctl01_lnkbtnAirmenName",
//   );
//   await link.click();

//   // Wait for the next page to load
//   await page.waitForNavigation();

//   // Scrape all label tags with the specified class and return them
//   const labels = await page.$$eval(
//     "label.Cert_Info",
//     (labels) => labels.map((label) => label.textContent.trim()),
//   );
//   console.log(labels);

//   // Close the browser instance
//   await browser.close();
// }

// // Start the scraping
// getQuotes();
