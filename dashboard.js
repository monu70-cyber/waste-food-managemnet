// // import { auth, db } from './firebase.js';
// // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // import { 
// //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// // const donorSection = document.getElementById('donor-section');
// // const ngoSection = document.getElementById('ngo-section');
// // const userDisplay = document.getElementById('user-display');

// // // Check User Auth State
// // onAuthStateChanged(auth, async (user) => {
// //     if (user) {
// //         const userDoc = await getDoc(doc(db, "users", user.uid));
// //         const userData = userDoc.data();
        
// //         // Format the badge: "Organization Name • Role"
// //         userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// //         if (userData.role === 'donor') {
// //             donorSection.classList.remove('hidden');
// //             loadDonorHistory(user.uid);
// //         } else {
// //             ngoSection.classList.remove('hidden');
// //             loadAvailableFood();
// //         }
// //     } else {
// //         window.location.href = 'index.html';
// //     }
// // });

// // // Donor: Submit Donation
// // document.getElementById('donation-form').onsubmit = async (e) => {
// //     e.preventDefault();
// //     const foodData = {
// //         foodType: document.getElementById('food-type').value,
// //         quantity: document.getElementById('quantity').value,
// //         shelfLife: document.getElementById('shelf-life').value,
// //         address: document.getElementById('address').value,
// //         donorId: auth.currentUser.uid,
// //         donorName: userDisplay.innerText.split(' •')[0],
// //         status: 'available',
// //         createdAt: serverTimestamp()
// //     };

// //     try {
// //         await addDoc(collection(db, "donations"), foodData);
// //         e.target.reset(); // Clear form on success
// //     } catch (error) { 
// //         alert("Error posting donation: " + error.message); 
// //     }
// // };

// // // NGO: Load Available Food Feed
// // function loadAvailableFood() {
// //     const q = query(collection(db, "donations"), where("status", "==", "available"));
// //     onSnapshot(q, (snapshot) => {
// //         const feed = document.getElementById('available-feed');
// //         feed.innerHTML = '';
        
// //         if(snapshot.empty) {
// //             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
// //             return;
// //         }

// //         snapshot.forEach((docSnap) => {
// //             const item = docSnap.data();
// //             feed.innerHTML += `
// //                 <div class="data-card">
// //                     <span class="status-badge badge-available">Available</span>
// //                     <h4 class="card-title">${item.foodType}</h4>
// //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// //                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// //                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// //                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
// //                 </div>`;
// //         });
// //     });
// // }

// // // NGO: Claiming System
// // window.claimFood = async (id) => {
// //     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
// //         const donationRef = doc(db, "donations", id);
// //         await updateDoc(donationRef, {
// //             status: 'claimed',
// //             claimedBy: auth.currentUser.uid,
// //             claimedByName: userDisplay.innerText.split(' •')[0]
// //         });
// //     }
// // };

// // // Donor: View History
// // function loadDonorHistory(uid) {
// //     const q = query(collection(db, "donations"), where("donorId", "==", uid));
// //     onSnapshot(q, (snapshot) => {
// //         const history = document.getElementById('donor-history');
// //         history.innerHTML = '';

// //         if(snapshot.empty) {
// //             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
// //             return;
// //         }

// //         snapshot.forEach((docSnap) => {
// //             const item = docSnap.data();
// //             const isAvailable = item.status === 'available';
            
// //             history.innerHTML += `
// //                 <div class="data-card">
// //                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
// //                     <h4 class="card-title">${item.foodType}</h4>
// //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// //                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
// //                 </div>`;
// //         });
// //     });
// // }

// // // Logout
// // document.getElementById('logout-btn').onclick = () => signOut(auth);
// // import { auth, db, storage } from './firebase.js'; // Added storage import
// // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // import { 
// //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// // // Added Storage specific imports
// // import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// // const donorSection = document.getElementById('donor-section');
// // const ngoSection = document.getElementById('ngo-section');
// // const userDisplay = document.getElementById('user-display');

// // // Check User Auth State
// // onAuthStateChanged(auth, async (user) => {
// //     if (user) {
// //         const userDoc = await getDoc(doc(db, "users", user.uid));
// //         const userData = userDoc.data();
        
// //         // Format the badge: "Organization Name • Role"
// //         userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// //         if (userData.role === 'donor') {
// //             donorSection.classList.remove('hidden');
// //             loadDonorHistory(user.uid);
// //         } else {
// //             ngoSection.classList.remove('hidden');
// //             loadAvailableFood();
// //         }
// //     } else {
// //         window.location.href = 'index.html';
// //     }
// // });

// // // Donor: Submit Donation (Updated to handle Photo Uploads)
// // document.getElementById('donation-form').onsubmit = async (e) => {
// //     e.preventDefault();
    
// //     const submitBtn = e.target.querySelector('button');
// //     submitBtn.innerText = "Uploading...";
// //     submitBtn.disabled = true;

// //     const file = document.getElementById('food-photo').files[0];
// //     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available"; // Default placeholder

// //     try {
// //         // Handle image upload if a file is selected
// //         if (file) {
// //             const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
// //             const snapshot = await uploadBytes(storageRef, file);
// //             photoURL = await getDownloadURL(snapshot.ref);
// //         }

// //         const foodData = {
// //             foodType: document.getElementById('food-type').value,
// //             quantity: document.getElementById('quantity').value,
// //             shelfLife: document.getElementById('shelf-life').value,
// //             address: document.getElementById('address').value,
// //             image: photoURL, // Store the uploaded image URL
// //             donorId: auth.currentUser.uid,
// //             donorName: userDisplay.innerText.split(' •')[0],
// //             status: 'available',
// //             createdAt: serverTimestamp()
// //         };

// //         await addDoc(collection(db, "donations"), foodData);
// //         e.target.reset(); // Clear form on success
// //         alert("Donation posted successfully!");
// //     } catch (error) { 
// //         alert("Error posting donation: " + error.message); 
// //     } finally {
// //         submitBtn.innerText = "List Food Item";
// //         submitBtn.disabled = false;
// //     }
// // };

// // // NGO: Load Available Food Feed (Updated to display images)
// // function loadAvailableFood() {
// //     const q = query(collection(db, "donations"), where("status", "==", "available"));
// //     onSnapshot(q, (snapshot) => {
// //         const feed = document.getElementById('available-feed');
// //         feed.innerHTML = '';
        
// //         if(snapshot.empty) {
// //             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
// //             return;
// //         }

// //         snapshot.forEach((docSnap) => {
// //             const item = docSnap.data();
// //             feed.innerHTML += `
// //                 <div class="data-card">
// //                     <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// //                     <span class="status-badge badge-available">Available</span>
// //                     <h4 class="card-title">${item.foodType}</h4>
// //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// //                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// //                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// //                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
// //                 </div>`;
// //         });
// //     });
// // }

// // // NGO: Claiming System
// // window.claimFood = async (id) => {
// //     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
// //         const donationRef = doc(db, "donations", id);
// //         await updateDoc(donationRef, {
// //             status: 'claimed',
// //             claimedBy: auth.currentUser.uid,
// //             claimedByName: userDisplay.innerText.split(' •')[0]
// //         });
// //     }
// // };

// // // Donor: View History (Updated to display images)
// // function loadDonorHistory(uid) {
// //     const q = query(collection(db, "donations"), where("donorId", "==", uid));
// //     onSnapshot(q, (snapshot) => {
// //         const history = document.getElementById('donor-history');
// //         history.innerHTML = '';

// //         if(snapshot.empty) {
// //             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
// //             return;
// //         }

// //         snapshot.forEach((docSnap) => {
// //             const item = docSnap.data();
// //             const isAvailable = item.status === 'available';
            
// //             history.innerHTML += `
// //                 <div class="data-card">
// //                     <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// //                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
// //                     <h4 class="card-title">${item.foodType}</h4>
// //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// //                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
// //                 </div>`;
// //         });
// //     });
// // }

// // // Logout
// // document.getElementById('logout-btn').onclick = () => signOut(auth);
// import { auth, db, storage } from './firebase.js'; 
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// const donorSection = document.getElementById('donor-section');
// const ngoSection = document.getElementById('ngo-section');
// const userDisplay = document.getElementById('user-display');

// // 1. Crash-Proof User Auth State
// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         try {
//             const userDoc = await getDoc(doc(db, "users", user.uid));
            
//             // Check if the user document actually exists in the database
//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
                
//                 // Format the badge: "Organization Name • Role"
//                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

//                 if (userData.role === 'donor') {
//                     donorSection.classList.remove('hidden');
//                     loadDonorHistory(user.uid);
//                 } else {
//                     ngoSection.classList.remove('hidden');
//                     loadAvailableFood();
//                 }
//             } else {
//                 // If data is missing, show an error instead of crashing
//                 userDisplay.innerText = "Account Data Missing";
//                 console.error("Firestore document missing for this UID.");
//             }
//         } catch (error) {
//             userDisplay.innerText = "Database Error";
//             console.error("Error fetching user data:", error);
//         }
//     } else {
//         // If not logged in, redirect to login page
//         window.location.href = 'index.html';
//     }
// });

// // Donor: Submit Donation (Updated to handle Photo Uploads)
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
    
//     const submitBtn = e.target.querySelector('button');
//     submitBtn.innerText = "Uploading...";
//     submitBtn.disabled = true;

//     const file = document.getElementById('food-photo').files[0];
//     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available"; // Default placeholder

//     try {
//         // Handle image upload if a file is selected
//         if (file) {
//             const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
//             const snapshot = await uploadBytes(storageRef, file);
//             photoURL = await getDownloadURL(snapshot.ref);
//         }

//         const foodData = {
//             foodType: document.getElementById('food-type').value,
//             quantity: document.getElementById('quantity').value,
//             shelfLife: document.getElementById('shelf-life').value,
//             address: document.getElementById('address').value,
//             image: photoURL, // Store the uploaded image URL
//             donorId: auth.currentUser.uid,
//             donorName: userDisplay.innerText.split(' •')[0],
//             status: 'available',
//             createdAt: serverTimestamp()
//         };

//         await addDoc(collection(db, "donations"), foodData);
//         e.target.reset(); // Clear form on success
//         alert("Donation posted successfully!");
//     } catch (error) { 
//         alert("Error posting donation: " + error.message); 
//     } finally {
//         submitBtn.innerText = "List Food Item";
//         submitBtn.disabled = false;
//     }
// };

// // NGO: Load Available Food Feed (Updated to display images)
// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         const feed = document.getElementById('available-feed');
//         feed.innerHTML = '';
        
//         if(snapshot.empty) {
//             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
//             return;
//         }

//         snapshot.forEach((docSnap) => {
//             const item = docSnap.data();
//             feed.innerHTML += `
//                 <div class="data-card">
//                     <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
//                     <span class="status-badge badge-available">Available</span>
//                     <h4 class="card-title">${item.foodType}</h4>
//                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
//                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
//                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
//                 </div>`;
//         });
//     });
// }

// // NGO: Claiming System
// window.claimFood = async (id) => {
//     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
//         const donationRef = doc(db, "donations", id);
//         await updateDoc(donationRef, {
//             status: 'claimed',
//             claimedBy: auth.currentUser.uid,
//             claimedByName: userDisplay.innerText.split(' •')[0]
//         });
//     }
// };

// // Donor: View History (Updated to display images)
// function loadDonorHistory(uid) {
//     const q = query(collection(db, "donations"), where("donorId", "==", uid));
//     onSnapshot(q, (snapshot) => {
//         const history = document.getElementById('donor-history');
//         history.innerHTML = '';

//         if(snapshot.empty) {
//             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
//             return;
//         }

//         snapshot.forEach((docSnap) => {
//             const item = docSnap.data();
//             const isAvailable = item.status === 'available';
            
//             history.innerHTML += `
//                 <div class="data-card">
//                     <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
//                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
//                     <h4 class="card-title">${item.foodType}</h4>
//                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
//                 </div>`;
//         });
//     });
// }

// // 2. Forceful Logout Logic 
// document.getElementById('logout-btn').addEventListener('click', async () => {
//     try {
//         await signOut(auth);
//         window.location.href = 'index.html'; // Force the redirect immediately
//     } catch (error) {
//         console.error("Logout error:", error);
//         alert("Failed to log out. Check the console.");
//     }
// });
import { auth, db, storage } from './firebase.js'; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const donorSection = document.getElementById('donor-section');
const ngoSection = document.getElementById('ngo-section');
const userDisplay = document.getElementById('user-display');

// 1. Crash-Proof User Auth State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            
            // Check if the user document actually exists in the database
            if (userDoc.exists()) {
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
                // If data is missing, show an error instead of crashing
                userDisplay.innerText = "Account Data Missing";
                console.error("Firestore document missing for this UID.");
            }
        } catch (error) {
            userDisplay.innerText = "Database Error";
            console.error("Error fetching user data:", error);
        }
    } else {
        // If not logged in, redirect to login page
        window.location.href = 'index.html';
    }
});

// Donor: Submit Donation (Updated to handle Photo Uploads)
document.getElementById('donation-form').onsubmit = async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button');
    submitBtn.innerText = "Uploading...";
    submitBtn.disabled = true;

    const file = document.getElementById('food-photo').files[0];
    let photoURL = "https://via.placeholder.com/300?text=No+Image+Available"; // Default placeholder

    try {
        // Handle image upload if a file is selected
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
            image: photoURL, // Store the uploaded image URL
            donorId: auth.currentUser.uid,
            donorName: userDisplay.innerText.split(' •')[0],
            status: 'available',
            createdAt: serverTimestamp()
        };

        await addDoc(collection(db, "donations"), foodData);
        e.target.reset(); // Clear form on success
        alert("Donation posted successfully!");
    } catch (error) { 
        alert("Error posting donation: " + error.message); 
    } finally {
        submitBtn.innerText = "List Food Item";
        submitBtn.disabled = false;
    }
};

// NGO: Load Available Food Feed (Updated to display images)
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
                    <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
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

// Donor: View History (Updated with Delete Button)
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
                    <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
                    <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
                    <h4 class="card-title">${item.foodType}</h4>
                    <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                    <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                    ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
                    
                    ${isAvailable ? `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; width: 100%; background-color: #ef4444; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Delete Listing</button>` : ''}
                </div>`;
        });
    });
}

// Donor: Delete Own Listing Logic
window.deleteDonorItem = async (id) => {
    if(confirm("Are you sure you want to delete this listing? It will be removed permanently.")) {
        try {
            await deleteDoc(doc(db, "donations", id));
        } catch (error) {
            alert("Error deleting item: " + error.message);
        }
    }
};

// 2. Forceful Logout Logic 
document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html'; // Force the redirect immediately
    } catch (error) {
        console.error("Logout error:", error);
        alert("Failed to log out. Check the console.");
    }
});
