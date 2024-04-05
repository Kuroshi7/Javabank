package org.example.firebase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping ("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;
    @PostMapping
    @RequestMapping("/")
    public void createCustomer (@RequestBody Customer customer){
        customerService.createCustomer(customer);
    }

}
