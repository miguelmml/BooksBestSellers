export function validateEmpty (data) {
  for (const i in data) {
    if (data[i] === '') {
      throw new Error('Please fill out all inputs.')
    }
  }
}

export function validateEmail (email) {
  const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

  if (!emailRegEx.test(email)) {
    throw new Error('Email has no valid format')
  }
}

export function validatePassword (password, passwordRepeated) {
  console.log('validando...')
  const passwordRegEx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

  if (!passwordRegEx.test(password)) {
    throw new Error(`Invalid password, include at least:\n
      A capital letter, a number and 8-16 characters
    `)
  }

  if (password !== passwordRepeated) {
    throw new Error('Passwords do not match')
  }

  return true
}
