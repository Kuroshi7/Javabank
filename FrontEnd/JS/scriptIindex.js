const cpf = document.getElementById('cpf')
const senha = document.getElementById('senha')

const renderizarUsuario = (token) => { 

    let criptography = ''
    let indice = (cpf.value).length
    while(criptography.length < (cpf.value).length){
        const n = cpf.value[indice-1]
        criptography = criptography + n
        indice--
    }

    const param = token.toString() + criptography
    window.location.href = `usuario.html?key=${param}`
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
    }).then(update => {
        renderizarUsuario(update.token)
        console.log(update)
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