import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };