const mongoose = require('mongoose')
const { Book } = require('./models/book')
const User = require('./models/user')

const connectDB = (mongoUrl, mongoName) => {
  return mongoose.connect(mongoUrl, {
    dbName: mongoName,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const disconnectDB = () => {
  return mongoose.connection.close(() => console.log('- Database was disconnected -'))
}

const dropCollection = (collection) => mongoose.connection.db.dropCollection(collection)

const saveBook = (obj) => {
  const book = new Book(obj)
  return book.save()
}

const getBestSellers = (time, type) => {
  const data = Book.find({ time, type })
  return data
}

const getMyList = async (email) => {
  const user = await User.findUser(email)
  if (!user) {
    throw new Error('Error at getMyList in store.js -> User not found')
  }
  const data = user.books
  return data
}

module.exports = {
  connectDB,
  disconnectDB,
  dropCollection,
  saveBook,
  getBestSellers,
  getMyList
}
