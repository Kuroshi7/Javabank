package org.example.controllers;

import org.example.entities.Transferencia;
import org.example.firebase.Customer;
import org.example.firebase.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/transacao")
public class ContaCorrenteController {

    @Autowired
    CustomerService customerService;

    @PutMapping
    @RequestMapping("/depositar")
    public Customer depositoContaCorrente(@RequestBody Customer customer) throws InterruptedException, ExecutionException {
        customerService.updateCustomer(customer);
        return customer;
    }

    @PutMapping
    @RequestMapping("/transferir")
    public void transferencia(@RequestBody Transferencia contasTransferencia) throws InterruptedException, ExecutionException {
        customerService.updateCustomer(contasTransferencia.getContaOrigem());
        customerService.updateCustomer(contasTransferencia.getContaDestino());
    }

}
