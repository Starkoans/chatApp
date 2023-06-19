// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeV2WIkVjdlLFJ9I38pOc886CNB75lijE",
    authDomain: "items-log.firebaseapp.com",
    databaseURL: "https://items-log-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "items-log",
    storageBucket: "items-log.appspot.com",
    messagingSenderId: "17111513771",
    appId: "1:17111513771:web:1b56d96f1a3460671b55ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const db = getDatabase(app);
export const firestore = getFirestore(app);