import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "rms-project-ea1b9.firebaseapp.com",
  projectId: "rms-project-ea1b9",
  storageBucket: "rms-project-ea1b9.appspot.com",
  messagingSenderId: "794302513423",
  appId: "1:794302513423:web:441cb34bac4844ab6fbe7a"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_KEY);
