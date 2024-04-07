package org.example.firebase;

import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class CustomerListResponse {
    
        private List<Customer> list;

        public List<Customer> getList() {
            return list;
        }

        public void setList(List<Customer> list) {
            this.list = list;
        }
    
}