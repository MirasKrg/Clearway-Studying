import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWylX6aSQhxGyZ4sGSGDqI5etCOxEiCzA",
  authDomain: "clearway-stud.firebaseapp.com",
  projectId: "clearway-stud",
  storageBucket: "clearway-stud.firebasestorage.app",
  messagingSenderId: "998674852228",
  appId: "1:998674852228:web:5434ef23daf07b99b915d1",
  measurementId: "G-M7H04CSP89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
