// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMGMb4BbsM8R0DAThlBe0shHKXBs63oI4",
    authDomain: "phu-quoc-54ba6.firebaseapp.com",
    databaseURL: "https://phu-quoc-54ba6-default-rtdb.firebaseio.com",
    projectId: "phu-quoc-54ba6",
    storageBucket: "phu-quoc-54ba6.firebasestorage.app",
    messagingSenderId: "710066761767",
    appId: "1:710066761767:web:63a1935d5e059c9fcc1e02",
    measurementId: "G-QTQCWXP23F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };