import { validateEmpty } from './modules/validations.mjs'
import { messageError, attachMessageErrorResets } from './modules/messageError.mjs'

window.addEventListener('load', attachMessageErrorResets('.loginInput'))

document.querySelector('.loginSignUpContent__interface').addEventListener('submit', handleSubmit)

function handleSubmit (event) {
  try {
    event.preventDefault()

    const formData = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value
    }

    validateEmpty(formData)
    postToLogIn(formData)
  } catch (err) {
    console.error(err)
    messageError(err.message)
  }
}

function postToLogIn (data) {
  const url = `${window.location.protocol}//${window.location.host}/user/login`
  const { email, password } = data

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json()
      }
      if (response.status === 401) {
        throw new Error('Login failed! Check your credentials')
      }
      if (response.status === 500) {
        throw new Error('Internal server error')
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
      messageError(err.message)
    })
}
