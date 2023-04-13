import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6Sq4m4IQAYKl0xT1xnlpbFCUcxNTjUsE",
  authDomain: "binarybotdb.firebaseapp.com",
  databaseURL: "https://binarybotdb-default-rtdb.firebaseio.com",
  projectId: "binarybotdb",
  storageBucket: "binarybotdb.appspot.com",
  messagingSenderId: "322385529711",
  appId: "1:322385529711:web:f3b8749b84cdee46f6369a"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebase.firestore();
export default firebase;
