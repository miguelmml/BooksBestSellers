require('dotenv').config()

const { startScraper } = require('./books/books')
const { downloadImage, dropImages } = require('./images/images.js')
const { connectDB, disconnectDB, dropCollection, saveBook } = require('../src/db/store')

scraperJob()

async function scraperJob () {
  try {
    await connectDB(process.env.MONGODB_URL, process.env.MONGODB_NAME)
    console.log('Database connected')

    console.log('Starting to scrape ...')
    const data = await startScraper()

    if (data && data !== '') {
      await dropCollection('books')
      console.log('Collections dropped.')
    }

    const booksPromises = data.map(book => saveBook(book))
    console.log(booksPromises)
    console.log('Collections saved.')

    for await (const book of booksPromises) {
      console.log(`BOOKS SAVED >>> ${book.title} | ${book.author}`)
    }

    disconnectDB()

    const uris = getImagesURIs(data)

    dropImages()

    downloadImage(uris)
    console.log('Images saving successfully.')
    console.log('Scraping ended.')
  } catch (err) {
    console.error(`Error in scraperJob >>> ${err}`)
    process.exit(0)
  }
}

function getImagesURIs (arr) {
  const imagesUris = arr.map(item => item.imageSource)
  return imagesUris
}
