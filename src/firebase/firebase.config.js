// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm_-k-FzcwBL5KGLh6W7lgc5ikON8TEWw",
  authDomain: "user-email-password-login-form.firebaseapp.com",
  projectId: "user-email-password-login-form",
  storageBucket: "user-email-password-login-form.appspot.com",
  messagingSenderId: "141983269675",
  appId: "1:141983269675:web:9740181fa7bae3c630fb6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;