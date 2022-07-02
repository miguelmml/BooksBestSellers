const express = require('express')
const router = express.Router()

const User = require('../../db/models/user')
const auth = require('../middlewares/auth')
const sanitize = require('../middlewares/sanitize')
const { getMyList } = require('../../db/store')

router.get('/myList/:userEmail/:token', auth, async (req, res) => {
  const { email } = req.user
  getMyList(email).then((data) => {
    res.render('myList', { data })
  })
})

router.get('/account/:userEmail/:token', auth, async (req, res) => {
  const { name, email } = req.user
  res.render('account', { name, email })
})

router.post('/edit', async (req, res) => {
  try {
    let { email, type, newValue } = req.body
    if (type === 'password') {
      newValue = await User.hashingPass(newValue)
    }
    await User.updateUserData(email, type, newValue)
    res.send({ type, newValue, msg: 'Modificado correctamente' })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/signUp', sanitize, async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password })
    user.password = await User.hashingPass(user.password)
    await user.save()
    const token = await user.generateJWT()
    res.send({ name: user.name, email: user.email, token })
  } catch (err) {
    res.status(409).send(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findUserByCredentials(email, password)
    if (!user) {
      throw new Error('invalid-credentials')
    }
    const token = await user.generateJWT()
    res.send({ name: user.name, email: user.email, token })
  } catch (err) {
    if (err.message === 'invalid-credentials') {
      res.status(401).send(err)
    } else {
      res.status(500).send(err)
    }
  }
})

router.post('/saveBook', async (req, res) => {
  try {
    const { email, token, itemId } = req.body
    const user = await User.findUser(email, token)
    if (!user) {
      res.status(401).send({ error: 'User not found' })
    }
    await user.saveBookInUser(itemId)
    res.send()
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/deleteBook', async (req, res) => {
  try {
    const { email, itemId } = req.body
    const user = await User.findUser(email)
    if (!user) {
      res.status(401).send({ error: 'User not found' })
    }
    await user.deleteBookFromUser(itemId)
    getMyList(email).then((data) => {
      res.send(data)
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
