const cron = require('cron')
const { spawn } = require('child_process')

const job = new cron.CronJob(
  '00 00 04 * * 1',
  function () {
    const child = spawn('npm', ['run', 'scrap'], { shell: true })

    child.stdout.on('data', (data) => {
      console.log(`child stdout >>\n${data}`)
    })

    child.stderr.on('data', (data) => {
      console.error(`child stderr >>\n${data}`)
    })

    child.on('error', (err) => {
      console.error(`Failed in subprocess >>\n${err}`)
    })

    child.on('exit', function (code, signal) {
      console.log(`Child process exited with code: ${code} and signal ${signal}`)
    })
  },
  null,
  false,
  'Europe/Madrid'
)

module.exports = job
