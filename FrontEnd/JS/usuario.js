const span = document.getElementById('user')
const urlParams = new URLSearchParams(window.location.search)
const usuario = urlParams.get('usuario')

span.innerText = usuario