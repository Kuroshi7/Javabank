const transferir = async (contasTransferencia) => {
    await fetch(`https://javabank-backend-3.onrender.com/transacao/transferir`, {
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
        alert('Transferência realizada com sucesso')
        location.reload();
        return response.json();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

const buscarCustomers = async (valor, cpfOrigem, cpfDestino) => {
    if (!valor || valor <= 0) return;

    let customerOrigem, customerDestino;

    try {
        const responseOrigem = await fetch(`https://javabank-backend-3.onrender.com/customer/searchIdent?cpf=${cpfOrigem}`);
        const dataOrigem = await responseOrigem.json();
        customerOrigem = dataOrigem.list[0];
        
        const responseDestino = await fetch(`https://javabank-backend-3.onrender.com/customer/searchIdent?cpf=${cpfDestino}`);
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
        alert('Conta destino não localizada');
    }
}

document.querySelector('.transferencia').addEventListener('click', async () => {
    const valor = Number(prompt('Digite o valor da transferência: '));
    if (!valor || valor <= 0) return alert('Digite apenas valores validos'); 
    const cpfDestino = prompt('Digite o CPF da conta de destino: ').replace(/[^0-9]/g, '');
    const cpfOrigem = (document.querySelector('.conta').innerHTML).replace(/[^0-9]/g, '');

    if(cpfOrigem == cpfDestino){
        alert('Você não pode transferir valores para sua própria conta')
        return
    }

    await buscarCustomers(valor, cpfOrigem, cpfDestino);
});



