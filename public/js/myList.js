import refillData from './modules/refillData.mjs'
import setCardsAnimations from './modules/cardAnimation.mjs'

window.addEventListener('load', setCardsAnimations)

const cardsContainer = document.querySelector('.mainContent__data')

cardsContainer.addEventListener('click', (event) => {
  if (event.target.className === 'btnDeleteBook') {
    const data = {
      itemId: event.target.id,
      email: sessionStorage.getItem('booksAppUserEmail'),
      name: sessionStorage.getItem('booksAppUserName'),
      token: sessionStorage.getItem('booksAppToken')
    }

    const url = new URL('/user/deleteBook', window.location.origin)

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        refillData(data, 'btnDeleteBook', 'DELETE')
      })
      .then(() => {
        setCardsAnimations()
      })
      .catch((err) => {
        console.error(err)
      })
  }
})
