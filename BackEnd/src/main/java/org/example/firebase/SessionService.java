package org.example.firebase;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class SessionService {

    @Autowired
    SessionCreateResponse sessionCreateResponse;

    @Autowired
    SessionListResponse sessionListResponse;

    public SessionCreateResponse createSession(Session session) throws InterruptedException, ExecutionException {
        Firestore fireStore = FirestoreClient.getFirestore();

        DocumentReference docReference = fireStore.collection("session").document();

        session.setId(docReference.getId());

        ApiFuture<WriteResult> apiFuture = docReference.set(session);

        SessionCreateResponse sessionCreateResponse = new SessionCreateResponse();
        sessionCreateResponse.setUpdatedTime(apiFuture.get().getUpdateTime().toDate());
        sessionCreateResponse.setId(session.getId());

        return sessionCreateResponse;
    }

    public SessionListResponse getSessionList() throws InterruptedException, ExecutionException {
        Firestore fireStore = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> apiFuture = fireStore.collection("session").get();
        List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();
        List<Session> sessionList = list.stream().map((doc) -> doc.toObject(Session.class)).collect(Collectors.toList());

        SessionListResponse sessionListResponse = new SessionListResponse();
        sessionListResponse.setList(sessionList);

        return sessionListResponse;
    }

}
