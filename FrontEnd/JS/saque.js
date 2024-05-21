const atualizarSaldo = async (customer) => {
    await fetch(`http://localhost:8080/transacao/depositar`, { 
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
        location.reload(); 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

const buscarCustomerParaSaque = async (valor, cpf) => {
    if (!valor || valor <= 0) return;

    await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpf}`)
        .then(response => response.json())
        .then(async data => {
            const customer = data.list[0];
            if (customer.contaCorrente.saldo >= valor) {
                customer.contaCorrente.saldo -= valor;
                atualizarSaldo(customer);
            } else {
                alert('Saldo insuficiente para realizar o saque');
            }
        })
        .catch(error => {
            alert('ERRO AO FAZER SAQUE');
        });
}

document.querySelector('.saque').addEventListener('click', async () => {
    const valor = Number(prompt('Digite o valor do saque: '));
    const cpf = (document.querySelector('.conta').innerHTML).replace(/[^0-9]/g, '');

    if (valor <= 0) {
        alert('Você não pode sacar valores negativos ou zero');
        return;
    }

    if (confirm(`Deseja sacar R$${valor}?`)) {
        buscarCustomerParaSaque(valor, cpf);
    }
});