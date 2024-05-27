const depositar = async (customer) => {
    await fetch (`https://javabank-backend-3.onrender.com/transacao/depositar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao processar a solicitação');
                }
                return response.json();
            })
            .then(data => {
                location.reload()
            })
            .catch(error => {
                console.error('Erro:', error);
            });
}

const buscarCustomer = async (valor, cpf) => {
    if(!valor || valor == 0) return

    await fetch(`https://javabank-backend-3.onrender.com/customer/searchIdent?cpf=${cpf}`)
        .then(response => {
            return response.json();
        })
        .then(async data => {
            const customer = data.list[0];
            customer.contaCorrente.saldo += valor;
            depositar(customer);
        })
        .catch(error => {
            alert('ERRO AO FAZER DEPÓSITO')
        });
}

document.querySelector('.deposito').addEventListener('click', async () => {
    const valor = Number(prompt('Digite o valor de depósito: '))
    const cpf = (document.querySelector('.conta').innerHTML).replace(/[^0-9]/g,'')

    if(valor < 0){
        alert('VOCÊ NÃO PODE DEPOSITAR VALORES NEGATIVOS')
        return
    }

    buscarCustomer(valor, cpf);
});
