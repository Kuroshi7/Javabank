let nome = document.getElementById('nome')
let cpf = document.getElementById('cpf')
let email = document.getElementById('email')
let idade = document.getElementById('idade')
let senha = document.getElementById('password')
let senha1 = document.getElementById('confirmPassword')

class Metodos{
    constructor(CPF){
        this.cpfInicial = CPF.replace(/[^0-9]/g,'')
        this.cpfArray = (Array.from(this.cpfInicial)).slice(0,9)
    }

    verificarCpf(){
        let cont = this.cpfArray.length + 2
        
        let digito = this.cpfArray.reduce((acumulador,vlr) => {
            cont --
            return acumulador += Number(vlr) * cont
        },0)

        digito = 11 - (digito % 11)
        if(digito > 10){ digito = 0 }
        this.cpfArray.push(digito)

        if(this.cpfArray.length < 11){ this.verificarCpf() }
        
        return (this.cpfArray.toString()).replace(/[^0-9]/g,'') 
    }
}

class ReceberCpf extends Metodos{
    constructor(CPF){
        super(CPF)
        this.cpfFinal = this.verificarCpf()
    }
}

const limparInput = () => {
    nome.value = ""
    cpf.value = ""
    email.value = ""
    idade.value = ""
    senha.value = ""
    senha1.value = ""
}

const RequestPost = async (name, cpf, email, idade, senha) => {

        limparInput(name,cpf,email,idade,senha,senha1)

        const dados = {
            name: name,
            cpf: cpf,
            email: email,
            idade: idade,
            senha: senha
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
            alert('Cadastro realizado com sucesso')
            window.location.href = 'index.html'
        }).catch(e => {
            console.log(`ERROR: ${e}`);
            alert('Erro ao conectar com banco de dados, envie os dados novamente')
        });
        

}

    const validarFormulario = () => {
        const CPF = new ReceberCpf(cpf.value)

        if(CPF.cpfInicial != CPF.cpfFinal) return false 
        if(senha.value != senha1.value) return false 

        return true
    }

document.addEventListener('submit', async (e) => {
    e.preventDefault()

    const form = validarFormulario()

    if(form){
        const post = await RequestPost(nome.value, cpf.value, email.value, idade.value, senha.value)
    } else {
        alert('CPF ou senhas incorretos')
    }

})

