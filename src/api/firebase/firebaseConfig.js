import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
/**
 * Mas adelante se introduciran los valores que no estan abiertos al publico
 * en variables de entorno
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
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
