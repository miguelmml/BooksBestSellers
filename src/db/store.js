const mongoose = require('mongoose')
const { Book } = require('./models/book')
const { User } = require('./models/user')

mongoose.set('useFindAndModify', false)

const connectionDB = (mongoUrl, mongoName) => {
  return mongoose.connect(mongoUrl, {
    dbName: mongoName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
}

const disconnectDB = () => {
  return mongoose.connection.close(() => console.log('- Database was disconnected -'))
}

const dropDB = (collection) => mongoose.connection.db.dropCollection(collection)

const saveBook = (obj) => {
  const book = new Book(obj)
  return book.save()
}

const getBooks = async (time, type) => {
  const data = await Book.find({ time: time, type: type }).exec()
  return data
}

const getBestSellers = (time, type) => {
  const data = Book.find({ time: time, type: type })
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
  connectionDB,
  disconnectDB,
  dropDB,
  saveBook,
  getBooks,
  getBestSellers,
  getMyList
}
