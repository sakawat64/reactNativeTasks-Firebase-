import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCooo_2jvY2CUomgHiYLrZumgtnSQGe44I",
  authDomain: "todo-a99bf.firebaseapp.com",
  databaseURL: "https://todo-a99bf.firebaseio.com",
  projectId: "todo-a99bf",
  storageBucket: "todo-a99bf.appspot.com",
  messagingSenderId: "803477517261",
  appId: "1:803477517261:web:653c7e9f371905d2a2ca84",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
