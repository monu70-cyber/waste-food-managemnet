import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let isLogin = true;

// Forcefully hide fields on load
document.getElementById('name-group').style.display = 'none';
document.getElementById('role-group').style.display = 'none';

// Make the ENTIRE line clickable
document.getElementById('toggle-msg').addEventListener('click', () => {
    isLogin = !isLogin; 
    
    document.getElementById('auth-title').innerText = isLogin ? 'Login to FoodShare' : 'Sign Up for FoodShare';
    document.getElementById('auth-btn').innerText = isLogin ? 'Login' : 'Sign Up';
    
    if (isLogin) {
        document.getElementById('name-group').style.display = 'none';
        document.getElementById('role-group').style.display = 'none';
    } else {
        document.getElementById('name-group').style.display = 'block';
        document.getElementById('role-group').style.display = 'block';
    }

    document.getElementById('toggle-msg').innerHTML = isLogin ? 
        `Don't have an account? <span id="toggle-auth" style="color: #2ecc71; text-decoration: underline; font-weight: bold;">Sign Up</span>` : 
        `Already have an account? <span id="toggle-auth" style="color: #2ecc71; text-decoration: underline; font-weight: bold;">Login</span>`;
});

// Authentication Submit Logic
document.getElementById('auth-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } else {
            const name = document.getElementById('user-name').value;
            const role = document.getElementById('role').value;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
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
