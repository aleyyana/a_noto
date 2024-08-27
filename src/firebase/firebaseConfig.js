import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_TLo_lBkQj1oB0vn5oG_18KvZsLZdS7Y",
  authDomain: "vue-auth-tfe.firebaseapp.com",
  databaseURL: "https://vue-auth-tfe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-auth-tfe",
  storageBucket: "vue-auth-tfe.appspot.com",
  messagingSenderId: "611098957271",
  appId: "1:611098957271:web:c928f46428754ee43ae792"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export { auth, db }

console.log('hi')