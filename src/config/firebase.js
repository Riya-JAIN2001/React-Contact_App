// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-slfIBQCyNiZtAnXx1_c1yAc7RLL4CNU",
  authDomain: "contactdd-c76d9.firebaseapp.com",
  projectId: "contactdd-c76d9",
  storageBucket: "contactdd-c76d9.appspot.com",
  messagingSenderId: "653914986397",
  appId: "1:653914986397:web:83306293df9aa721b78174"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);