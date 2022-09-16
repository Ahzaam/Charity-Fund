import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwzBmToSTV5-nKSDjy27H3eu8FK5gAuHI",
  authDomain: "hapugastalawa-00000.firebaseapp.com",
  projectId: "hapugastalawa-00000",
  storageBucket: "hapugastalawa-00000.appspot.com",
  messagingSenderId: "712965436826",
  appId: "1:712965436826:web:59ee59e634c962c1577623",
  measurementId: "G-PSWYRTXS37"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()
