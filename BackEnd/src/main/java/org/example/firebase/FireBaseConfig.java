package org.example.firebase;

import java.io.FileInputStream;
import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

    
public class FireBaseConfig {

    public void configureFirebaseConnection() throws IOException{
        FileInputStream serviceAccount =
            new FileInputStream("classpath:config/connectbank-a72f4-firebase-adminsdk-gyk08-9f686482a5.json");
        
        FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();
        
        FirebaseApp.initializeApp(options);
        
    }

}



