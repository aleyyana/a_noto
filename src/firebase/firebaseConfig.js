import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_TLo_lBkQj1oB0vn5oG_18KvZsLZdS7Y",
  authDomain: "vue-auth-tfe.firebaseapp.com",
  projectId: "vue-auth-tfe",
  databaseURL: "https://vue-auth-tfe-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "vue-auth-tfe.appspot.com",
  messagingSenderId: "611098957271",
  appId: "1:611098957271:web:c928f46428754ee43ae792",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);



export { auth, database, ref }

console.log('hi')