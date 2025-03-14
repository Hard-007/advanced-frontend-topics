import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "consolelog-5e9b0.firebaseapp.com",
  projectId: "consolelog-5e9b0",
  storageBucket: "consolelog-5e9b0.firebasestorage.app",
  messagingSenderId: "231537152934",
  appId: "1:231537152934:web:632f693e90ee6e67bc3567",
  measurementId: "G-NXMJ9WLVVW",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

