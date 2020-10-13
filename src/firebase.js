import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqAXIF2kETYADLrsNQj4gOT8mS-54Illo",
  authDomain: "intern-app-d8398.firebaseapp.com",
  databaseURL: "https://intern-app-d8398.firebaseio.com",
  projectId: "intern-app-d8398",
  storageBucket: "intern-app-d8398.appspot.com",
  messagingSenderId: "609483184975",
  appId: "1:609483184975:web:7049fa4188abfeaf5e833a",
  measurementId: "G-5CTYW4W7QB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {  auth , provider, storage};
export default db;