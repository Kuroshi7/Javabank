const span = document.getElementById('user')
const ul = document.getElementById('dados')
const urlParams = new URLSearchParams(window.location.search)
const key = (urlParams.get('key')).slice(-11)

const descriptograph = () => {
    let cpf = ''
    let indice = key.length
    while(cpf.length < key.length){
        const n = key[indice-1]
        cpf = cpf + n
        indice--
    }
    return cpf
}

const renderUser = (usuario) => {
    span.innerText = usuario.name

    ul.innerHTML = `
        <li>Email: ${usuario.email}</li>
        <li>CPF: ${usuario.cpf}</li>
        <li>Idade: ${usuario.idade}</li>
    `   
}

const carregarDadosUsuario = async (cpf) => {
    console.log(cpf)
    await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpf}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                renderUser(data.list[0])
                console.log(data.list[0])
            })
            .catch(error => {
                console.log('ERROR: ' + error)
                window.location.href = '404.html'
            })
}

document.addEventListener('DOMContentLoaded', () => {
    const cpf = descriptograph()
    carregarDadosUsuario(cpf)
})

