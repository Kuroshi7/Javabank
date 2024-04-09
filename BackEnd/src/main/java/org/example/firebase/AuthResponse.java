package org.example.firebase;


import org.springframework.stereotype.Service;

@Service
public class AuthResponse {
    private boolean autenticado;
    private String token;

    public AuthResponse() {
    }

    public AuthResponse(boolean autenticado, String token) {
        this.autenticado = autenticado;
        this.token = token;
    }

    public boolean isAutenticado() {
        return autenticado;
    }

    public void setAutenticado(boolean autenticado) {
        this.autenticado = autenticado;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}