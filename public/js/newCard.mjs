function createNewCard (item, buttonText) {
  const cardComponent = `
    <div class="videogameCard__wrapper">
      <div class="videogameCard__descriptionWrapper">
        <p class="videogameCard__description">${item.summary}</p>
      </div>
      <div class="videogameCard__circleWrapper">
        <div class="videogameCard__imageWrapper"><img class="videogameCard__image" src="/static/img/images/${item.image}" /></div>
        <div class="videogameCard__rankAndButtonWrapper">
          <button class="btnAddVideogame" id=${item._id}>${buttonText}</button>
          <h3 class="videogameCard__rankNumber">Rank<span class="videogameCard__rankNumber--number"></span></h3>
        </div>
      </div>
      <div class="videogameCard__statsWrapper">
        <div class="videogameCard__stats">
          <p class="videogameCard__title">${item.title}</p>
          <p class="videogameCard__rankNumber">author: ${item.author}</p>
          <p class="videogameCard__score">type:<span class="videogameCard__score--number"></span></p>
          <p class="videogameCard__platform">categories: ${item.categories}</p>
          <div class="videogameCard__date">prices: ${iteratePrices(item.prices)}</div>
        </div>
      </div>
    </div>`
  return cardComponent
}

function iteratePrices (prices) {
  let content = ``
  prices.forEach(price => {
    content += `<p>${price.shop}|${price.productPricing}|${price.totalPricing}</p>`
  })
  return content
}

export default createNewCard
