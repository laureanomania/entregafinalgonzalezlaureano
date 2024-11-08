// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWdhL-7gpu02-3tmQT5sYsLzMXR-mRd8g",
  authDomain: "productos-eca31.firebaseapp.com",
  projectId: "productos-eca31",
  storageBucket: "productos-eca31.firebasestorage.app",
  messagingSenderId: "348972389416",
  appId: "1:348972389416:web:377884b1ddae2d354b911d"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
