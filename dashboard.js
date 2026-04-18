import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const donorSection = document.getElementById('donor-section');
const ngoSection = document.getElementById('ngo-section');
const userDisplay = document.getElementById('user-display');

// Check User Auth State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        
        // Format the badge: "Organization Name • Role"
        userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

        if (userData.role === 'donor') {
            donorSection.classList.remove('hidden');
            loadDonorHistory(user.uid);
        } else {
            ngoSection.classList.remove('hidden');
            loadAvailableFood();
        }
    } else {
        window.location.href = 'index.html';
    }
});

// Donor: Submit Donation
document.getElementById('donation-form').onsubmit = async (e) => {
    e.preventDefault();
    const foodData = {
        foodType: document.getElementById('food-type').value,
        quantity: document.getElementById('quantity').value,
        shelfLife: document.getElementById('shelf-life').value,
        address: document.getElementById('address').value,
        donorId: auth.currentUser.uid,
        donorName: userDisplay.innerText.split(' •')[0],
        status: 'available',
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "donations"), foodData);
        e.target.reset(); // Clear form on success
    } catch (error) { 
        alert("Error posting donation: " + error.message); 
    }
};

// NGO: Load Available Food Feed
function loadAvailableFood() {
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    onSnapshot(q, (snapshot) => {
        const feed = document.getElementById('available-feed');
        feed.innerHTML = '';
        
        if(snapshot.empty) {
            feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
            return;
        }

        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            feed.innerHTML += `
                <div class="data-card">
                    <span class="status-badge badge-available">Available</span>
                    <h4 class="card-title">${item.foodType}</h4>
                    <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                    <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
                    <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                    <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                    <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
                </div>`;
        });
    });
}

// NGO: Claiming System
window.claimFood = async (id) => {
    if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
        const donationRef = doc(db, "donations", id);
        await updateDoc(donationRef, {
            status: 'claimed',
            claimedBy: auth.currentUser.uid,
            claimedByName: userDisplay.innerText.split(' •')[0]
        });
    }
};

// Donor: View History
function loadDonorHistory(uid) {
    const q = query(collection(db, "donations"), where("donorId", "==", uid));
    onSnapshot(q, (snapshot) => {
        const history = document.getElementById('donor-history');
        history.innerHTML = '';

        if(snapshot.empty) {
            history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
            return;
        }

        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            const isAvailable = item.status === 'available';
            
            history.innerHTML += `
                <div class="data-card">
                    <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
                    <h4 class="card-title">${item.foodType}</h4>
                    <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                    <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                    ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
                </div>`;
        });
    });
}

// Logout
document.getElementById('logout-btn').onclick = () => signOut(auth);
