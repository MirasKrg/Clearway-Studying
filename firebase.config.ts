
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Конфигурация вашего веб-приложения Firebase
// ВАЖНО: Замените значения на реальные данные вашего проекта из консоли Firebase,
// или, что лучше, используйте переменные окружения (process.env).
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт необходимых сервисов
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
