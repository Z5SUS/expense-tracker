import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOoZx1vma1tqO_PRnV2szM8aiJPAwO_z4",
  authDomain: "expense-tracker-b10b0.firebaseapp.com",
  projectId: "expense-tracker-b10b0",
  storageBucket: "expense-tracker-b10b0.firebasestorage.app",
  messagingSenderId: "582148535284",
  appId: "1:582148535284:web:f818636860e8585aa57fa1",
  measurementId: "G-4DHM0B8CZE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
