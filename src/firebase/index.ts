import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDxWNWE9rRrXEK_QeZJy-duhfbW-xiC9WU",
  authDomain: "expense-champion.firebaseapp.com",
  databaseURL: "https://expense-champion.firebaseio.com",
  projectId: "expense-champion",
  storageBucket: "expense-champion.appspot.com",
  messagingSenderId: "507304247160"
};

firebase.initializeApp(config);

const db = firebase.database();

export { db };
