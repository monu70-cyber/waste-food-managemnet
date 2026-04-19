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




// import { auth, db } from './firebase.js';
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp 
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// const donorSection = document.getElementById('donor-section');
// const ngoSection = document.getElementById('ngo-section');
// const userDisplay = document.getElementById('user-display');

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         const userData = userDoc.data();
//         userDisplay.innerText = `${userData.name} (${userData.role})`;

//         if (userData.role === 'donor') {
//             donorSection.classList.remove('hidden');
//             loadDonorHistory(user.uid);
//         } else {
//             ngoSection.classList.remove('hidden');
//             loadAvailableFood();
//         }
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// // Donor: Submit Donation 
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
//     const foodData = {
//         foodType: document.getElementById('food-type').value,
//         quantity: document.getElementById('quantity').value,
//         shelfLife: document.getElementById('shelf-life').value,
//         address: document.getElementById('address').value,
//         donorId: auth.currentUser.uid,
//         donorName: userDisplay.innerText.split(' (')[0],
//         status: 'available',
//         createdAt: serverTimestamp()
//     };

//     try {
//         await addDoc(collection(db, "donations"), foodData);
//         alert("Food listed successfully!");
//         e.target.reset();
//     } catch (error) { alert(error.message); }
// };

// // NGO: Load Available Food [cite: 23]
// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         const feed = document.getElementById('available-feed');
//         feed.innerHTML = '';
//         snapshot.forEach((docSnap) => {
//             const item = docSnap.data();
//             feed.innerHTML += `
//                 <div class="card">
//                     <span class="badge badge-available">Available</span>
//                     <h4>${item.foodType}</h4>
//                     <p><b>Qty:</b> ${item.quantity} | <b>Expires in:</b> ${item.shelfLife}</p>
//                     <p><b>Pickup:</b> ${item.address}</p>
//                     <p><small>By: ${item.donorName}</small></p>
//                     <button onclick="claimFood('${docSnap.id}')">Claim for Pickup</button>
//                 </div>`;
//         });
//     });
// }

// // NGO: Claiming System [cite: 24, 25]
// window.claimFood = async (id) => {
//     const donationRef = doc(db, "donations", id);
//     await updateDoc(donationRef, {
//         status: 'claimed',
//         claimedBy: auth.currentUser.uid,
//         claimedByName: userDisplay.innerText.split(' (')[0]
//     });
//     alert("Food claimed! Please coordinate with the donor for pickup.");
// };

// // Donor: View History [cite: 21]
// function loadDonorHistory(uid) {
//     const q = query(collection(db, "donations"), where("donorId", "==", uid));
//     onSnapshot(q, (snapshot) => {
//         const history = document.getElementById('donor-history');
//         history.innerHTML = '';
//         snapshot.forEach((docSnap) => {
//             const item = docSnap.data();
//             const statusClass = item.status === 'available' ? 'badge-available' : 'badge-claimed';
//             history.innerHTML += `
//                 <div class="card">
//                     <span class="badge ${statusClass}">${item.status}</span>
//                     <h4>${item.foodType}</h4>
//                     <p>${item.quantity} - ${item.address}</p>
//                     ${item.status === 'claimed' ? `<p><small>Claimed by: ${item.claimedByName}</small></p>` : ''}
//                 </div>`;
//         });
//     });
// }

// // Logout
// document.getElementById('logout-btn').onclick = () => signOut(auth);
import { auth, db, storage } from './firebase.js'; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const donorSection = document.getElementById('donor-section');
const ngoSection = document.getElementById('ngo-section');
const adminSection = document.getElementById('admin-section');
const userDisplay = document.getElementById('user-display');

// Check User Auth State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        
        userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

        if (userData.role === 'admin') {
            adminSection.classList.remove('hidden');
            loadAdminDashboard();
        } else if (userData.role === 'donor') {
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
    
    const submitBtn = e.target.querySelector('button');
    submitBtn.innerText = "Uploading...";
    submitBtn.disabled = true;

    const file = document.getElementById('food-photo').files[0];
    let photoURL = "https://via.placeholder.com/300?text=No+Image+Available"; 

    try {
        if (file) {
            const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            photoURL = await getDownloadURL(snapshot.ref);
        }

        const foodData = {
            foodType: document.getElementById('food-type').value,
            quantity: document.getElementById('quantity').value,
            shelfLife: document.getElementById('shelf-life').value,
            address: document.getElementById('address').value,
            image: photoURL,
            donorId: auth.currentUser.uid,
            donorName: userDisplay.innerText.split(' •')[0],
            status: 'available',
            createdAt: serverTimestamp()
        };

        await addDoc(collection(db, "donations"), foodData);
        e.target.reset(); 
        alert("Food listed successfully!");
    } catch (error) { 
        alert("Error posting donation: " + error.message); 
    } finally {
        submitBtn.innerText = "List Food Item";
        submitBtn.disabled = false;
    }
};

// NGO: Load Available Food Feed [cite: 23]
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
                <div class="card">
                    <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
                    <span class="badge badge-available">Available</span>
                    <h4>${item.foodType}</h4>
                    <p><b>Qty:</b> ${item.quantity} | <b>Expires:</b> ${item.shelfLife}</p>
                    <p><b>Pickup:</b> ${item.address}</p>
                    <p><small>By: ${item.donorName}</small></p>
                    <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
                </div>`;
        });
    });
}

// NGO: Claiming System [cite: 24, 25]
window.claimFood = async (id) => {
    if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
        const donationRef = doc(db, "donations", id);
        await updateDoc(donationRef, {
            status: 'claimed',
            claimedBy: auth.currentUser.uid,
            claimedByName: userDisplay.innerText.split(' •')[0]
        });
        alert("Food claimed! Please coordinate with the donor for pickup.");
    }
};

// Donor: View History [cite: 21]
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
            const statusClass = isAvailable ? 'badge-available' : 'badge-claimed';
            
            history.innerHTML += `
                <div class="card">
                    <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
                    <span class="badge ${statusClass}">${item.status}</span>
                    <h4>${item.foodType}</h4>
                    <p>${item.quantity} - ${item.address}</p>
                    ${!isAvailable ? `<p><small>Claimed by: ${item.claimedByName}</small></p>` : ''}
                </div>`;
        });
    });
}

// Admin: Dashboard Logic [cite: 38, 40]
function loadAdminDashboard() {
    const qDonations = query(collection(db, "donations"), orderBy("createdAt", "desc"));
    onSnapshot(qDonations, (snapshot) => {
        const masterFeed = document.getElementById('admin-master-feed');
        document.getElementById('stat-total-donations').innerText = snapshot.size;
        masterFeed.innerHTML = '';

        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            const statusClass = item.status === 'available' ? 'badge-available' : 'badge-claimed';
            
            masterFeed.innerHTML += `
                <div class="card">
                    <span class="badge ${statusClass}">${item.status}</span>
                    <h4>${item.foodType}</h4>
                    <p><b>Donor:</b> ${item.donorName}</p>
                    <p><b>Location:</b> ${item.address}</p>
                    ${item.status === 'claimed' ? `<p><small>Claimed by: ${item.claimedByName}</small></p>` : ''}
                    <button class="logout-btn" onclick="deleteDonation('${docSnap.id}')" style="margin-top:10px; font-size:0.8rem; width:100%;">Remove Entry</button>
                </div>`;
        });
    });

    onSnapshot(collection(db, "users"), (snapshot) => {
        document.getElementById('stat-active-users').innerText = snapshot.size;
    });
}

// Admin: Delete Capability
window.deleteDonation = async (id) => {
    if(confirm("Admin: Are you sure you want to delete this donation record?")) {
        await deleteDoc(doc(db, "donations", id));
        alert("Record removed from system.");
    }
};

// Logout
document.getElementById('logout-btn').onclick = () => signOut(auth);
