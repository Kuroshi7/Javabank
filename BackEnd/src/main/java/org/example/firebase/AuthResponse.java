package org.example.firebase;


import org.springframework.stereotype.Service;

@Service
public class AuthResponse {
    private boolean autenticado;
    private int token;

    public AuthResponse() {
    }

    public AuthResponse(boolean autenticado,int token) {
        this.autenticado = autenticado;
        this.token = token;
    }

    public boolean isAutenticado() {
        return autenticado;
    }

    public void setAutenticado(boolean autenticado) {
        this.autenticado = autenticado;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }
}