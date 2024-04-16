const cpf = document.getElementById('cpf')
const senha = document.getElementById('senha')

const renderizarUsuario = (id) => { 
    window.location.href = `usuario.html?key=${id}`
}

const criarSession = async (options) => {

    const dados = { cpf: cpf.value }

    const data = await fetch('http://localhost:8080/session/', options)
    .then(data => { console.log('success') })
    .catch(e => { console.log(`ERROR: ${e}`) })

    const idSession = await fetch(`http://localhost:8080/session/`)
    .then(response => { return response.json(); })
    .then(data => { renderizarUsuario(data.list[0].id) })
    .catch(error => { console.log('ERROR: ' + error) })

}

const requestLogin = async (cpf, senha) => {

    const login = {
        cpf: cpf.replace(/[^0-9]/g,''),
        senha: senha
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Indica que os dados são enviados no formato JSON
        },
        body: JSON.stringify(login) // Converte os dados para o formato JSON
    };

    const data = await fetch('http://localhost:8080/customer/authenticate', options)
    .then(data => {
        if (!data.ok) {
            throw Error(data.status);
           }
        return data.json();
    }).then( async () => {
        await criarSession(options)
    }).catch(e => {
        console.log(`ERROR: ${e}`);
        alert('Usuario ou senha incorretos')
    });

}

document.addEventListener('submit', async (e) => {
    e.preventDefault()

    if(cpf.value == "") alert('Cpf não pode estar em branco') 
    else if(senha.value == "") alert('senha não pode estar em branco')
    else await requestLogin(cpf.value, senha.value)

})