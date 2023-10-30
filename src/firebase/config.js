// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBpZpoH0auNC5JyN8rzZ9J-Zc3UAc2mZs",
  authDomain: "vivafirebase.firebaseapp.com",
  projectId: "vivafirebase",
  storageBucket: "vivafirebase.appspot.com",
  messagingSenderId: "768921261680",
  appId: "1:768921261680:web:2d7d26abaeca0295cc86b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //登录认证
const db = getFirestore(app);

export { app, db, auth };
