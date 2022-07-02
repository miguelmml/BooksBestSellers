import printCurrentUser from './modules/printCurrentUser.mjs'

window.addEventListener('load', checkUser)

const goTopButton = document.getElementById('goTopBtn')
const logInOutButton = document.getElementById('logInOut')

window.addEventListener('load', loadingAnimation)
window.addEventListener('load', logInOutListener)
window.addEventListener('load', printCurrentUser)
window.addEventListener('scroll', setGoTopButton)
goTopButton.addEventListener('click', goTop)

function checkUser () {
  const token = sessionStorage.getItem('booksAppToken')
  if (!token) {
    document.getElementById('myListLink').href = '/login'
    document.getElementById('account').href = '/login'
    logInOutButton.textContent = 'Log In | Sign Up'
    logInOutButton.className = 'logIn'
  } else {
    document.getElementById('myListLink').href += '/' + sessionStorage.getItem('booksAppUserEmail') + '/' + token
    document.getElementById('account').href += '/' + sessionStorage.getItem('booksAppUserEmail') + '/' + token
  }
}

function logInOutListener () {
  logInOutButton.addEventListener('click', () => {
    if (logInOutButton.className === 'logIn') {
      window.location.replace('/login')
      return
    }
    sessionStorage.clear()
    window.location.replace('/')
  })
}

function setGoTopButton () {
  if (document.documentElement.scrollTop > 500) {
    goTopButton.style.opacity = 1
  } else {
    goTopButton.style.opacity = 0
  }
}

function goTop () {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

function loadingAnimation () {
  document.getElementById('loadingAnimation').style.display = 'flex'
  setTimeout(() => { document.getElementById('loadingAnimation').style.display = 'none' }, 200)
}
