window.document.getElementById('accountForm').addEventListener('click', (event) => {
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
})

window.document.getElementById('accountForm').addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.className === 'accountForm__button--save') {
    const email = sessionStorage.getItem('booksAppUserEmail')

    const id = event.target.id.slice(4)

    if (id === 'UserPassword') {
      // check new pass and the reapeat
      const newPass = window.document.getElementById('inputUserPassword').value
      const repeatNewPass = window.document.getElementById('inputRepeatUserPassword').value

      if (newPass !== repeatNewPass) {
        window.document.querySelectorAll('.accountForm__message--pass').forEach(element => {
          element.textContent = 'New passwords dont match'
        })
        return
      }
      if (!checkPassword(newPass, repeatNewPass)) {
        window.document.querySelectorAll('.accountForm__message--pass').forEach(element => {
          element.textContent = 'Password not secure'
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
})

function printCurrentUser () {
  const name = sessionStorage.getItem('booksAppUserName')
  const email = sessionStorage.getItem('booksAppUserEmail')
  document.getElementById('currentUser').innerText = name
  document.getElementById('currentUserEmail').innerText = email
}

function checkPassword (password, repeatPassword) {
  if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password) && password === repeatPassword) {
    return true
  }
  return false
}
