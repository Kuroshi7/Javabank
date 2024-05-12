package org.example.firebase;

import java.util.Date;

import org.example.entities.ContaCorrente;
import org.springframework.stereotype.Component;

@Component
public class CustomerCreateResponse {

        private String id;
        private Date updatedTime;
        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public Date getUpdatedTime() {
            return updatedTime;
        }
        public void setUpdatedTime(Date updatedTime) {
            this.updatedTime = updatedTime;
        }
    
}