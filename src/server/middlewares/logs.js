const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const moment = require('moment-timezone')

const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format()
})

morgan.format('myformat', '[:date[Europe/Madrid]] ":method :url" :status :res[content-length] - :response-time ms')

const morganMiddleware = morgan('myformat', { stream: accessLogStream })

module.exports = morganMiddleware
