import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0M23nEr1ENLtATuUYA0U5GDdgGRAuVyQ",
  authDomain: "dashboard-8917c.firebaseapp.com",
  projectId: "dashboard-8917c",
  storageBucket: "dashboard-8917c.appspot.com",
  messagingSenderId: "290978462017",
  appId: "1:290978462017:web:8cb8263ae5117a1a2109c0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)