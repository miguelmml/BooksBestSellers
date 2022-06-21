const signUpForm = document.querySelector('.loginSignUpContent__interface')

signUpForm.addEventListener('submit', (event) => {
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
})

function validateEmpty (data) {
  for (const i in data) {
    if (data[i] === '') {
      throw new Error('Please fill out all inputs.')
    }
  }
}

function validateEmail (email) {
  const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

  if (!emailRegEx.test(email)) {
    throw new Error('Email has no valid format')
  }
}

function validatePassword (password, passwordRepeated) {
  const passwordRegEx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

  if (!passwordRegEx.test(password)) {
    throw new Error(`Invalid password, please include:
      - A number
      - A capital letter
      - A lowercase letter
      - 8-16 characters
    `)
  }

  if (password !== passwordRepeated) {
    throw new Error('Passwords do not match')
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

function messageError (msg) {
  document.getElementById('infoSignUp').textContent = msg
}

const signUpInputs = document.querySelectorAll('.signUpInput')

signUpInputs.forEach(item => {
  item.addEventListener('focus', () => {
    messageError('')
  })
})
