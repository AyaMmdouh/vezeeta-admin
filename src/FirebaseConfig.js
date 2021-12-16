import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
/*import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";*/

const firebaseConfig={
    apiKey: "AIzaSyDDCOKSE5quQFGA_81mo9UT-PmC25ezI6I",
    authDomain: "angular-bc0f5.firebaseapp.com",
    projectId: "angular-bc0f5",
    storageBucket: "angular-bc0f5.appspot.com",
    messagingSenderId: "952475898915",
    appId: "1:952475898915:web:f821b63d67770d83c48d96",
    measurementId: "${config.measurementId}"
};

//const usersCollectionRef = collection(db, "users");
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
export const fs = getFirestore(app);