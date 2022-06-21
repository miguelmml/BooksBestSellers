const got = require('got')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const scrapPrices = require('./prices/index')

async function scrapeData ({ dom, index = 0, id = '.product-slider', time, type }) {
  const items = Array.from(dom.window.document.querySelectorAll(id)[index].querySelectorAll('.align-self-stretch'))

  const links = items.map(item => {
    return {
      link: `https://www.casadellibro.com${item.querySelector('a').href}`
    }
  })

  return Promise.all(links.map(async link => await scrapDetails(link.link, time, type))).then(data => data)
}

async function scrapDetails (link, time, type) {
  const { body: detailsBody } = await got(link)
  const virtualConsole = new jsdom.VirtualConsole()
  const detailsDom = new JSDOM(detailsBody, { virtualConsole })

  const title = detailsDom.window.document.querySelector('h1').textContent.trim()
  const author = detailsDom.window.document.querySelector('.author').textContent.trim()
  const image = detailsDom.window.document.querySelector('.product-image').src.split('/').slice(-1)[0]
  const imageSource = detailsDom.window.document.querySelector('.product-image').src
  const categories = Array.from(detailsDom.window.document.querySelectorAll('.v-chip__content')).map(item => item.textContent.trim())
  const summary = detailsDom.window.document.querySelector('.resume-body').textContent
  const prices = await scrapPrices(title, author)

  return {
    title,
    author,
    image,
    imageSource,
    categories,
    summary,
    prices,
    time: time,
    type: type
  }
}

module.exports = { scrapeData }
