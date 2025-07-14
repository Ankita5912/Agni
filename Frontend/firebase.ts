// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsU4YCcnltydjv09oIgXqGqCwQe2X8IYw",
  authDomain: "agniflow-b87f2.firebaseapp.com",
  projectId: "agniflow-b87f2",
  storageBucket: "agniflow-b87f2.firebasestorage.app",
  messagingSenderId: "302752089203",
  appId: "1:302752089203:web:70c718c9f09cd5093f9606",
  measurementId: "G-FHXW54DXH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// const analytics = getAnalytics(app);