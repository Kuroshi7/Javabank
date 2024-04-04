package org.example.firebase;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class CustomerService {
    public void createCustomer (Customer customer){
        Firestore fireStore = FirestoreClient.getFirestore();

        DocumentReference docReference = fireStore.collection("customer").document();

        customer.setId(docReference.getId());
        docReference.set(customer);
        ApiFuture<WriteResult> apiFuture = docReference.set(customer);

    }

}
