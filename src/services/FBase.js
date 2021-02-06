import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firestore";

const fbase = firebase.initializeApp({
  apiKey: "AIzaSyCVRJAYCYWgM7H0N8Pcj_s4nn67N7tMe9s",
  authDomain: "da-vincis-fridge.firebaseapp.com",
  databaseURL: "https://da-vincis-fridge.firebaseio.com",
  projectId: "da-vincis-fridge",
  storageBucket: "da-vincis-fridge.appspot.com",
  messagingSenderId: "629884379436",
  appId: "1:629884379436:web:57f31323c0ad9c3b46cc89",
  measurementId: "G-QZLNWDZ1XV",
});

export default fbase;


  
