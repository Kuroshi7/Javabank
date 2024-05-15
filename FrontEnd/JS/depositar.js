document.getElementById('depositForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const valor = parseFloat(document.getElementById('valor').value);

    try {
        // Primeiro, buscar o cliente pelo CPF para obter seus dados
        const getCustomerResponse = await fetch(`http://localhost:8080/customer/searchIdent?cpf=${cpf}`);
        if (!getCustomerResponse.ok) {
            throw new Error('Cliente não encontrado');
        }

        const customerData = await getCustomerResponse.json();
        if (!customerData.list || customerData.list.length === 0) {
            throw new Error('Cliente não encontrado');
        }

        const customer = customerData.list[0];

        // Atualizar o saldo
        if (!customer.contaCorrente) {
            customer.contaCorrente = { saldo: 0 };
        }
        customer.contaCorrente.saldo += valor;

        // Enviar a atualização para o backend
        const updateResponse = await fetch('http://localhost:8080/transacao/depositar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });

        if (!updateResponse.ok) {
            const errorResponse = await updateResponse.json();
            console.error('Erro ao atualizar saldo:', errorResponse);
            alert('Erro ao realizar depósito. Tente novamente.');
        } else {
            alert('Depósito realizado com sucesso!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar depósito. Tente novamente.');
    }
});
