// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Ilx4CMirN3qeCkmgg9KyetCvEavKUOs",
  authDomain: "wad-testing.firebaseapp.com",
  projectId: "wad-testing",
  storageBucket: "wad-testing.firebasestorage.app",
  messagingSenderId: "230306260367",
  appId: "1:230306260367:web:cd6f41b0da91ebe9bf17fa",
  measurementId: "G-JQ5LH7CCZ1"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const analytics = getAnalytics(FIREBASE_APP);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
