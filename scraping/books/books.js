const got = require('got')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const scrapPrices = require('../prices/index')

async function startScraper () {
  const { body } = await got('https://www.casadellibro.com/libros-mas-vendidos')
  const virtualConsole = new jsdom.VirtualConsole()
  const dom = new JSDOM(body, { virtualConsole })

  const data = []

  data.push(await scrapeData({ dom, index: 0, time: 'lastWeek', type: 'fiction' }))
  data.push(await scrapeData({ dom, index: 1, time: 'lastWeek', type: 'noFiction' }))
  data.push(await scrapeData({ dom, index: 2, time: 'lastWeek', type: 'comic' }))
  data.push(await scrapeData({ dom, index: 3, time: 'lastWeek', type: 'childrenBooks' }))

  data.push(await scrapeData({ dom, id: '#ficcion22', time: '2022', type: 'fiction' }))
  data.push(await scrapeData({ dom, id: '#noFiccion22', time: '2022', type: 'noFiction' }))
  data.push(await scrapeData({ dom, id: '#comic22', time: '2022', type: 'comic' }))
  data.push(await scrapeData({ dom, id: '#infantil22', time: '2022', type: 'childrenBooks' }))

  data.push(await scrapeData({ dom, id: '#ficcion2021', time: '2021', type: 'fiction' }))
  data.push(await scrapeData({ dom, id: '#noFiccion2021', time: '2021', type: 'noFiction' }))
  data.push(await scrapeData({ dom, id: '#comic2021', time: '2021', type: 'comic' }))
  data.push(await scrapeData({ dom, id: '#infantil2021', time: '2021', type: 'childrenBooks' }))

  return data.flat()
}

async function scrapeData ({ dom, index = 0, id = '.product-slider', time, type }) {
  const items = Array.from(dom.window.document.querySelectorAll(id)[index].querySelectorAll('.align-self-stretch'))

  const links = items.map(item => {
    return {
      link: `https://www.casadellibro.com${item.querySelector('a').href}`
    }
  })

  const data = []

  for (const link of links) {
    const dataFromLink = await scrapDetails(link.link, time, type)
    data.push(dataFromLink)
  }

  return data
}

async function scrapDetails (link, time, type) {
  const { body: detailsBody } = await got(link)
  const virtualConsole = new jsdom.VirtualConsole()
  const detailsDom = new JSDOM(detailsBody, { virtualConsole })

  const title = detailsDom.window.document.querySelector('h1').textContent.trim()
  const author = detailsDom.window.document.querySelector('.author').textContent.trim()

  console.log('Scraping DETAILS of the book >>> ', title, ' | ', author)

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
    time,
    type
  }
}

module.exports = { startScraper, scrapeData }
