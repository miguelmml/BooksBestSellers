const { Schema, model } = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { Book, bookSchema } = require('./book')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  books: [bookSchema],
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
})

userSchema.statics.createHash = (password) => {
  return crypto.createHash('sha256', process.env.SALT).update(password).digest('hex')
}

userSchema.statics.findUserByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User does not exist')
    }

    const hash = crypto.createHash('sha256', process.env.SALT).update(password).digest('hex')
    const isPasswordMatch = user.password === hash

    if (!isPasswordMatch) {
      throw new Error('Password does not match')
    }
    return user
  } catch (error) {
    console.error(error)
  }
}

userSchema.statics.findUser = async (email) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    console.error(error)
  }
}

userSchema.statics.updateUserData = async (email, type, newValue) => {
  try {
    const update = {}
    update[type] = newValue

    const user = await User.findOneAndUpdate({ email }, update)
    if (!user) {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error(error)
  }
}

userSchema.methods.generateJWT = async function () {
  try {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })
    user.tokens = { token }
    await user.save()
    return token
  } catch (error) {
    console.error('Error in generateAuthToken', error)
  }
}

userSchema.methods.saveBookInUser = async function (id) {
  try {
    const user = this
    const book = await Book.findById(id)
    user.books.push(book)
    await user.save()
  } catch (error) {
    console.error('Error in saveBookInUser', error)
  }
}

userSchema.methods.deleteBookFromUser = async function (id) {
  try {
    const user = this
    let indexToCut

    user.books.forEach((book, index) => {
      if (book._id.toString() === id) {
        indexToCut = index
      }
    })

    user.books.splice(indexToCut, 1)
    await user.save()
  } catch (error) {
    console.error('Error in deleteBookFromUser', error)
  }
}

const User = model('user', userSchema)

module.exports = { User }
