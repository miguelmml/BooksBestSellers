const startBrowser = require('./startBrowser')
const pageHandler = require('./pageHandler')

async function scrapPrices (book, author) {
  try {
    const browser = await startBrowser()

    const page = await browser.newPage()

    const data = await pageHandler(page, book, author)

    browser.close()

    console.log(`Scraping PRICES of the book >>> ${book} | ${author}`)

    return data
  } catch (err) {
    console.log('Could not scrape prices -> ', err)
  }
}

module.exports = scrapPrices
