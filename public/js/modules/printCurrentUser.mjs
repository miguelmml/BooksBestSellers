export default function printCurrentUser () {
  const name = sessionStorage.getItem('booksAppUserName')
  const email = sessionStorage.getItem('booksAppUserEmail')
  document.getElementById('currentUser').innerText = name
  document.getElementById('currentUserEmail').innerText = email
}
