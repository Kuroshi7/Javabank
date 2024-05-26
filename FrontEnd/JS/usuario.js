
const logout = document.querySelector('.logout')
const urlParams = new URLSearchParams(window.location.search)
const key = urlParams.get('key')

const renderUser = (usuario) => {
    const ul = document.getElementById('dados')
    document.querySelector('.conta').innerText += usuario.name + " " + usuario.cpf
    document.querySelector('.saldo').innerText += " " + usuario.contaCorrente.saldo + " R$";
    ul.innerHTML = `
        <li>Email: ${usuario.email}</li>
        <li>CPF: ${usuario.cpf}</li>
        <li>Idade: ${usuario.idade}</li>
    `   
}

const carregarDadosUsuario = async (cpf) => {
    await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpf}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                renderUser(data.list[0])
            })
            .catch(error => {
                console.log('ERROR: ' + error)
                window.location.href = '404.html'
            })
}

const carregarSession = async () => {
    const idSession = await fetch(`http://localhost:8080/session/`)
    .then(response => { return response.json(); })
    .then(data => { 
        //if(data.list[0].id == key) carregarDadosUsuario(data.list[0].cpf)
        let c = false 
        for(let object of data.list){
            if(object.id == key) {
                carregarDadosUsuario(object.cpf)
                c = true
            } 
        }
        if(!c) window.location.href = '404.html'
    })
    .catch(error => { 
        console.log('ERROR: ' + error) 
        window.location.href = '404.html'
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    await carregarSession()
})

const encerrarSession = async () => {
    console.log(key)
    const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      };

    await fetch(`http://localhost:8080/session/delete?id=${key}`, options)
    .then(response => { window.location.href = 'index.html' })
    .catch( e => { console.log('ERROR: ' + e) })

}

logout.addEventListener('click', async (e) => {
    e.preventDefault()
    await encerrarSession()
})


