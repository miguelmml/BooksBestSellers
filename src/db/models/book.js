const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  imageSource: {
    type: String,
    required: true,
    trim: true
  },
  categories: [{
    type: String,
    trim: true
  }],
  summary: {
    type: String,
    trim: true,
    default: 'No Data'
  },
  prices: [{
    type: Object
  }],
  time: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
})

const Book = model('book', bookSchema)

module.exports = { Book, bookSchema }
