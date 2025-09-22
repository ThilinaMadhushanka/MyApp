import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

  // Conditionally initialize Auth based on the platform
  if (Platform.OS === 'web') {
    auth = initializeAuth(app, {
      persistence: browserLocalPersistence
    });
  } else {
    const { getReactNativePersistence } = require("firebase/auth");
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  }

  // Initialize Firestore
  db = getFirestore(app);
  console.log('Firestore initialized successfully:', db);
  console.log('Firestore app:', db.app);
  console.log('Firestore type:', typeof db);

  // Only initialize analytics in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Ensure db is still defined even if there's an error
  if (!db && app) {
    try {
      db = getFirestore(app);
    } catch (dbError) {
      console.error('Failed to initialize Firestore:', dbError);
    }
  }
}

// Ensure all exports are defined
if (!db) {
  console.error('Firestore database is not initialized!');
}

export { auth, db, analytics };
