import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDDCOKSE5quQFGA_81mo9UT-PmC25ezI6I",
  authDomain: "angular-bc0f5.firebaseapp.com",
  projectId: "angular-bc0f5",
  storageBucket: "angular-bc0f5.appspot.com",
  messagingSenderId: "952475898915",
  appId: "1:952475898915:web:f821b63d67770d83c48d96",
  measurementId: "${config.measurementId}"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDRTH3zhmeAR68gnZaZ_dsnxpmji5cav3k",
//   authDomain: "university-system-info.firebaseapp.com",
//   databaseURL: "https://university-system-info-default-rtdb.firebaseio.com",
//   projectId: "university-system-info",
//   storageBucket: "university-system-info.appspot.com",
//   messagingSenderId: "135562162104",
//   appId: "1:135562162104:web:356f3069be6cadbc46294d"
// };

//const usersCollectionRef = collection(db, "users");
const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);
export const auth = getAuth(app);
// export const db = getFirestore(app);
