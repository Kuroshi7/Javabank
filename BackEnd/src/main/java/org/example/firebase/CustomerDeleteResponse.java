package org.example.firebase;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class CustomerDeleteResponse {
    
    private Date updatedDate;
    private boolean status;
    public Date getUpdatedDate() {
        return updatedDate;
    }
    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }
    
}