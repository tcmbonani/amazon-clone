import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBW63hzD_Z7YQUzzzSO92zAMJMiRwoFbvM",
    authDomain: "clone-fa92e.firebaseapp.com",
    projectId: "clone-fa92e",
    storageBucket: "clone-fa92e.appspot.com",
    messagingSenderId: "505955065224",
    appId: "1:505955065224:web:33133e0b585edde79eae3d"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth()

  export {db, auth}