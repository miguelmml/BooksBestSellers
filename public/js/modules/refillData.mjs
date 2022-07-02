function refillData (data, buttonType, buttonText) {
  const content = document.querySelector('.mainContent__data')
  content.innerHTML = ''

  data.forEach(item => {
    content.innerHTML += createNewCard(item, buttonType, buttonText)
  })
}

function createNewCard (item, buttonType, buttonText) {
  const cardComponent = `
    <div class="bookCard__wrapper">
      <div class="bookCard__descriptionWrapper">
        <h3 class="bookCard__description--title">Overview</h3>
        <p class="bookCard__description">${item.summary}</p>
      </div>
      <div class="bookCard__circleWrapper">
        <div class="bookCard__imageWrapper"><img class="bookCard__image" src="/static/img/books/${item.image}" /></div>
        <div class="bookCard__buttonWrapper">
          <button class=${buttonType} id=${item._id}>${buttonText}</button>
        </div>
      </div>
      <div class="bookCard__statsWrapper">
        <div class="bookCard__stats">
        <p class="bookCard__author">${item.author}</p>
          <p class="bookCard__title">${item.title}</p>
          <p class="bookCard__categories">${item.categories}</p>
          <h3 class="bookCard__prices--head">Vendedor - Precio Del Articulo - Total</h3>
          <div class="bookCard__prices">${iteratePrices(item.prices)}</div>
        </div>
      </div>
    </div>`
  return cardComponent
}

function iteratePrices (prices) {
  let content = ''
  prices.forEach(price => {
    content += `<p>${price.shop} - ${price.productPricing} - ${price.totalPricing}</p>`
  })
  return content
}

export default refillData
