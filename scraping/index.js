require('dotenv').config()

const { startScraper } = require('./books/books')
const { downloadImage, dropImages } = require('./images/images.js')
const { connectDB, disconnectDB, dropCollection, saveBook } = require('../src/db/store')

scraperJob()

async function scraperJob () {
  await connectDB(process.env.MONGODB_URL, process.env.MONGODB_NAME)
    .then(() => console.log('Database connected'))

  startScraper()
    .then((data) => {
      dropCollection('books')
        .then(() => console.log('Collections dropped. Starting to scrape ...'))
      Promise.allSettled(data.map((book) => saveBook(book)))
        .then(async () => {
          disconnectDB()
          console.log('Books saved, DB disconnected.')
        })
        .catch((err) => {
          console.error('Error saving books >', err)
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
      console.log('Scraping ended.')
    })
    .catch((error) => console.error('Error in scraper > ', error))
}

function getImagesURIs (arr) {
  const imagesUris = arr.map(item => item.imageSource)
  return imagesUris
}
