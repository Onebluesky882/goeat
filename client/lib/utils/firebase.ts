// utils/firebase.ts or lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA3QCigrn4mmO9UWyKPHGJwASUKjfR_lc0",
  authDomain: "menux-a8f29.firebaseapp.com",
  projectId: "menux-a8f29",
  storageBucket: "menux-a8f29.firebasestorage.app",
  messagingSenderId: "771444133976",
  appId: "1:771444133976:web:f196ff485dcaeb11d23a2d",
  measurementId: "G-CBTG86RNCH",
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Initialize Messaging
const messaging = getMessaging(app);

export { app, messaging };
