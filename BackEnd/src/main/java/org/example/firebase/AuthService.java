package org.example.firebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {

    public AuthResponse authenticate(String cpf, String senha) {
        Firestore fireStore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = fireStore.collection("customer").whereEqualTo("cpf", cpf).get();

        try {
            QuerySnapshot querySnapshot = future.get();
            if (!querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    String senhaNoBanco = document.getString("senha");
                    if (senhaNoBanco != null && senhaNoBanco.equals(senha)) {
                        Random random = new Random();
                        int key = random.nextInt();
                        return new AuthResponse(true, key );
                    }
                }
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return new AuthResponse(false, 0);
    }
}
