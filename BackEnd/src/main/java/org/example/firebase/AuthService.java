package org.example.firebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class AuthService {

    public AuthResponse authenticate(String email, String senha) {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = firestore.collection("customer").whereEqualTo("email", email).get();

        try {
            QuerySnapshot querySnapshot = future.get();
            if (!querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    String senhaNoBanco = document.getString("senha");
                    if (senhaNoBanco != null && senhaNoBanco.equals(senha)) {
                        return new AuthResponse(true, "token");
                    }
                }
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return new AuthResponse(false, null);
    }
}
