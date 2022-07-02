const express = require('express')
const router = express.Router()

const { getBestSellers } = require('../../db/store')

router.get('/', (req, res) => {
  res.status(200)
  getBestSellers('lastWeek', 'fiction')
    .then((data) => {
      res.render('rankings', { data })
    })
})

router.get('/login', (req, res) => {
  res.status(200)
  res.render('login')
})

router.get('/signUp', (req, res) => {
  res.status(200)
  res.render('signup')
})

router.get('/api/:time/:type', (req, res) => {
  const { time, type } = req.params
  getBestSellers(time, type)
    .then((data) => res.send(data))
})

module.exports = router
