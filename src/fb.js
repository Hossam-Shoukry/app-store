// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBzXxd_-rGE-u3jwxmzSZxbxA5s2eBA4-Q",
  authDomain: "hossamproject-a655e.firebaseapp.com",
  projectId: "hossamproject-a655e",
  storageBucket: "hossamproject-a655e.appspot.com",
  messagingSenderId: "687986388793",
  appId: "1:687986388793:web:9fe0b455f42d1787e782e8",
  measurementId: "G-VQJ8Z36T5C",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage";
const storage = getStorage(app);
export { storage as storage };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// to get warning messages in the consol
db.settings({ timestampsInSnapshots: true, merge: true });

export default db;
