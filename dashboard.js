// import { auth, db } from "./firebase.js";

// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   doc,
//   updateDoc,
//   getDoc
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// const postBtn = document.getElementById("postBtn");
// const list = document.getElementById("list");

// let userRole = "";

// onAuthStateChanged(auth, async (user) => {
//   if (!user) return (window.location = "index.html");

//   const userDoc = await getDoc(doc(db, "users", user.uid));
//   userRole = userDoc.data().role;

//   document.getElementById("userRole").innerText = userRole;

//   if (userRole === "ngo") {
//     document.getElementById("donorSection").style.display = "none";
//   }

//   loadFood();
// });

// postBtn.addEventListener("click", async () => {
//   await addDoc(collection(db, "food"), {
//     food: food.value,
//     qty: qty.value,
//     loc: loc.value,
//     status: "available"
//   });
// });

// function loadFood() {
//   onSnapshot(collection(db, "food"), (snapshot) => {
//     list.innerHTML = "";

//     snapshot.forEach(docSnap => {
//       const d = docSnap.data();

//       const div = document.createElement("div");
//       div.className = "card";

//       div.innerHTML = `
//         <b>${d.food}</b> - ${d.qty} (${d.loc}) <br>
//         Status: ${d.status}
//       `;

//       if (userRole === "ngo" && d.status === "available") {
//         const btn = document.createElement("button");
//         btn.innerText = "Claim";

//         btn.onclick = async () => {
//           await updateDoc(doc(db, "food", docSnap.id), {
//             status: "claimed"
//           });
//         };

//         div.appendChild(btn);
//       }

//       list.appendChild(div);
//     });
//   });
// }




import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const donorSection = document.getElementById('donor-section');
const ngoSection = document.getElementById('ngo-section');
const userDisplay = document.getElementById('user-display');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        userDisplay.innerText = `${userData.name} (${userData.role})`;

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
        donorName: userDisplay.innerText.split(' (')[0],
        status: 'available',
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "donations"), foodData);
        alert("Food listed successfully!");
        e.target.reset();
    } catch (error) { alert(error.message); }
};

// NGO: Load Available Food [cite: 23]
function loadAvailableFood() {
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    onSnapshot(q, (snapshot) => {
        const feed = document.getElementById('available-feed');
        feed.innerHTML = '';
        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            feed.innerHTML += `
                <div class="card">
                    <span class="badge badge-available">Available</span>
                    <h4>${item.foodType}</h4>
                    <p><b>Qty:</b> ${item.quantity} | <b>Expires in:</b> ${item.shelfLife}</p>
                    <p><b>Pickup:</b> ${item.address}</p>
                    <p><small>By: ${item.donorName}</small></p>
                    <button onclick="claimFood('${docSnap.id}')">Claim for Pickup</button>
                </div>`;
        });
    });
}

// NGO: Claiming System [cite: 24, 25]
window.claimFood = async (id) => {
    const donationRef = doc(db, "donations", id);
    await updateDoc(donationRef, {
        status: 'claimed',
        claimedBy: auth.currentUser.uid,
        claimedByName: userDisplay.innerText.split(' (')[0]
    });
    alert("Food claimed! Please coordinate with the donor for pickup.");
};

// Donor: View History [cite: 21]
function loadDonorHistory(uid) {
    const q = query(collection(db, "donations"), where("donorId", "==", uid));
    onSnapshot(q, (snapshot) => {
        const history = document.getElementById('donor-history');
        history.innerHTML = '';
        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            const statusClass = item.status === 'available' ? 'badge-available' : 'badge-claimed';
            history.innerHTML += `
                <div class="card">
                    <span class="badge ${statusClass}">${item.status}</span>
                    <h4>${item.foodType}</h4>
                    <p>${item.quantity} - ${item.address}</p>
                    ${item.status === 'claimed' ? `<p><small>Claimed by: ${item.claimedByName}</small></p>` : ''}
                </div>`;
        });
    });
}

// Logout
document.getElementById('logout-btn').onclick = () => signOut(auth);
