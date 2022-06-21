import createNewCard from './newCard.mjs'

window.addEventListener('load', setCardsAnimations)

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

const cardsContainer = document.querySelector('.mainContent__data')

cardsContainer.addEventListener('click', (event) => {
  if (event.target.id) {
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
      .then((response) => {
        // window.location.reload() // TODO: hacer igual que en rankings.js, que se vuelva a renderizar solo la parte del contenido no todo.
        return response.json()
      })
      .then((data) => {
        console.log(data)
        refillData(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
})



function refillData (data) {
  const content = document.querySelector('.mainContent__data')
  content.innerHTML = ''

  data.forEach(item => {
    content.innerHTML += createNewCard(item, 'DELETE FROM MY LIST')
  })
}
