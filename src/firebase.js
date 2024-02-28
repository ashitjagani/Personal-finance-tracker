// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import 'firebase/firestore';
import 'firebase/database'; 
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';


// if you're using Firebase real-time database
 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8SYfE075DL4R2WJNFY1H9qox1IBc97bk",
  authDomain: "crypto-project-14f34.firebaseapp.com",
  projectId: "crypto-project-14f34",
  storageBucket: "crypto-project-14f34.appspot.com",
  messagingSenderId: "776812709561",
  appId: "1:776812709561:web:3dddfec2eef84997307d68",
  measurementId: "G-N6N5B7V07G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics= getAnalytics(app)
const auth= getAuth(app);
const db = getFirestore(app);
export {app,auth, db};