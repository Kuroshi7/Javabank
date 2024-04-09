package org.example.firebase;

import org.springframework.stereotype.Component;

@Component
public class Customer {

    private String name;
    private String email;
    private String id;
    private String cpf;
    private String idade;
    private String senha;
    
    public String getsenha() {
        return senha;
    }
    public void setsenha(String senha) {
        this.senha = senha;
    }
    public String getcpf() {
        return cpf;
    }
    public void setcpf(String cpf) {
        this.cpf = cpf;
    }
    public String getIdade() {
        return idade;
    }
    public void setIdade(String idade) {
        this.idade = idade;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

}
