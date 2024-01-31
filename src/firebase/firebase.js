// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmQRbYZnyFurr3yx3o88Wm-TXNdVhkzTk",
    authDomain: "policy-db.firebaseapp.com",
    projectId: "policy-db",
    storageBucket: "policy-db.appspot.com",
    messagingSenderId: "681212162559",
    appId: "1:681212162559:web:d62bf83caa104c306f77ca",
    measurementId: "G-RF37VLFW3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);