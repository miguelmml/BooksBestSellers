import { validateEmpty, validateEmail, validatePassword } from './modules/validations.mjs'
import { messageError, attachMessageErrorResets } from './modules/messageError.mjs'

window.addEventListener('load', attachMessageErrorResets('.signUpInput'))

document.querySelector('.loginSignUpContent__interface').addEventListener('submit', handleSubmit)

function handleSubmit (event) {
  try {
    event.preventDefault()

    const formData = {
      name: document.getElementById('signUpName').value,
      email: document.getElementById('signUpEmail').value,
      password: document.getElementById('signUpPassword').value,
      passwordRepeated: document.getElementById('signUpPassword__check').value
    }

    validateEmpty(formData)
    validateEmail(formData.email)
    validatePassword(formData.password, formData.passwordRepeated)

    postToSignUp(formData)
  } catch (err) {
    console.error(err)
    messageError(err.message)
  }
}

function postToSignUp (data) {
  const url = `${window.location.protocol}//${window.location.host}/user/signUp`
  const { name, email, password } = data

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json()
      }
    })
    .then((data) => {
      const { name, email, token } = data

      sessionStorage.setItem('booksAppToken', token)
      sessionStorage.setItem('booksAppUserName', name)
      sessionStorage.setItem('booksAppUserEmail', email)

      window.location.replace('/')
    })
    .catch((err) => {
      console.error(err)
      messageError('Email already in use')
      return err
    })
}
