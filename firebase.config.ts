
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzaZDuTia1jjn8p5WYo_xvo0Nn8Q-vlmY",
  authDomain: "clearway-studying.firebaseapp.com",
  projectId: "clearway-studying",
  storageBucket: "clearway-studying.firebasestorage.app",
  messagingSenderId: "710497596722",
  appId: "1:710497596722:web:ced70541d3b5534ae4d32b",
  measurementId: "G-4KSD39K6KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Экспорт необходимых сервисов
export const auth = getAuth(app);
export const db = getFirestore(app);

export { app, analytics };
export default app;
