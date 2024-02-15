// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1JR_ZSoO0X4FWc811UhMVVqbOICgwpiU",
    authDomain: "react-auth-ffbe9.firebaseapp.com",
    databaseURL: "https://react-auth-ffbe9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-auth-ffbe9",
    storageBucket: "react-auth-ffbe9.appspot.com",
    messagingSenderId: "61455901523",
    appId: "1:61455901523:web:af1ca778d477fd898db7a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
