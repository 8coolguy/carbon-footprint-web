// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "test-app2-177a1.firebaseapp.com",
  databaseURL:"https://test-app2-177a1-default-rtdb.firebaseio.com/",
  projectId: "test-app2-177a1",
  storageBucket: "test-app2-177a1.appspot.com",
  messagingSenderId: "723263322838",
  appId: "1:723263322838:web:5fe544292366c32637e777",
  measurementId: "G-C1CJMC9092"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

