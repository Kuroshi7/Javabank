package org.example.firebase;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class SessionCreateResponse {

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
