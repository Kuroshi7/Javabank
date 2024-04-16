package org.example.firebase;

import java.util.concurrent.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {

    @Autowired
    SessionService sessionService;

    @PostMapping
    @RequestMapping("/")
    public SessionCreateResponse createSession (@RequestBody Session session) throws InterruptedException, ExecutionException{
        return sessionService.createSession(session);
    }

    @GetMapping("/")
    public SessionListResponse getAllSession() throws InterruptedException, ExecutionException{
        return sessionService.getSessionList();
    }

    @DeleteMapping("/delete")
    public SessionDeleteResponse deleteSession (@RequestParam String id) throws InterruptedException, ExecutionException{
        return sessionService.deleteSession(id);
    }
}

