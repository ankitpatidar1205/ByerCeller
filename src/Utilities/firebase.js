// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWpDhFChz1R3q7QqrQYb_oCFbBb8Vzyvo",
  authDomain: "ai-skills-288a5.firebaseapp.com",
  projectId: "ai-skills-288a5",
  storageBucket: "ai-skills-288a5.firebasestorage.app",
  messagingSenderId: "1070215326903",
  appId: "1:1070215326903:web:64de108a43ee8d670ab132",
  measurementId: "G-J0HRNDTMVD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
