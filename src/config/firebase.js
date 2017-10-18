import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU",
  authDomain: "react-firebase-68392.firebaseapp.com",
  databaseURL: "https://react-firebase-68392.firebaseio.com",
  };
  export const app = firebase.initializeApp(config)
  export const ref = firebase.database().ref()
  export const get = firebase.database();
  export const tasksRef = ref.child('users');
  export const firebaseAuth = firebase.auth()
  export const facebookProvider = new firebase.auth.FacebookAuthProvider()
  export function auth (email, pw) {
       return firebaseAuth().createUserWithEmailAndPassword(email, pw)
  }