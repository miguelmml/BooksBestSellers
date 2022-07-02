export function messageError (msg) {
  const infoDiv = document.getElementById('infoLogin') || document.getElementById('infoSignUp')
  infoDiv.textContent = msg
}

export function attachMessageErrorResets (classname) {
  const listOfElements = document.querySelectorAll(classname)

  listOfElements.forEach(item => {
    item.addEventListener('focus', () => {
      messageError('')
    })
  })
}
