import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmLxhR6CWb7mOQa2onI_6M9GFERIxh2Qk",
  authDomain: "app-react-journalapp.firebaseapp.com",
  projectId: "app-react-journalapp",
  storageBucket: "app-react-journalapp.appspot.com",
  messagingSenderId: "106908712674",
  appId: "1:106908712674:web:af6ddb936a93384d8928bb",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthLogin = new firebase.auth.GoogleAuthProvider();
export { db, googleAuthLogin, firebase };
