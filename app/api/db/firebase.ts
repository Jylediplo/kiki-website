// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOKPkSjof_5dk-WUnu1LFWXdYcjDnSGDk",
  authDomain: "le-surplus.firebaseapp.com",
  projectId: "le-surplus",
  storageBucket: "le-surplus.appspot.com",
  messagingSenderId: "507481558761",
  appId: "1:507481558761:web:587c60a629b1b75010ea78",
  measurementId: "G-1WGX82GQ06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};
