import printCurrentUser from './modules/printCurrentUser.mjs'

window.document.getElementById('accountForm').addEventListener('click', attachEditListener)
window.document.getElementById('accountForm').addEventListener('click', attachSaveListener)

function attachEditListener (event) {
  event.preventDefault()
  if (event.target.className === 'accountForm__button--edit') {
    if (event.target.id === 'changeUserPassword') {
      window.document.querySelector('.accountForm__inputWrapper--hidden').style.visibility = 'visible'
    }
    const id = event.target.id.slice(6)
    window.document.getElementById(`save${id}`).style.visibility = 'visible'
    window.document.getElementById(`input${id}`).disabled = false
    window.document.getElementById(`input${id}`).select()
  }
}

function attachSaveListener (event) {
  event.preventDefault()
  if (event.target.className === 'accountForm__button--save') {
    const email = sessionStorage.getItem('booksAppUserEmail')
    const id = event.target.id.slice(4)

    console.log('**ID**', id)

    if (id === 'UserEmail') {
      const newEmail = window.document.getElementById('inputUserEmail').value
      if (!checkEmail(newEmail)) {
        window.document.getElementById(`message${id}`).textContent = 'Invalid email'
        return
      }
    }

    if (id === 'UserPassword') {
      const newPass = window.document.getElementById('inputUserPassword').value
      const repeatNewPass = window.document.getElementById('inputRepeatUserPassword').value

      if (!checkPassword(newPass, repeatNewPass)) {
        window.document.querySelectorAll('.accountForm__message--pass').forEach(element => {
          element.textContent = 'Password not secure'
        })
        return
      }
      if (newPass !== repeatNewPass) {
        window.document.querySelectorAll('.accountForm__message--pass').forEach(element => {
          element.textContent = 'Passwords dont match'
        })
        return
      }
    }

    const type = window.document.getElementById(`input${id}`).dataset.type
    const newValue = window.document.getElementById(`input${id}`).value
    const url = new URL('/user/edit', window.location.origin)

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, type, newValue }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        window.document.getElementById(`save${id}`).style.visibility = 'hidden'
        window.document.querySelector('.accountForm__inputWrapper--hidden').style.visibility = 'hidden'
        window.document.getElementById(`input${id}`).disabled = true
        window.document.getElementById(`message${id}`).textContent = data.msg

        const { type, newValue } = data
        if (type === 'name') {
          sessionStorage.setItem('booksAppUserName', newValue)
          printCurrentUser()
        }
        if (type === 'email') {
          sessionStorage.setItem('booksAppUserEmail', newValue)
          printCurrentUser()
        }
      })
  }
}

function checkPassword (password) {
  if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password)) {
    return true
  }
  return false
}

function checkEmail (email) {
  if (/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)) {
    return true
  }
  return false
}
