// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Defensive side-effect import to ensure Firestore registers with Firebase
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4mw-MIKY5dr-YzYySv0udhotGsjfEmBM",
  authDomain: "myproject-91c75.firebaseapp.com",
  projectId: "myproject-91c75",
  storageBucket: "myproject-91c75.firebasestorage.app",
  messagingSenderId: "1006423282925",
  appId: "1:1006423282925:web:a5b116c455ddfd2605a8e4",
  measurementId: "G-HHY7MYQR7Y"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use React Native persistence so auth survives app restarts (web ignores this)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Explicitly init Firestore for React Native and enable long-polling
initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
const db = getFirestore(app);

export { auth, db };