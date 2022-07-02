import refillData from './modules/refillData.mjs'
import setCardsAnimations from './modules/cardAnimation.mjs'
import loadingAnimation from './modules/loadingAnimation.mjs'

window.addEventListener('load', setCardsAnimations)

const typeSelect = document.getElementById('typeSelect')
const timeSelect = document.getElementById('timeSelect')

typeSelect.addEventListener('change', searchByType)

timeSelect.addEventListener('change', searchByTime)

function searchByType () {
  loadingAnimation()
  const time = timeSelect.value
  const type = typeSelect.value
  fetchBooks(time, type)
}

function searchByTime () {
  loadingAnimation()
  const time = timeSelect.value
  const type = typeSelect.value
  fetchBooks(time, type)
}

function fetchBooks (time, type) {
  const url = new URL(`/api/${time}/${type}`, window.location.origin)

  fetch(url.href)
    .then(response => response.json())
    .then(data => {
      refillData(data, 'btnAddBook', 'ADD TO WISH LIST')
    })
    .then(() => {
      setCardsAnimations()
    })
    .catch((err) => {
      console.error(err)
    })
}

document.querySelector('#contents').addEventListener('click', (event) => {
  if (event.target.className === 'btnAddBook') {
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
