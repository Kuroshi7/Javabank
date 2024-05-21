const transferir = async (contasTransferencia) => {
    await fetch(`http://localhost:8080/transacao/transferir`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contasTransferencia)
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

const buscarCustomers = async (valor, cpfOrigem, cpfDestino) => {
    if (!valor || valor <= 0) return;

    let customerOrigem, customerDestino;

    try {
        const responseOrigem = await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpfOrigem}`);
        const dataOrigem = await responseOrigem.json();
        customerOrigem = dataOrigem.list[0];
        
        const responseDestino = await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpfDestino}`);
        const dataDestino = await responseDestino.json();
        customerDestino = dataDestino.list[0];

        if (!customerOrigem || !customerDestino) {
            throw new Error('Conta de origem ou destino não encontrada');
        }

        if (customerOrigem.contaCorrente.saldo >= valor) {
            customerOrigem.contaCorrente.saldo -= valor;
            customerDestino.contaCorrente.saldo += valor;

            const contasTransferencia = {
                contaOrigem: customerOrigem,
                contaDestino: customerDestino
            };

            transferir(contasTransferencia);
        } else {
            alert('Saldo insuficiente na conta de origem');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar as contas');
    }
}

document.querySelector('.transferencia').addEventListener('click', async () => {
    const valor = Number(prompt('Digite o valor da transferência: '));
    const cpfOrigem = (document.querySelector('.conta').innerHTML).replace(/[^0-9]/g, '');
    const cpfDestino = prompt('Digite o CPF da conta de destino: ').replace(/[^0-9]/g, '');

    if (valor <= 0) {
        alert('Você não pode transferir valores negativos ou zero');
        return;
    }

    await buscarCustomers(valor, cpfOrigem, cpfDestino);
});



