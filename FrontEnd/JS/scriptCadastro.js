let nome = document.getElementById('nome')
let email = document.getElementById('email')

const limparInput = () => {
    nome.value = ""
    email.value = ""
}

const RequestPost = async (name, email) => {

        limparInput()

        const dados = {
            name: name,
            email: email
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que os dados são enviados no formato JSON
            },
            body: JSON.stringify(dados) // Converte os dados para o formato JSON
        };

        const data = await fetch('http://localhost:8080/customer/', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
               }
            return data.json();
        }).then(update => {
            console.log(update);
        }).catch(e => {
            console.log(e);
        });

}

document.addEventListener('submit', async (e) => {
    e.preventDefault()

    const post = await RequestPost(nome.value, email.value)

})

