 // firebase.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDt3TIAyxKRCe3qqaBXCxTtei7MNs_WNn4",
//   authDomain: "food-management-37781.firebaseapp.com",
//   projectId: "food-management-37781",
//   storageBucket: "food-management-37781.firebasestorage.app",
//   messagingSenderId: "714758924336",
//   appId: "1:714758924336:web:3852121d964d5145cd65f5",
//   measurementId: "G-LXDX5DGCMY"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);


// // firebase.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "YOUR_KEY",
//   authDomain: "YOUR_PROJECT.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
// };
// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
