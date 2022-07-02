function setCardsAnimations () {
  const father = document.querySelector('.mainContent__data')
  father.addEventListener('mouseover', e => {
    if (e.target.className === 'bookCard__wrapper') {
      const ball = e.target.querySelector('.bookCard__circleWrapper')
      const description = e.target.querySelector('.bookCard__descriptionWrapper')
      const stats = e.target.querySelector('.bookCard__statsWrapper')
      const btn = e.target.querySelector('.btnAddBook') || e.target.querySelector('.btnDeleteBook')

      ball.style.backgroundColor = 'rgba(255, 255, 255, .1)'
      description.style.left = '0'
      stats.style.right = '0'

      description.addEventListener('mouseover', () => {
        ball.style.backgroundColor = 'rgba(255, 255, 255, .1)'
        stats.style.right = '0'
      })
      stats.addEventListener('mouseover', () => {
        ball.style.backgroundColor = 'rgba(255, 255, 255, .1)'
        description.style.left = '0'
      })
      btn.addEventListener('mouseover', () => {
        ball.style.backgroundColor = 'rgba(255, 255, 255, .1)'
        description.style.left = '0'
        stats.style.right = '0'
      })

      e.target.addEventListener('mouseout', () => {
        ball.style.backgroundColor = 'transparent'
        e.target.querySelector('.bookCard__descriptionWrapper').style.left = '-100%'
        e.target.querySelector('.bookCard__statsWrapper').style.right = '-100%'
      })
    }
  })
}

export default setCardsAnimations
