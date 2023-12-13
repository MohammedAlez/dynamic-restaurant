// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ordering-resturant.firebaseapp.com",
  projectId: "ordering-resturant",
  storageBucket: "ordering-resturant.appspot.com",
  messagingSenderId: "697541438250",
  appId: "1:697541438250:web:ea07bd47a4c2abe70ccc53"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);