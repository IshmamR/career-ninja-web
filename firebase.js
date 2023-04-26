import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuQ6PcRWjOlDUTpursl6uxHwN7qsNFor0",
  authDomain: "career-ninja-web.firebaseapp.com",
  projectId: "career-ninja-web",
  storageBucket: "career-ninja-web.appspot.com",
  messagingSenderId: "142218659326",
  appId: "1:142218659326:web:dfa371c3a46a096dee2caf",
  measurementId: "G-L6JYXC5DR2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
