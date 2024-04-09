const email = document.getElementById('cpf')
const senha = document.getElementById('senha')

const renderizarUsuario = (email) => { 
    window.location.href = `usuario.html?usuario=${email}`
}

const requestLogin = async (email, senha) => {

    const login = {
        email: email,
        //cpf: cpf.replace(/[^0-9]/g,''),
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
        console.log(update);
        renderizarUsuario(update.email)
    }).catch(e => {
        console.log(`ERROR: ${e}`);
        alert('Usuario ou senha incorretos')
    });

}

document.addEventListener('submit', async (e) => {
    e.preventDefault()

    console.log(email.value)

    if(email.value == "") alert('Cpf não pode estar em branco') 
    else if(senha.value == "") alert('senha não pode estar em branco')
    else await requestLogin(email.value, senha.value)

})