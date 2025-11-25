// Firebase configuration and initialization
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Firebase configuration
// Replace these values with your Firebase project configuration
// For now, using dummy credentials - replace with actual values from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA7EFMyQ1kjU5yBTgGEqgnE0uf0Iqv3Uk4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jprinfraworks.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jprinfraworks",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jprinfraworks.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "331418877626",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:331418877626:web:ba787f002cc62e0cb8cc83",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-D2RKGVLLE1",
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  if (typeof window !== "undefined") {
    isSupported()
      .then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      })
      .catch(() => {
        analytics = null;
      });
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage, analytics };
export default app;

