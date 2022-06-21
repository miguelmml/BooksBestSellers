const puppeteer = require('puppeteer')

async function startBrowser () {
  try {
    console.log('Initializing browser ...')

    const options = {
      headless: true,
      args: ['--disable-setuid-sandbox']
    }

    const browserInstance = await puppeteer.launch(options)

    return browserInstance
  } catch (err) {
    console.error(`Error initializing browser > ${err}`)
  }
}

module.exports = startBrowser
