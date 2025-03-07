import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBz1lTUgJSFyq2elxTfdKRkE0sgGvBjlWQ",
  authDomain: "consolelog-cc937.firebaseapp.com",
  projectId: "consolelog-cc937",
  storageBucket: "consolelog-cc937.firebasestorage.app",
  messagingSenderId: "24175104534",
  appId: "1:24175104534:web:58bc8c2b63e9ef1db3db37",
  measurementId: "G-XKXT02TE9K",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
