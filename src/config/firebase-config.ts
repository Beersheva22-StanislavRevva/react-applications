// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9JkDhUHglM4W6TRt-b9AUed1tgVo2whc",
  authDomain: "employee-91f1f.firebaseapp.com",
  projectId: "employee-91f1f",
  storageBucket: "employee-91f1f.appspot.com",
  messagingSenderId: "1057010857149",
  appId: "1:1057010857149:web:8d33ac3954a3130064b3d4"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;