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
public class CustomerService {
    @Autowired
    CustomerCreateResponse customerCreateResponse;
    @Autowired
    CustomerListResponse customerListResponse;
    @Autowired
    CustomerDeleteResponse customerDeleteResponse;

        public CustomerCreateResponse createCustomer (Customer customer) throws InterruptedException, ExecutionException{
            Firestore fireStore = FirestoreClient.getFirestore();

            DocumentReference docReference = fireStore.collection("customer").document();

            customer.setId(docReference.getId());
        
            ApiFuture<WriteResult> apiFuture = docReference.set(customer);
        
            customerCreateResponse.setUpdatedTime(apiFuture.get().getUpdateTime().toDate());
            customerCreateResponse.setId(customer.getId());

            return customerCreateResponse;
        }

        public CustomerListResponse getCustomerList()throws InterruptedException, ExecutionException{
            Firestore fireStore = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> apiFuture = fireStore.collection("customer").get();
            List<QueryDocumentSnapshot> list = apiFuture.get().getDocuments();
            List<Customer> customerList = list.stream().map((doc) -> doc.toObject(Customer.class)).collect(Collectors.toList());

            customerListResponse.setList(customerList);

            return customerListResponse;
        }

            public CustomerListResponse getCustomerListByKey(String key)throws InterruptedException, ExecutionException{
            Firestore fireStore = FirestoreClient.getFirestore();
            ApiFuture <QuerySnapshot> apiFuture = fireStore.collection("customer")
            .whereGreaterThanOrEqualTo("name", key)
            .whereLessThan("name", key+'z').get();
            List<QueryDocumentSnapshot>list = apiFuture.get().getDocuments();

            List<Customer> customerList = list.stream().map((doc) -> doc.toObject(Customer.class)).collect(Collectors.toList());

            customerListResponse.setList(customerList);

            return customerListResponse;
        }
        
        public CustomerCreateResponse updateCustomer (Customer customer) throws InterruptedException, ExecutionException{
            Firestore fireStore = FirestoreClient.getFirestore();
            DocumentReference documentReference = fireStore.collection("customer").document(customer.getId());
            ApiFuture<WriteResult> apiFuture = documentReference.set(customer);

            customerCreateResponse.setUpdatedTime(apiFuture.get().getUpdateTime().toDate());
            customerCreateResponse.setId(customer.getId());

            return customerCreateResponse;
        }

        public CustomerDeleteResponse deleteCustomer (String id) throws InterruptedException, ExecutionException{
            Firestore fireStore = FirestoreClient.getFirestore();
            DocumentReference docReference = fireStore.collection("customer").document(id);
            ApiFuture<WriteResult> apiFuture = docReference.delete();
            customerDeleteResponse.setUpdatedDate(apiFuture.get().getUpdateTime().toDate());
            customerDeleteResponse.setStatus(true);

            return customerDeleteResponse;
        }

}
