import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyB6lDQuvNLcXWQPUrRrsu89Zvg88rdMrhQ",
    authDomain: "table-sut.firebaseapp.com",
    databaseURL: "https://table-sut.firebaseio.com",
    projectId: "table-sut",
    storageBucket: "table-sut.appspot.com",
    messagingSenderId: "322691658519"
  };
  firebase.initializeApp(config);
  export const ref = firebase.database().ref()
  export const get = firebase.database();
  export const tasksRef = ref.child('table');
  export const firebaseAuth = firebase.auth