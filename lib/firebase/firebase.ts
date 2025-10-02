import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
} from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration fournie par l'utilisateur
const firebaseConfig = {
  apiKey: "AIzaSyAZfqaLLPHXLUlNou-Tk-ByGQT9LWqtg8o",
  authDomain: " Vroumkin-60cb6.firebaseapp.com",
  projectId: " Vroumkin-60cb6",
  storageBucket: " Vroumkin-60cb6.firebasestorage.app",
  messagingSenderId: "318229921797",
  appId: "1:318229921797:web:8e944f88e6c4813e325c6c",
  measurementId: "G-9Y9ZRX1Y6R",
};

// Initialisation unique côté client
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics (protégé pour éviter l'exécution côté serveur)
export async function initAnalyticsSafely() {
  if (typeof window === "undefined") return null;
  try {
    const supported = await isAnalyticsSupported();
    if (supported) {
      return getAnalytics(app);
    }
  } catch {
    // Ignore analytics errors in non-browser environments
  }
  return null;
}
