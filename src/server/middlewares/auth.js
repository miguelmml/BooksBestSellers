const jwt = require('jsonwebtoken')
const { User } = require('../../db/models/user')

const auth = async (req, res, next) => {
  try {
    const { userEmail, token } = req.params
    if (userEmail === null || token === null) {
      console.error('Error at auth middleware -> User or token didnt send')
      res.redirect('/login')
      return
    }

    if (!jwt.verify(token, process.env.JWT_KEY)) {
      console.error('Error at auth middleware -> Invalid token')
      res.redirect('/login')
      return
    }

    const user = await User.findUser(userEmail)

    if (!user) {
      console.error('Error at auth middleware -> User not found')
      res.redirect('/login')
      return
    }
    if (user.tokens[0].token !== token) {
      console.error('Error at auth middleware -> Token dont match')
      res.redirect('/login')
      return
    }
    req.user = user
    next()
  } catch (error) {
    console.error('Error in Auth midleware -> ', error)
    res.redirect('/login')
  }
}

module.exports = { auth }
