import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0u3scerxQVqM6F785q7ZnWDzo6q59EY8",
  authDomain: "basetask-407d4.firebaseapp.com",
  databaseURL: "https://basetask-407d4-default-rtdb.firebaseio.com",
  projectId: "basetask-407d4",
  storageBucket: "basetask-407d4.appspot.com",
  messagingSenderId: "545324826097",
  appId: "1:545324826097:web:fce5c7fde048be1000d850",
  measurementId: "G-T8QDHR3J3D"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);
export {app, storage, database ,auth };
