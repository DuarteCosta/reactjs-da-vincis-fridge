import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firestore";
import "firebase/storage";

const fbase = firebase.initializeApp({
  apiKey: "AIzaSyA_Tmo5q4NpR1PvC3XCoMKKELmt3bl166I",
  authDomain: "davincisfridge.firebaseapp.com",
  projectId: "davincisfridge",
  storageBucket: "davincisfridge.appspot.com",
  messagingSenderId: "233386190298",
  appId: "1:233386190298:web:0e7bdde82de9f6f7000ce3",
  measurementId: "G-RRZFL2GT2B",
});

export default fbase;
