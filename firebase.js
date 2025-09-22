import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTj2PpBLMaGETQ5SBL0wkdfMmVhVq9ArI",
  authDomain: "myproject-20ed0.firebaseapp.com",
  projectId: "myproject-20ed0",
  storageBucket: "myproject-20ed0.firebasestorage.app",
  messagingSenderId: "771237357556",
  appId: "1:771237357556:web:b1cae6322b8d683d43bba1",
  measurementId: "G-RST8FQ94H7"
};

// Initialize Firebase
let app, auth, db, analytics;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Auth with AsyncStorage persistence for React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Only initialize analytics in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { auth, db, analytics };