// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA3QCigrn4mmO9UWyKPHGJwASUKjfR_lc0",
  authDomain: "menux-a8f29.firebaseapp.com",
  projectId: "menux-a8f29",
  messagingSenderId: "771444133976",
  appId: "1:771444133976:web:f196ff485dcaeb11d23a2d",
});

const messaging = firebase.messaging();
