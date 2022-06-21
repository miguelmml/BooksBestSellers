async function pageHandler (page, book, author) {
  /* Go Google, accept cookies and then search a text with a book and its author */
  const TEXT = `${book} ${author}`

  await page.goto('https://google.es')

  const cookiesButton = await page.waitForSelector('#L2AGLb')
  await cookiesButton.click()

  await page.waitForSelector('.gLFyf')
  await page.$eval('.gLFyf', (element, text) => {
    element.value = text
    element.focus()
  }, TEXT)

  await page.keyboard.press('Enter')

  /* Select the "Shopping" link from results nav and click on it */
  await page.waitForTimeout(1000)
  await page.$$eval('a', elements => elements.forEach(el => {
    if (el.innerText === 'Shopping') {
      el.click()
    }
  }))

  /* Search for the first item which has the comparison with several vendors and click on it */
  await page.waitForSelector('.iXEZD')
  const selector = await page.$('.iXEZD')
  await selector.click()

  /* Select data table and get information from it */
  await page.waitForSelector('tr.sh-osd__offer-row')

  const data = await page.$$eval('tr.sh-osd__offer-row', elements => {
    return elements.map(element => {
      const tds = element.querySelectorAll('td')
      return {
        shop: tds[0].textContent.split('Se abre en una ventana nueva')[0],
        productPricing: tds[2].textContent,
        totalPricing: tds[3].textContent.split('€Precio')[0]
      }
    })
  })

  return data
}

module.exports = pageHandler
