package org.example.firebase;

import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class SessionListResponse {

    private List<Session> list;

        public List<Session> getList() {
            return list;
        }

        public void setList(List<Session> list) {
            this.list = list;
        }

}
