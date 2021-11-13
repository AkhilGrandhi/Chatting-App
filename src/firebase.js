import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX05kL9VMB4Mymjor7Amn9TYdcnAKES70",
  authDomain: "whatsapp-clone-71f18.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-71f18.firebaseio.com",
  projectId: "whatsapp-clone-71f18",
  storageBucket: "whatsapp-clone-71f18.appspot.com",
  messagingSenderId: "293408981477",
  appId: "1:293408981477:web:e87ed2be8aeec957732f0c",
  measurementId: "G-E51T85TQZ2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {  auth , provider, storage};
export default db;
