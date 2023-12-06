// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlDB6_KR1ew1pKTO9UX4TBr8fEviUFtvM",
  authDomain: "house-marketplace-app-632e0.firebaseapp.com",
  projectId: "house-marketplace-app-632e0",
  storageBucket: "house-marketplace-app-632e0.appspot.com",
  messagingSenderId: "800902105783",
  appId: "1:800902105783:web:34308b8a5e1fd103409b32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
