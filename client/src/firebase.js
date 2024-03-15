// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-c5e02.firebaseapp.com",
  projectId: "mern-blog-c5e02",
  storageBucket: "mern-blog-c5e02.appspot.com",
  messagingSenderId: "994150157429",
  appId: "1:994150157429:web:8257efac23623956eb7c3c",
  measurementId: "G-CYHNTT6Z4S"
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


