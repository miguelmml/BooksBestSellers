require('dotenv').config()

const got = require('got')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { scrapeData } = require('./books')
const { downloadImage, dropImages } = require('./images.js')
const { dropDB, saveBook, disconnectDB, connectionDB } = require('../src/db/store')

fillDatabase()
  .then((data) => {
    Promise.allSettled(data.map((book) => saveBook(book)))
      .then(async () => {
        console.log('Scraping ended.')
        disconnectDB()
      })
      .catch((err) => {
        console.error('Error in the scrapping >', err)
      })

    return getImagesURIs(data)
  })
  .then((uris) => {
    dropImages()
    Promise.allSettled(downloadImage(uris))
      .then(() => {
        console.log('Files saving successfully')
        process.exit(0)
      })
      .catch((err) => {
        console.error('Error donwloading files >', err)
        process.exit(0)
      })
  })
  .catch((error) => console.error('Error in Scraper > ', error))

async function fillDatabase () {
  await connectionDB(process.env.MONGODB_URL, process.env.MONGODB_NAME).then(() => console.log('Database connected'))
  await dropDB('books').then(() => console.log('Collections dropped. Starting to scrape ...'))

  const { body } = await got('https://www.casadellibro.com/libros-mas-vendidos')
  const virtualConsole = new jsdom.VirtualConsole()
  const dom = new JSDOM(body, { virtualConsole })

  const data = []

  data.push(await scrapeData({ dom, index: 0, time: 'lastWeek', type: 'fiction' }))
  // data.push(await scrapeData({ dom, index: 1, time: 'lastWeek', type: 'noFiction' }))
  // data.push(await scrapeData({ dom, index: 2, time: 'lastWeek', type: 'comic' }))
  // data.push(await scrapeData({ dom, index: 3, time: 'lastWeek', type: 'childrenBooks' }))

  // data.push(await scrapeData({ dom, id: '#ficcion22', time: '2022', type: 'fiction' }))
  // data.push(await scrapeData({ dom, id: '#noFiccion22', time: '2022', type: 'noFiction' }))
  // data.push(await scrapeData({ dom, id: '#comic22', time: '2022', type: 'comic' }))
  // data.push(await scrapeData({ dom, id: '#infantil22', time: '2022', type: 'childrenBooks' }))

  // data.push(await scrapeData({ dom, id: '#ficcion2021', time: '2021', type: 'fiction' }))
  // data.push(await scrapeData({ dom, id: '#noFiccion2021', time: '2021', type: 'noFiction' }))
  // data.push(await scrapeData({ dom, id: '#comic2021', time: '2021', type: 'comic' }))
  // data.push(await scrapeData({ dom, id: '#infantil2021', time: '2021', type: 'childrenBooks' }))

  return data.flat()
}

function getImagesURIs (arr) {
  const imagesUris = arr.map(item => item.imageSource)
  return imagesUris
}
