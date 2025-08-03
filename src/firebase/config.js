// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9DdZ8FxUpOnc77Aa0BojXcFbpbvd9yfQ",
  authDomain: "capstoneproject-28a5f.firebaseapp.com",
  projectId: "capstoneproject-28a5f",
  storageBucket: "capstoneproject-28a5f.firebasestorage.app",
  messagingSenderId: "158807865689",
  appId: "1:158807865689:web:752f9b68478fcc7e90f448",
  measurementId: "G-C8T8JNT938"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
