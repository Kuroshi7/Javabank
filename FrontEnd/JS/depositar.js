document.getElementById('depositForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpf = document.getElementById('conta').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (!cpf || valor <= 0) {
        alert('Por favor, insira um CPF válido e um valor maior que zero.');
        return;
    }

    const data = { cpf, valor };

    try {
        const response = await fetch('http://localhost:8080/transacao/depositar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao realizar o depósito');
        }

        const result = await response.json();
        alert(`Depósito realizado com sucesso! Novo saldo: ${result.saldo}`);
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao realizar o depósito. Por favor, tente novamente.');
    }
});
