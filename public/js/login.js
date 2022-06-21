const loginForm = document.querySelector('.loginSignUpContent__interface')

loginForm.addEventListener('submit', (event) => {
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
})

function validateEmpty (data) {
  for (const i in data) {
    if (data[i] === '') {
      throw new Error('Please fill out your credentials.')
    }
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

function messageError (msg) {
  document.getElementById('infoLogin').textContent = msg
}

const loginInputList = document.querySelectorAll('.loginInput')

loginInputList.forEach(item => {
  item.addEventListener('focus', () => {
    messageError('')
  })
})
