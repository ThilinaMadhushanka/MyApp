// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO-dK8an6oP2VEnEzM_RqcjFD4lsHgenA",
  authDomain: "react-native-myapp-1b5b3.firebaseapp.com",
  projectId: "react-native-myapp-1b5b3",
  storageBucket: "react-native-myapp-1b5b3.firebasestorage.app",
  messagingSenderId: "980180644492",
  appId: "1:980180644492:web:c15967472d5ea0d00a81a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;