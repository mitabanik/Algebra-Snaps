// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfUwWZFxjI3Ov7JtILpRcyTbnToMSLK3Y",
  authDomain: "lin-app-c7455.firebaseapp.com",
  projectId: "lin-app-c7455",
  storageBucket: "lin-app-c7455.appspot.com",
  messagingSenderId: "767542578748",
  appId: "1:767542578748:web:07101be447dc39bb02bd39"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app,db,storage };
