
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3Pyiam20UYAZgDYXDOl2ze6o8sv1-7IY",
  authDomain: "portfolio-ca39f.firebaseapp.com",
  projectId: "portfolio-ca39f",
  storageBucket: "portfolio-ca39f.appspot.com",
  messagingSenderId: "1088919775439",
  appId: "1:1088919775439:web:854e71360c0e0bc869afba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()