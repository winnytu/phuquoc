import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);