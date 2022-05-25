// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4dgIVJ28w5kitwC2UAkvoOPxQPvp5Vos",
  authDomain: "tienda-airkids.firebaseapp.com",
  projectId: "tienda-airkids",
  storageBucket: "tienda-airkids.appspot.com",
  messagingSenderId: "50478648333",
  appId: "1:50478648333:web:49c9b1043bbb663d3e1944",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)