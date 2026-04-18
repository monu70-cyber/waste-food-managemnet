import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let isLogin = true;

// Forcefully hide Name and Role fields on initial load
document.getElementById('name-group').style.display = 'none';
document.getElementById('role-group').style.display = 'none';

// Bulletproof toggle logic using Event Delegation
document.getElementById('toggle-msg').addEventListener('click', (e) => {
    // Check if the user clicked the 'Sign Up' or 'Login' span
    if (e.target.id === 'toggle-auth') {
        isLogin = !isLogin; // Switch the state
        
        // Update Title and Button text
        document.getElementById('auth-title').innerText = isLogin ? 'Login to FoodShare' : 'Sign Up for FoodShare';
        document.getElementById('auth-btn').innerText = isLogin ? 'Login' : 'Sign Up';
        
        // Forcefully Show/Hide the extra fields
        if (isLogin) {
            document.getElementById('name-group').style.display = 'none';
            document.getElementById('role-group').style.display = 'none';
        } else {
            document.getElementById('name-group').style.display = 'block';
            document.getElementById('role-group').style.display = 'block';
        }

        // Update the message at the bottom securely
        document.getElementById('toggle-msg').innerHTML = isLogin ? 
            `Don't have an account? <span id="toggle-auth">Sign Up</span>` : 
            `Already have an account? <span id="toggle-auth">Login</span>`;
    }
});

// Authentication Submit Logic
document.getElementById('auth-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLogin) {
            // Login Process
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } else {
            // Sign Up Process
            const name = document.getElementById('user-name').value;
            const role = document.getElementById('role').value;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Save the user's role (Donor/NGO) to Firestore Database
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                role: role,
                email: email
            });
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        alert(error.message); // This will pop up if the password is too short or email is invalid
    }
};
