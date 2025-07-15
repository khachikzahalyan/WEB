import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy977mkwj8GtWQOaptz78cLKrl0AlsR0Q",
  authDomain: "web-teacher-student.firebaseapp.com",
  projectId: "web-teacher-student",
  storageBucket: "web-teacher-student.firebasestorage.app",
  messagingSenderId: "44742399896",
  appId: "1:44742399896:web:a9d5cc4d1c9d559c7c3ded"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };