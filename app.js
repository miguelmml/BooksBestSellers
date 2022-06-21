require('dotenv').config()

const app = require('./src/server/server')
const { connectionDB, disconnectDB } = require('./src/db/store')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, (err) => {
  if (err) {
    console.error(`Error to initializing server ${err}`)
  } else {
    console.log(`Server running in port ${port}`)
    connectionDB(process.env.MONGODB_URL, process.env.MONGODB_NAME)
      .then(() => console.log('DB Connected'))
      .catch((error) => console.error(`Error to connect database ${error}`))
  }
})

process.on('SIGINT', function () {
  disconnectDB()
})
