const sanitize = (req, res, next) => {
  const { name, email, password } = req.body

  const safeName = validateName(name)
  const safeEmail = validateEmail(email)
  const safePassword = validatePassword(password)

  req.body = {
    name: safeName,
    email: safeEmail,
    password: safePassword
  }
  next()
}

function validateName (name) {
  return String(name).trim().replaceAll(/[^A-Z,a-z,0-9,\s]/g, '')
}

function validateEmail (email) {
  const regEx = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  return regEx.test(email) ? String(email).toLowerCase().trim() : null
}

function validatePassword (password) {
  const regEx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  return regEx.test(password) ? String(password).trim() : null
}

module.exports = sanitize
