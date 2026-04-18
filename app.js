import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.signup = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const user = await createUserWithEmailAndPassword(auth, email, pass);

  await addDoc(collection(db, "users"), {
    uid: user.user.uid,
    role: role
  });

  alert("Signup Successful");
};

window.login = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, pass);
  window.location = "dashboard.html";
};
