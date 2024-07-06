// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'
// const firebaseConfig = {
//     apiKey: "AIzaSyD9lXtD84uPA31r47x_LdHNi3-VZ-IRH7w",
//     authDomain: "auth-1-abfa2.firebaseapp.com",
//     projectId: "auth-1-abfa2",
//     storageBucket: "auth-1-abfa2.appspot.com",
//     messagingSenderId: "907229545657",
//     appId: "1:907229545657:web:c1248b882e067325834768",
//     measurementId: "G-N2V1076ZLZ"
//   };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// export {auth,app}


// Firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9lXtD84uPA31r47x_LdHNi3-VZ-IRH7w",
  authDomain: "auth-1-abfa2.firebaseapp.com",
  projectId: "auth-1-abfa2",
  storageBucket: "auth-1-abfa2.appspot.com",
  messagingSenderId: "907229545657",
  appId: "1:907229545657:web:c1248b882e067325834768",
  measurementId: "G-N2V1076ZLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };
