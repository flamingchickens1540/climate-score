// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL3j1ttViXT5GzRsZzJaJ_ogy051KYY_k",
  authDomain: "climate-score-4885a.firebaseapp.com",
  projectId: "climate-score-4885a",
  storageBucket: "climate-score-4885a.appspot.com",
  messagingSenderId: "228724565089",
  appId: "1:228724565089:web:f098183feb3105cabbb620",
  measurementId: "G-Z5SZKYFRCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);