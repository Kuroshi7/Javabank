package org.example.firebase;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import java.io.IOException;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import com.google.firebase.FirebaseOptions;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.v1.FirestoreClient;
import com.google.firebase.FirebaseApp;

import java.io.InputStream;


@Service    
public class FireBaseConfig {
    @PostConstruct
    public void configureFirebaseConnection() throws IOException{

        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");
        
        FirebaseOptions options = new FirebaseOptions.Builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .build();

        
        FirebaseApp.initializeApp(options);
        
    }
}



