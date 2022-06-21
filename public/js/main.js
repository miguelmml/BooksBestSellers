window.addEventListener('load', checkUser)

const goTopButton = document.getElementById('goTopBtn')
const logInOutButton = document.getElementById('logInOut')

window.addEventListener('load', loadingAnimation)
window.addEventListener('load', logInOutListener)
window.addEventListener('load', printCurrentUser)
window.addEventListener('scroll', scrollFunction)
goTopButton.addEventListener('click', topFunction)

function checkUser () {
  const token = sessionStorage.getItem('booksAppToken')
  if (!token) {
    document.getElementById('myListLink').href = '/login'
    document.getElementById('account').href = '/login'
    logInOutButton.textContent = 'Log In'
    logInOutButton.className = 'logIn'
  } else {
    document.getElementById('myListLink').href += '/' + sessionStorage.getItem('booksAppUserEmail') + '/' + token
    document.getElementById('account').href += '/' + sessionStorage.getItem('booksAppUserEmail') + '/' + token
  }
}

function logInOutListener () {
  logInOutButton.addEventListener('click', () => {
    console.log(logInOutButton.className)
    if (logInOutButton.className === 'logIn') {
      window.location.replace('/login')
      return
    }
    sessionStorage.clear()
    window.location.replace('/')
  })
}

function printCurrentUser () {
  const name = sessionStorage.getItem('booksAppUserName')
  const email = sessionStorage.getItem('booksAppUserEmail')
  document.getElementById('currentUser').innerText = name
  document.getElementById('currentUserEmail').innerText = email
}

function scrollFunction () {
  if (document.documentElement.scrollTop > 500) {
    goTopButton.style.display = 'block'
  } else {
    goTopButton.style.display = 'none'
  }
}

function topFunction () {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

function loadingAnimation () {
  document.getElementById('loadingAnimation').style.display = 'flex'
  setTimeout(() => { document.getElementById('loadingAnimation').style.display = 'none' }, 200)
}
