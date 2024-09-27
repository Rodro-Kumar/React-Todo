// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe7LsTvIGWzaceSpFnES-0dM1xbbjS-1c",
  authDomain: "todo-react-4ee6b.firebaseapp.com",
  projectId: "todo-react-4ee6b",
  storageBucket: "todo-react-4ee6b.appspot.com",
  messagingSenderId: "564548245578",
  appId: "1:564548245578:web:36a255dfeb77359be9aeb3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;
