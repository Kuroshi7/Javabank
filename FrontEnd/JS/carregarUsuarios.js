function carregarUsuarios() {
    fetch('http://localhost:8080/customer/')
        .then(response => response.json())
        .then(data => {
            const usuarios = document.getElementById('usuarios');
            usuarios.innerHTML = '';
            data.list.forEach(usuario => {
                const divUsuario = document.createElement('div');
                divUsuario.classList.add('usuario');
                divUsuario.innerHTML = `Nome: <span class="nome">${usuario.name}</span><br>E-mail: <span class="email">${usuario.email}</span><br> CPF: <span class="cpf">${usuario.cpf}</span>`;
                usuarios.appendChild(divUsuario);
            });

            
            const filtroInput = document.getElementById('filtroInput');
            filtroInput.addEventListener('input', () => {
                const filtro = filtroInput.value.toLowerCase();
                const usuariosFiltrados = data.list.filter(usuario => usuario.name.toLowerCase().startsWith(filtro));
                usuarios.innerHTML = '';
                usuariosFiltrados.forEach(usuario => {
                    const divUsuario = document.createElement('div');
                    divUsuario.classList.add('usuario');
                    divUsuario.innerHTML = `Nome: <span class="nome">${usuario.name}</span><br>E-mail: <span class="email">${usuario.email}</span><br> CPF: <span class="cpf">${usuario.cpf}</span>`;
                    usuarios.appendChild(divUsuario);
                });
            });
        })
        .catch(error => console.error('Erro:', error));
}

document.addEventListener('DOMContentLoaded', carregarUsuarios);