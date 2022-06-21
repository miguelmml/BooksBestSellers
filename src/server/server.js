const express = require('express')
const helmet = require('helmet')
var bodyParser = require('body-parser')

const MainRouter = require('./routes/mainRoutes')
const UsersRouter = require('./routes/usersRouter')
const { morganMiddleware } = require('./middlewares/logs')
// const { getAllRanking, getComingSoon, getMyList } = require('../models/store')
// const User = require('../models/moongose_models/users')

const app = express()

// MIDDLEWARES
app.use(helmet())
app.use(morganMiddleware)
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// RENDER ENGINE
app.set('view engine', 'pug')

app.use('/', MainRouter)
app.use('/user', UsersRouter)

app.get('*', (req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = app
