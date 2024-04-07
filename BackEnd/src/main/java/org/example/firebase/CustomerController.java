package org.example.firebase;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;
    @PostMapping
    @RequestMapping("/")
    public CustomerCreateResponse createCustomer (@RequestBody Customer customer) throws InterruptedException, ExecutionException{
        return customerService.createCustomer(customer);
    }

    @GetMapping("/")
    public CustomerListResponse getAllCustomers() throws InterruptedException, ExecutionException{

        return customerService.getCustomerList();

    }

    @GetMapping("/search")
    public CustomerListResponse getCustomerByName(@RequestParam String key)throws InterruptedException, ExecutionException{
        return customerService.getCustomerListByKey(key);
    }

}
