package org.example.entities;

import org.example.firebase.Customer;

public class Transferencia {

    private Customer contaOrigem;
    private Customer contaDestino;

    public Customer getContaOrigem() {
        return contaOrigem;
    }

    public void setContaOrigem(Customer contaOrigem) {
        this.contaOrigem = contaOrigem;
    }

    public Customer getContaDestino() {
        return contaDestino;
    }

    public void setContaDestino(Customer contaDestino) {
        this.contaDestino = contaDestino;
    }
}





