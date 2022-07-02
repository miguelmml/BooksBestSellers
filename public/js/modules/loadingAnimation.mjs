export default function loadingAnimation () {
  document.getElementById('loadingAnimation').style.display = 'flex'
  setTimeout(() => { document.getElementById('loadingAnimation').style.display = 'none' }, 400)
}
