const express = require('express')
const helmet = require('helmet')

const MainRouter = require('./routes/mainRoutes')
const UsersRouter = require('./routes/usersRouter')
const morganMiddleware = require('./middlewares/logs')

const app = express()

// MIDDLEWARES
app.use(helmet())
app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Statics
app.use('/static', express.static('public'))

// RENDER ENGINE
app.set('view engine', 'pug')

// Routers
app.use('/', MainRouter)
app.use('/user', UsersRouter)

app.get('*', (req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = app
