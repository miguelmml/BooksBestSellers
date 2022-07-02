require('dotenv').config()

const server = require('./src/server/server')
const { connectDB, disconnectDB } = require('./src/db/store')

const job = require('./src/jobs/scraper-job')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

job.start()

connectDB(process.env.MONGODB_URL, process.env.MONGODB_NAME)
  .then(() => {
    console.log('DB Connected')
    server.listen(port, host, (err) => {
      if (err) console.error(`Error to initializing server ${err}`)
      console.log(`Server running in port ${port}`)
    })
  })
  .catch((error) => {
    console.error(`Error to connect database ${error}`)
  })

process.on('SIGINT', function () {
  disconnectDB()
})
