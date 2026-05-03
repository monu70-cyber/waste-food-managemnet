// // // import { auth, db } from './firebase.js';
// // // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // // import { 
// // //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// // // const donorSection = document.getElementById('donor-section');
// // // const ngoSection = document.getElementById('ngo-section');
// // // const userDisplay = document.getElementById('user-display');

// // // // Check User Auth State
// // // onAuthStateChanged(auth, async (user) => {
// // //     if (user) {
// // //         const userDoc = await getDoc(doc(db, "users", user.uid));
// // //         const userData = userDoc.data();
        
// // //         // Format the badge: "Organization Name • Role"
// // //         userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// // //         if (userData.role === 'donor') {
// // //             donorSection.classList.remove('hidden');
// // //             loadDonorHistory(user.uid);
// // //         } else {
// // //             ngoSection.classList.remove('hidden');
// // //             loadAvailableFood();
// // //         }
// // //     } else {
// // //         window.location.href = 'index.html';
// // //     }
// // // });

// // // // Donor: Submit Donation
// // // document.getElementById('donation-form').onsubmit = async (e) => {
// // //     e.preventDefault();
// // //     const foodData = {
// // //         foodType: document.getElementById('food-type').value,
// // //         quantity: document.getElementById('quantity').value,
// // //         shelfLife: document.getElementById('shelf-life').value,
// // //         address: document.getElementById('address').value,
// // //         donorId: auth.currentUser.uid,
// // //         donorName: userDisplay.innerText.split(' •')[0],
// // //         status: 'available',
// // //         createdAt: serverTimestamp()
// // //     };

// // //     try {
// // //         await addDoc(collection(db, "donations"), foodData);
// // //         e.target.reset(); // Clear form on success
// // //     } catch (error) { 
// // //         alert("Error posting donation: " + error.message); 
// // //     }
// // // };

// // // // NGO: Load Available Food Feed
// // // function loadAvailableFood() {
// // //     const q = query(collection(db, "donations"), where("status", "==", "available"));
// // //     onSnapshot(q, (snapshot) => {
// // //         const feed = document.getElementById('available-feed');
// // //         feed.innerHTML = '';
        
// // //         if(snapshot.empty) {
// // //             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
// // //             return;
// // //         }

// // //         snapshot.forEach((docSnap) => {
// // //             const item = docSnap.data();
// // //             feed.innerHTML += `
// // //                 <div class="data-card">
// // //                     <span class="status-badge badge-available">Available</span>
// // //                     <h4 class="card-title">${item.foodType}</h4>
// // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // //                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // //                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// // //                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
// // //                 </div>`;
// // //         });
// // //     });
// // // }

// // // // NGO: Claiming System
// // // window.claimFood = async (id) => {
// // //     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
// // //         const donationRef = doc(db, "donations", id);
// // //         await updateDoc(donationRef, {
// // //             status: 'claimed',
// // //             claimedBy: auth.currentUser.uid,
// // //             claimedByName: userDisplay.innerText.split(' •')[0]
// // //         });
// // //     }
// // // };

// // // // Donor: View History
// // // function loadDonorHistory(uid) {
// // //     const q = query(collection(db, "donations"), where("donorId", "==", uid));
// // //     onSnapshot(q, (snapshot) => {
// // //         const history = document.getElementById('donor-history');
// // //         history.innerHTML = '';

// // //         if(snapshot.empty) {
// // //             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
// // //             return;
// // //         }

// // //         snapshot.forEach((docSnap) => {
// // //             const item = docSnap.data();
// // //             const isAvailable = item.status === 'available';
            
// // //             history.innerHTML += `
// // //                 <div class="data-card">
// // //                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
// // //                     <h4 class="card-title">${item.foodType}</h4>
// // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // //                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
// // //                 </div>`;
// // //         });
// // //     });
// // // }

// // // // Logout
// // // document.getElementById('logout-btn').onclick = () => signOut(auth);
// // // import { auth, db, storage } from './firebase.js'; // Added storage import
// // // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // // import { 
// // //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// // // // Added Storage specific imports
// // // import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// // // const donorSection = document.getElementById('donor-section');
// // // const ngoSection = document.getElementById('ngo-section');
// // // const userDisplay = document.getElementById('user-display');

// // // // Check User Auth State
// // // onAuthStateChanged(auth, async (user) => {
// // //     if (user) {
// // //         const userDoc = await getDoc(doc(db, "users", user.uid));
// // //         const userData = userDoc.data();
        
// // //         // Format the badge: "Organization Name • Role"
// // //         userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// // //         if (userData.role === 'donor') {
// // //             donorSection.classList.remove('hidden');
// // //             loadDonorHistory(user.uid);
// // //         } else {
// // //             ngoSection.classList.remove('hidden');
// // //             loadAvailableFood();
// // //         }
// // //     } else {
// // //         window.location.href = 'index.html';
// // //     }
// // // });

// // // // Donor: Submit Donation (Updated to handle Photo Uploads)
// // // document.getElementById('donation-form').onsubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     const submitBtn = e.target.querySelector('button');
// // //     submitBtn.innerText = "Uploading...";
// // //     submitBtn.disabled = true;

// // //     const file = document.getElementById('food-photo').files[0];
// // //     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available"; // Default placeholder

// // //     try {
// // //         // Handle image upload if a file is selected
// // //         if (file) {
// // //             const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
// // //             const snapshot = await uploadBytes(storageRef, file);
// // //             photoURL = await getDownloadURL(snapshot.ref);
// // //         }

// // //         const foodData = {
// // //             foodType: document.getElementById('food-type').value,
// // //             quantity: document.getElementById('quantity').value,
// // //             shelfLife: document.getElementById('shelf-life').value,
// // //             address: document.getElementById('address').value,
// // //             image: photoURL, // Store the uploaded image URL
// // //             donorId: auth.currentUser.uid,
// // //             donorName: userDisplay.innerText.split(' •')[0],
// // //             status: 'available',
// // //             createdAt: serverTimestamp()
// // //         };

// // //         await addDoc(collection(db, "donations"), foodData);
// // //         e.target.reset(); // Clear form on success
// // //         alert("Donation posted successfully!");
// // //     } catch (error) { 
// // //         alert("Error posting donation: " + error.message); 
// // //     } finally {
// // //         submitBtn.innerText = "List Food Item";
// // //         submitBtn.disabled = false;
// // //     }
// // // };

// // // // NGO: Load Available Food Feed (Updated to display images)
// // // function loadAvailableFood() {
// // //     const q = query(collection(db, "donations"), where("status", "==", "available"));
// // //     onSnapshot(q, (snapshot) => {
// // //         const feed = document.getElementById('available-feed');
// // //         feed.innerHTML = '';
        
// // //         if(snapshot.empty) {
// // //             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
// // //             return;
// // //         }

// // //         snapshot.forEach((docSnap) => {
// // //             const item = docSnap.data();
// // //             feed.innerHTML += `
// // //                 <div class="data-card">
// // //                     <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// // //                     <span class="status-badge badge-available">Available</span>
// // //                     <h4 class="card-title">${item.foodType}</h4>
// // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // //                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // //                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// // //                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
// // //                 </div>`;
// // //         });
// // //     });
// // // }

// // // // NGO: Claiming System
// // // window.claimFood = async (id) => {
// // //     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
// // //         const donationRef = doc(db, "donations", id);
// // //         await updateDoc(donationRef, {
// // //             status: 'claimed',
// // //             claimedBy: auth.currentUser.uid,
// // //             claimedByName: userDisplay.innerText.split(' •')[0]
// // //         });
// // //     }
// // // };

// // // // Donor: View History (Updated to display images)
// // // function loadDonorHistory(uid) {
// // //     const q = query(collection(db, "donations"), where("donorId", "==", uid));
// // //     onSnapshot(q, (snapshot) => {
// // //         const history = document.getElementById('donor-history');
// // //         history.innerHTML = '';

// // //         if(snapshot.empty) {
// // //             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
// // //             return;
// // //         }

// // //         snapshot.forEach((docSnap) => {
// // //             const item = docSnap.data();
// // //             const isAvailable = item.status === 'available';
            
// // //             history.innerHTML += `
// // //                 <div class="data-card">
// // //                     <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// // //                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
// // //                     <h4 class="card-title">${item.foodType}</h4>
// // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // //                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
// // //                 </div>`;
// // //         });
// // //     });
// // // }

// // // // Logout
// // // document.getElementById('logout-btn').onclick = () => signOut(auth);
// // import { auth, db, storage } from './firebase.js'; 
// // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // import { 
// //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// // import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// // const donorSection = document.getElementById('donor-section');
// // const ngoSection = document.getElementById('ngo-section');
// // const userDisplay = document.getElementById('user-display');

// // // 1. Crash-Proof User Auth State
// // onAuthStateChanged(auth, async (user) => {
// //     if (user) {
// //         try {
// //             const userDoc = await getDoc(doc(db, "users", user.uid));
            
// //             // Check if the user document actually exists in the database
// //             if (userDoc.exists()) {
// //                 const userData = userDoc.data();
                
// //                 // Format the badge: "Organization Name • Role"
// //                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// //                 if (userData.role === 'donor') {
// //                     donorSection.classList.remove('hidden');
// //                     loadDonorHistory(user.uid);
// //                 } else {
// //                     ngoSection.classList.remove('hidden');
// //                     loadAvailableFood();
// //                 }
// //             } else {
// //                 // If data is missing, show an error instead of crashing
// //                 userDisplay.innerText = "Account Data Missing";
// //                 console.error("Firestore document missing for this UID.");
// //             }
// //         } catch (error) {
// //             userDisplay.innerText = "Database Error";
// //             console.error("Error fetching user data:", error);
// //         }
// //     } else {
// //         // If not logged in, redirect to login page
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

// // // 2. Forceful Logout Logic 
// // document.getElementById('logout-btn').addEventListener('click', async () => {
// //     try {
// //         await signOut(auth);
// //         window.location.href = 'index.html'; // Force the redirect immediately
// //     } catch (error) {
// //         console.error("Logout error:", error);
// //         alert("Failed to log out. Check the console.");
// //     }
// // });
// import { auth, db, storage } from './firebase.js'; 
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy, deleteDoc 
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

// // Donor: View History (Updated with Delete Button)
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
                    
//                     ${isAvailable ? `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; width: 100%; background-color: #ef4444; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Delete Listing</button>` : ''}
//                 </div>`;
//         });
//     });
// }

// // Donor: Delete Own Listing Logic
// window.deleteDonorItem = async (id) => {
//     if(confirm("Are you sure you want to delete this listing? It will be removed permanently.")) {
//         try {
//             await deleteDoc(doc(db, "donations", id));
//         } catch (error) {
//             alert("Error deleting item: " + error.message);
//         }
//     }
// };

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
    collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
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
                userDisplay.innerText = "Account Data Missing";
                console.error("Firestore document missing for this UID.");
            }
        } catch (error) {
            userDisplay.innerText = "Database Error";
            console.error("Error fetching user data:", error);
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
        alert("Donation posted successfully!");
    } catch (error) { 
        alert("Error posting donation: " + error.message); 
    } finally {
        submitBtn.innerText = "List Food Item";
        submitBtn.disabled = false;
    }
};

// NGO: Load Available Food Feed
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
// NEW: Global array to hold the real-time data
let allAvailableDonations = [];

// NGO: Fetch Data and Listen for Real-Time Changes
function loadAvailableFood() {
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    onSnapshot(q, (snapshot) => {
        allAvailableDonations = []; // Clear the array
        
        snapshot.forEach((docSnap) => {
            // Push the document ID and the data together into the array
            allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() });
        });
        
        applyFiltersAndRender(); // Draw the UI
    });
}

// NEW: Filter Logic
function applyFiltersAndRender() {
    const searchTerm = document.getElementById('search-food').value.toLowerCase();
    const locationFilter = document.getElementById('filter-location').value.toLowerCase();

    // Filter the array based on what the user typed/selected
    const filteredData = allAvailableDonations.filter(item => {
        const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
        const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
        
        return matchesSearch && matchesLocation;
    });

    renderFeed(filteredData);
   // NEW: Update the map every time the feed updates!
    updateMapMarkers(filteredData);     
}

// NEW: Draw the UI based on filtered data
function renderFeed(donations) {
    const feed = document.getElementById('available-feed');
    feed.innerHTML = '';
    
    if(donations.length === 0) {
        feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
        return;
    }

    donations.forEach((item) => {
        feed.innerHTML += `
            <div class="data-card">
                <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
                <span class="status-badge badge-available">Available</span>
                <h4 class="card-title">${item.foodType}</h4>
                <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
                <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                <button onclick="claimFood('${item.id}')" style="margin-top: auto;">Claim for Pickup</button>
            </div>`;
    });
}

// NEW: Listeners to detect when the NGO types or changes the dropdown
document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);

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

// Logout Logic 
document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Logout error:", error);
        alert("Failed to log out. Check the console.");
    }
});
// --- Google Maps Integration ---
// let map;
// let mapMarkers = [];

// function updateMapMarkers(donations) {
//     // 1. Initialize map if it doesn't exist yet (Centered on Lucknow)
//     if (!map) {
//         map = new google.maps.Map(document.getElementById("map"), {
//             center: { lat: 26.8467, lng: 80.9462 }, 
//             zoom: 12,
//             mapTypeControl: false
//         });
//     }

//     const geocoder = new google.maps.Geocoder();

//     // 2. Clear old markers from the map
//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     // 3. Add new markers for the current filtered donations
//     donations.forEach(item => {
//         if(item.address) {
//             // Append "Lucknow" to help the geocoder find local areas accurately
//             const searchAddress = item.address + ", Lucknow, India"; 
            
//             geocoder.geocode({ address: searchAddress }, (results, status) => {
//                 if (status === "OK") {
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: results[0].geometry.location,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP
//                     });
                    // --- Updated Google Maps Integration ---
let map;
let mapMarkers = [];

function updateMapMarkers(donations) {
    // 1. Initialize map if it doesn't exist (Default center: Lucknow)
    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 26.8467, lng: 80.9462 }, 
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false
        });
    }

    const geocoder = new google.maps.Geocoder();

    // 2. Clear old markers
    mapMarkers.forEach(marker => marker.setMap(null));
    mapMarkers = [];

    // 3. Add new markers
    donations.forEach(item => {
        if (item.address) {
            // FIX: We clean the address and force "Lucknow, Uttar Pradesh" 
            // This helps Google find local spots like "Para" or "Alambagh" accurately.
            const cleanAddress = `${item.address}, Lucknow, Uttar Pradesh, India`;
            
            geocoder.geocode({ address: cleanAddress }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: item.foodType,
                        animation: google.maps.Animation.DROP,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    });

                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div style="color: #333; font-family: sans-serif;">
                                <strong>${item.foodType}</strong><br>
                                <small>${item.address}</small><br>
                                <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:5px 10px; border-radius:4px; margin-top:5px; cursor:pointer;">Claim</button>
                            </div>`
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });

                    mapMarkers.push(marker);

                    // If there is only one result (from a search), zoom into it
                    if (donations.length === 1) {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(15);
                    }
                } else {
                    console.error(`Geocode failed for "${cleanAddress}": ${status}`);
                }
            });
        }
    });

    // 4. If showing multiple items, reset map view to show all pins
    if (donations.length > 1) {
        const bounds = new google.maps.LatLngBounds();
        // Since geocoding is async, we'd normally wait, 
        // but for now, we reset to Lucknow center if markers are spread out.
        map.setZoom(12);
        map.setCenter({ lat: 26.8467, lng: 80.9462 });
    }
}
                    // Add a click popup (InfoWindow) to the map pin
                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div style="color: #333; padding: 5px;">
                                <strong style="font-size: 14px;">${item.foodType}</strong><br>
                                Qty: ${item.quantity}<br>
                                Donor: ${item.donorName}<br>
                                <button onclick="claimFood('${item.id}')" style="margin-top: 8px; background: #2ecc71; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Claim Food</button>
                            </div>
                        `
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });

                    mapMarkers.push(marker);
                } else {
                    console.warn("Could not find location for: " + item.address);
                }
            });
        }
    });
}

