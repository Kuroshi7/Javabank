document.getElementById('depositForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpf = document.getElementById('conta').value;
    const valor = parseFloat(document.getElementById('valor').value);

    
    await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpf}`)
        .then(response => {
            return response.json();
        })
        .then(async data => {
            const customer = data.list[0];
            customer.contaCorrente.saldo += valor;

            
            await fetch (`http://localhost:8080/transacao/depositar`, {
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
                console.log('Saldo atualizado:', data.contaCorrente.saldo);
                
            })
            .catch(error => {
                console.error('Erro:', error);
                
            });
        })
        .catch(error => {
            console.log('ERROR: ' + error);
            window.location.href = '404.html';
        });
});
