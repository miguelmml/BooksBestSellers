import createNewCard from './newCard.mjs'

window.addEventListener('load', setCardsAnimations)

const typeSelect = document.getElementById('typeSelect')
const timeSelect = document.getElementById('timeSelect')

typeSelect.addEventListener('change', () => {
  loadingAnimation()
  const time = timeSelect.value
  const type = typeSelect.value

  fetchBooks(time, type)
})

timeSelect.addEventListener('change', () => {
  loadingAnimation()
  const time = timeSelect.value
  const type = typeSelect.value

  fetchBooks(time, type)
})

function fetchBooks (time, type) {
  const url = new URL(`/api/${time}/${type}`, window.location.origin)

  fetch(url.href)
    .then(response => response.json())
    .then(data => {
      refillData(data)
    })
    .then(() => {
      setCardsAnimations()
    })
}

function refillData (data) {
  const content = document.querySelector('.mainContent__data')
  content.innerHTML = ''

  data.data.forEach(item => {
    content.innerHTML += createNewCard(item, 'ADD TO MY LIST')
  })
}



function setCardsAnimations () {
  const arr = document.querySelectorAll('.videogameCard__circleWrapper')
  arr.forEach((item) => {
    item.addEventListener('mouseover', () => {
      item.parentElement.querySelector('.videogameCard__descriptionWrapper').style.left = '0'
      item.parentElement.querySelector('.videogameCard__statsWrapper').style.right = '0'
    })
    item.addEventListener('mouseout', () => {
      item.parentElement.querySelector('.videogameCard__descriptionWrapper').style.left = '-100%'
      item.parentElement.querySelector('.videogameCard__statsWrapper').style.right = '-100%'
    })
  })
}

const cardsContainer = document.querySelector('#contents')

cardsContainer.addEventListener('click', (event) => {
  if (event.target.className === 'btnAddVideogame') {
    if (!sessionStorage.getItem('booksAppToken')) {
      window.location.replace('/login')
      return
    }
    const data = {
      itemId: event.target.id,
      email: sessionStorage.getItem('booksAppUserEmail'),
      name: sessionStorage.getItem('booksAppUserName'),
      token: sessionStorage.getItem('booksAppToken')
    }

    const url = new URL('/user/saveBook', window.location.origin)

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch((err) => {
        console.error(err)
      })
  }
})

function loadingAnimation () {
  document.getElementById('loadingAnimation').style.display = 'flex'
  setTimeout(() => { document.getElementById('loadingAnimation').style.display = 'none' }, 400)
}