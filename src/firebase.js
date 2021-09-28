import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC7hCHl6tJVWdkh8fMeth3w2trl9hDCxp0",
  authDomain: "todo-app-7a4ce.firebaseapp.com",
  projectId: "todo-app-7a4ce",
  storageBucket: "todo-app-7a4ce.appspot.com",
  messagingSenderId: "998734183471",
  appId: "1:998734183471:web:f81ab918c24e73d6165ada",
  measurementId: "G-H3ZMR3KZQH",
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default db;
