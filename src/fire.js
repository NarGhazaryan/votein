import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyABIgttq2hgUO9teh_6a0Eisvr4qmMtMf0",
  authDomain: "gilazlpc.firebaseapp.com",
  databaseURL: "https://gilazlpc.firebaseio.com",
  projectId: "gilazlpc",
  storageBucket: "gilazlpc.appspot.com",
  messagingSenderId: "478309256054",
  appId: "1:478309256054:web:ddfa540165e3d2d3c28857"
};

firebase.initializeApp(firebaseConfig)

export default firebase