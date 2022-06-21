const download = require('image-downloader')
const fs = require('fs').promises
const path = require('path')

const downloadImage = (arr) => {
  const promises = arr.map((item) => {
    const options = {
      url: item,
      dest: path.join(__dirname, `../public/img/images/${item.split('/').slice(-1)[0]}`),
      extractFilename: false
    }
    return download.image(options)
      .then(({ filename }) => {
        console.log('Image Saved - ', filename)
      })
      .catch((err) => {
        console.error('Error donwloading file >', err)
      })
  })
  return promises
}

const dropImages = () => {
  fs.readdir(path.join(__dirname, '../public/img/images'))
    .then(files => {
      if (files !== null) {
        files.map(file => {
          return fs.unlink(path.join(__dirname, `../public/img/images/${file}`))
        })
      }
    })
    .then(console.log('Images directory dropped.'))
    .catch((err) => console.error(`Error in dropImages: ${err}`))
}

module.exports = { downloadImage, dropImages }
