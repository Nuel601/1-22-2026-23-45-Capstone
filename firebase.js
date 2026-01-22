// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_MO",
  authDomain: "PASTE_MO",
  projectId: "PASTE_MO",
  storageBucket: "PASTE_MO",
  messagingSenderId: "PASTE_MO",
  appId: "PASTE_MO"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
