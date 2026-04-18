// import { auth, db } from "./firebase.js";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// import {
//   doc,
//   setDoc,
//   getDoc
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// const signupBtn = document.getElementById("signupBtn");
// const loginBtn = document.getElementById("loginBtn");

// signupBtn.addEventListener("click", async () => {
//   const email = email.value;
//   const password = password.value;
//   const role = role.value;

//   const userCred = await createUserWithEmailAndPassword(auth, email, password);

//   await setDoc(doc(db, "users", userCred.user.uid), {
//     role
//   });

//   alert("Signup success");
// });

// loginBtn.addEventListener("click", async () => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   await signInWithEmailAndPassword(auth, email, password);
//   window.location = "dashboard.html";
// });

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("Logged in:", user.email);
//   }
// });
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const authForm = document.getElementById('auth-form');
const toggleAuth = document.getElementById('toggle-auth');
let isLogin = true;

toggleAuth.onclick = () => {
    isLogin = !isLogin;
    document.getElementById('auth-title').innerText = isLogin ? 'Login' : 'Sign Up';
    document.getElementById('auth-btn').innerText = isLogin ? 'Login' : 'Sign Up';
    document.getElementById('name-group').classList.toggle('hidden', isLogin);
    document.getElementById('role-group').classList.toggle('hidden', isLogin);
    document.getElementById('toggle-msg').innerHTML = isLogin ? 
        `Don't have an account? <span id="toggle-auth">Sign Up</span>` : 
        `Already have an account? <span id="toggle-auth">Login</span>`;
};

authForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLogin) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } else {
            const name = document.getElementById('user-name').value;
            const role = document.getElementById('role').value;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Store role in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                role: role,
                email: email
            });
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        alert(error.message);
    }
};
