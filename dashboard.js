// // // // import { auth, db } from './firebase.js';
// // // // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // // // import { 
// // // //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // // // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// // // // const donorSection = document.getElementById('donor-section');
// // // // const ngoSection = document.getElementById('ngo-section');
// // // // const userDisplay = document.getElementById('user-display');

// // // // // Check User Auth State
// // // // onAuthStateChanged(auth, async (user) => {
// // // //     if (user) {
// // // //         const userDoc = await getDoc(doc(db, "users", user.uid));
// // // //         const userData = userDoc.data();
        
// // // //         // Format the badge: "Organization Name • Role"
// // // //         userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// // // //         if (userData.role === 'donor') {
// // // //             donorSection.classList.remove('hidden');
// // // //             loadDonorHistory(user.uid);
// // // //         } else {
// // // //             ngoSection.classList.remove('hidden');
// // // //             loadAvailableFood();
// // // //         }
// // // //     } else {
// // // //         window.location.href = 'index.html';
// // // //     }
// // // // });

// // // // // Donor: Submit Donation
// // // // document.getElementById('donation-form').onsubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     const foodData = {
// // // //         foodType: document.getElementById('food-type').value,
// // // //         quantity: document.getElementById('quantity').value,
// // // //         shelfLife: document.getElementById('shelf-life').value,
// // // //         address: document.getElementById('address').value,
// // // //         donorId: auth.currentUser.uid,
// // // //         donorName: userDisplay.innerText.split(' •')[0],
// // // //         status: 'available',
// // // //         createdAt: serverTimestamp()
// // // //     };

// // // //     try {
// // // //         await addDoc(collection(db, "donations"), foodData);
// // // //         e.target.reset(); // Clear form on success
// // // //     } catch (error) { 
// // // //         alert("Error posting donation: " + error.message); 
// // // //     }
// // // // };

// // // // // NGO: Load Available Food Feed
// // // // function loadAvailableFood() {
// // // //     const q = query(collection(db, "donations"), where("status", "==", "available"));
// // // //     onSnapshot(q, (snapshot) => {
// // // //         const feed = document.getElementById('available-feed');
// // // //         feed.innerHTML = '';
        
// // // //         if(snapshot.empty) {
// // // //             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
// // // //             return;
// // // //         }

// // // //         snapshot.forEach((docSnap) => {
// // // //             const item = docSnap.data();
// // // //             feed.innerHTML += `
// // // //                 <div class="data-card">
// // // //                     <span class="status-badge badge-available">Available</span>
// // // //                     <h4 class="card-title">${item.foodType}</h4>
// // // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // // //                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// // // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // // //                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// // // //                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
// // // //                 </div>`;
// // // //         });
// // // //     });
// // // // }

// // // // // NGO: Claiming System
// // // // window.claimFood = async (id) => {
// // // //     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
// // // //         const donationRef = doc(db, "donations", id);
// // // //         await updateDoc(donationRef, {
// // // //             status: 'claimed',
// // // //             claimedBy: auth.currentUser.uid,
// // // //             claimedByName: userDisplay.innerText.split(' •')[0]
// // // //         });
// // // //     }
// // // // };

// // // // // Donor: View History
// // // // function loadDonorHistory(uid) {
// // // //     const q = query(collection(db, "donations"), where("donorId", "==", uid));
// // // //     onSnapshot(q, (snapshot) => {
// // // //         const history = document.getElementById('donor-history');
// // // //         history.innerHTML = '';

// // // //         if(snapshot.empty) {
// // // //             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
// // // //             return;
// // // //         }

// // // //         snapshot.forEach((docSnap) => {
// // // //             const item = docSnap.data();
// // // //             const isAvailable = item.status === 'available';
            
// // // //             history.innerHTML += `
// // // //                 <div class="data-card">
// // // //                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
// // // //                     <h4 class="card-title">${item.foodType}</h4>
// // // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // // //                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
// // // //                 </div>`;
// // // //         });
// // // //     });
// // // // }

// // // // // Logout
// // // // document.getElementById('logout-btn').onclick = () => signOut(auth);
// // // // import { auth, db, storage } from './firebase.js'; // Added storage import
// // // // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // // // import { 
// // // //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // // // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// // // // // Added Storage specific imports
// // // // import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// // // // const donorSection = document.getElementById('donor-section');
// // // // const ngoSection = document.getElementById('ngo-section');
// // // // const userDisplay = document.getElementById('user-display');

// // // // // Check User Auth State
// // // // onAuthStateChanged(auth, async (user) => {
// // // //     if (user) {
// // // //         const userDoc = await getDoc(doc(db, "users", user.uid));
// // // //         const userData = userDoc.data();
        
// // // //         // Format the badge: "Organization Name • Role"
// // // //         userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// // // //         if (userData.role === 'donor') {
// // // //             donorSection.classList.remove('hidden');
// // // //             loadDonorHistory(user.uid);
// // // //         } else {
// // // //             ngoSection.classList.remove('hidden');
// // // //             loadAvailableFood();
// // // //         }
// // // //     } else {
// // // //         window.location.href = 'index.html';
// // // //     }
// // // // });

// // // // // Donor: Submit Donation (Updated to handle Photo Uploads)
// // // // document.getElementById('donation-form').onsubmit = async (e) => {
// // // //     e.preventDefault();
    
// // // //     const submitBtn = e.target.querySelector('button');
// // // //     submitBtn.innerText = "Uploading...";
// // // //     submitBtn.disabled = true;

// // // //     const file = document.getElementById('food-photo').files[0];
// // // //     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available"; // Default placeholder

// // // //     try {
// // // //         // Handle image upload if a file is selected
// // // //         if (file) {
// // // //             const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
// // // //             const snapshot = await uploadBytes(storageRef, file);
// // // //             photoURL = await getDownloadURL(snapshot.ref);
// // // //         }

// // // //         const foodData = {
// // // //             foodType: document.getElementById('food-type').value,
// // // //             quantity: document.getElementById('quantity').value,
// // // //             shelfLife: document.getElementById('shelf-life').value,
// // // //             address: document.getElementById('address').value,
// // // //             image: photoURL, // Store the uploaded image URL
// // // //             donorId: auth.currentUser.uid,
// // // //             donorName: userDisplay.innerText.split(' •')[0],
// // // //             status: 'available',
// // // //             createdAt: serverTimestamp()
// // // //         };

// // // //         await addDoc(collection(db, "donations"), foodData);
// // // //         e.target.reset(); // Clear form on success
// // // //         alert("Donation posted successfully!");
// // // //     } catch (error) { 
// // // //         alert("Error posting donation: " + error.message); 
// // // //     } finally {
// // // //         submitBtn.innerText = "List Food Item";
// // // //         submitBtn.disabled = false;
// // // //     }
// // // // };

// // // // // NGO: Load Available Food Feed (Updated to display images)
// // // // function loadAvailableFood() {
// // // //     const q = query(collection(db, "donations"), where("status", "==", "available"));
// // // //     onSnapshot(q, (snapshot) => {
// // // //         const feed = document.getElementById('available-feed');
// // // //         feed.innerHTML = '';
        
// // // //         if(snapshot.empty) {
// // // //             feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations available at the moment. Please check back later.</p>`;
// // // //             return;
// // // //         }

// // // //         snapshot.forEach((docSnap) => {
// // // //             const item = docSnap.data();
// // // //             feed.innerHTML += `
// // // //                 <div class="data-card">
// // // //                     <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// // // //                     <span class="status-badge badge-available">Available</span>
// // // //                     <h4 class="card-title">${item.foodType}</h4>
// // // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // // //                     <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// // // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // // //                     <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// // // //                     <button onclick="claimFood('${docSnap.id}')" style="margin-top: auto;">Claim for Pickup</button>
// // // //                 </div>`;
// // // //         });
// // // //     });
// // // // }

// // // // // NGO: Claiming System
// // // // window.claimFood = async (id) => {
// // // //     if(confirm("Are you sure you want to claim this food? You must coordinate pickup immediately.")) {
// // // //         const donationRef = doc(db, "donations", id);
// // // //         await updateDoc(donationRef, {
// // // //             status: 'claimed',
// // // //             claimedBy: auth.currentUser.uid,
// // // //             claimedByName: userDisplay.innerText.split(' •')[0]
// // // //         });
// // // //     }
// // // // };

// // // // // Donor: View History (Updated to display images)
// // // // function loadDonorHistory(uid) {
// // // //     const q = query(collection(db, "donations"), where("donorId", "==", uid));
// // // //     onSnapshot(q, (snapshot) => {
// // // //         const history = document.getElementById('donor-history');
// // // //         history.innerHTML = '';

// // // //         if(snapshot.empty) {
// // // //             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
// // // //             return;
// // // //         }

// // // //         snapshot.forEach((docSnap) => {
// // // //             const item = docSnap.data();
// // // //             const isAvailable = item.status === 'available';
            
// // // //             history.innerHTML += `
// // // //                 <div class="data-card">
// // // //                     <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// // // //                     <span class="status-badge ${isAvailable ? 'badge-available' : 'badge-claimed'}">${item.status}</span>
// // // //                     <h4 class="card-title">${item.foodType}</h4>
// // // //                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// // // //                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// // // //                     ${!isAvailable ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Claimed By:</strong> <span>${item.claimedByName}</span></div>` : ''}
// // // //                 </div>`;
// // // //         });
// // // //     });
// // // // }

// // // // // Logout
// // // // document.getElementById('logout-btn').onclick = () => signOut(auth);
// // // import { auth, db, storage } from './firebase.js'; 
// // // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // // import { 
// // //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy 
// // // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// // // import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// // // const donorSection = document.getElementById('donor-section');
// // // const ngoSection = document.getElementById('ngo-section');
// // // const userDisplay = document.getElementById('user-display');

// // // // 1. Crash-Proof User Auth State
// // // onAuthStateChanged(auth, async (user) => {
// // //     if (user) {
// // //         try {
// // //             const userDoc = await getDoc(doc(db, "users", user.uid));
            
// // //             // Check if the user document actually exists in the database
// // //             if (userDoc.exists()) {
// // //                 const userData = userDoc.data();
                
// // //                 // Format the badge: "Organization Name • Role"
// // //                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

// // //                 if (userData.role === 'donor') {
// // //                     donorSection.classList.remove('hidden');
// // //                     loadDonorHistory(user.uid);
// // //                 } else {
// // //                     ngoSection.classList.remove('hidden');
// // //                     loadAvailableFood();
// // //                 }
// // //             } else {
// // //                 // If data is missing, show an error instead of crashing
// // //                 userDisplay.innerText = "Account Data Missing";
// // //                 console.error("Firestore document missing for this UID.");
// // //             }
// // //         } catch (error) {
// // //             userDisplay.innerText = "Database Error";
// // //             console.error("Error fetching user data:", error);
// // //         }
// // //     } else {
// // //         // If not logged in, redirect to login page
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

// // // // 2. Forceful Logout Logic 
// // // document.getElementById('logout-btn').addEventListener('click', async () => {
// // //     try {
// // //         await signOut(auth);
// // //         window.location.href = 'index.html'; // Force the redirect immediately
// // //     } catch (error) {
// // //         console.error("Logout error:", error);
// // //         alert("Failed to log out. Check the console.");
// // //     }
// // // });
// // import { auth, db, storage } from './firebase.js'; 
// // import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // import { 
// //     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, orderBy, deleteDoc 
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

// // // Donor: View History (Updated with Delete Button)
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
                    
// //                     ${isAvailable ? `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; width: 100%; background-color: #ef4444; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Delete Listing</button>` : ''}
// //                 </div>`;
// //         });
// //     });
// // }

// // // Donor: Delete Own Listing Logic
// // window.deleteDonorItem = async (id) => {
// //     if(confirm("Are you sure you want to delete this listing? It will be removed permanently.")) {
// //         try {
// //             await deleteDoc(doc(db, "donations", id));
// //         } catch (error) {
// //             alert("Error deleting item: " + error.message);
// //         }
// //     }
// // };

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
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
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
//                 userDisplay.innerText = "Account Data Missing";
//                 console.error("Firestore document missing for this UID.");
//             }
//         } catch (error) {
//             userDisplay.innerText = "Database Error";
//             console.error("Error fetching user data:", error);
//         }
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// // Donor: Submit Donation
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
    
//     const submitBtn = e.target.querySelector('button');
//     submitBtn.innerText = "Uploading...";
//     submitBtn.disabled = true;

//     const file = document.getElementById('food-photo').files[0];
//     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available";

//     try {
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
//             image: photoURL,
//             donorId: auth.currentUser.uid,
//             donorName: userDisplay.innerText.split(' •')[0],
//             status: 'available',
//             createdAt: serverTimestamp()
//         };

//         await addDoc(collection(db, "donations"), foodData);
//         e.target.reset(); 
//         alert("Donation posted successfully!");
//     } catch (error) { 
//         alert("Error posting donation: " + error.message); 
//     } finally {
//         submitBtn.innerText = "List Food Item";
//         submitBtn.disabled = false;
//     }
// };

// // NGO: Load Available Food Feed
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
// // NEW: Global array to hold the real-time data
// let allAvailableDonations = [];

// // NGO: Fetch Data and Listen for Real-Time Changes
// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         allAvailableDonations = []; // Clear the array
        
//         snapshot.forEach((docSnap) => {
//             // Push the document ID and the data together into the array
//             allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() });
//         });
        
//         applyFiltersAndRender(); // Draw the UI
//     });
// }

// // NEW: Filter Logic
// function applyFiltersAndRender() {
//     const searchTerm = document.getElementById('search-food').value.toLowerCase();
//     const locationFilter = document.getElementById('filter-location').value.toLowerCase();

//     // Filter the array based on what the user typed/selected
//     const filteredData = allAvailableDonations.filter(item => {
//         const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
//         const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
        
//         return matchesSearch && matchesLocation;
//     });

//     renderFeed(filteredData);
//    // NEW: Update the map every time the feed updates!
//     updateMapMarkers(filteredData);     
// }

// // NEW: Draw the UI based on filtered data
// function renderFeed(donations) {
//     const feed = document.getElementById('available-feed');
//     feed.innerHTML = '';
    
//     if(donations.length === 0) {
//         feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
//         return;
//     }

//     donations.forEach((item) => {
//         feed.innerHTML += `
//             <div class="data-card">
//                 <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
//                 <span class="status-badge badge-available">Available</span>
//                 <h4 class="card-title">${item.foodType}</h4>
//                 <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                 <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
//                 <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                 <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
//                 <button onclick="claimFood('${item.id}')" style="margin-top: auto;">Claim for Pickup</button>
//             </div>`;
//     });
// }

// // NEW: Listeners to detect when the NGO types or changes the dropdown
// document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
// document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);

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

// // Donor: View History
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

// // Logout Logic 
// document.getElementById('logout-btn').addEventListener('click', async () => {
//     try {
//         await signOut(auth);
//         window.location.href = 'index.html';
//     } catch (error) {
//         console.error("Logout error:", error);
//         alert("Failed to log out. Check the console.");
//     }
// });
// // --- Google Maps Integration ---
// // let map;
// // let mapMarkers = [];

// // function updateMapMarkers(donations) {
// //     // 1. Initialize map if it doesn't exist yet (Centered on Lucknow)
// //     if (!map) {
// //         map = new google.maps.Map(document.getElementById("map"), {
// //             center: { lat: 26.8467, lng: 80.9462 }, 
// //             zoom: 12,
// //             mapTypeControl: false
// //         });
// //     }

// //     const geocoder = new google.maps.Geocoder();

// //     // 2. Clear old markers from the map
// //     mapMarkers.forEach(marker => marker.setMap(null));
// //     mapMarkers = [];

// //     // 3. Add new markers for the current filtered donations
// //     donations.forEach(item => {
// //         if(item.address) {
// //             // Append "Lucknow" to help the geocoder find local areas accurately
// //             const searchAddress = item.address + ", Lucknow, India"; 
            
// //             geocoder.geocode({ address: searchAddress }, (results, status) => {
// //                 if (status === "OK") {
// //                     const marker = new google.maps.Marker({
// //                         map: map,
// //                         position: results[0].geometry.location,
// //                         title: item.foodType,
// //                         animation: google.maps.Animation.DROP
// //                     });
//                     // --- Updated Google Maps Integration ---
// let map;
// let mapMarkers = [];

// function updateMapMarkers(donations) {
//     // 1. Initialize map if it doesn't exist (Default center: Lucknow)
//     if (!map) {
//         map = new google.maps.Map(document.getElementById("map"), {
//             center: { lat: 26.8467, lng: 80.9462 }, 
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false
//         });
//     }

//     const geocoder = new google.maps.Geocoder();

//     // 2. Clear old markers
//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     // 3. Add new markers
//     donations.forEach(item => {
//         if (item.address) {
//             // FIX: We clean the address and force "Lucknow, Uttar Pradesh" 
//             // This helps Google find local spots like "Para" or "Alambagh" accurately.
//             const cleanAddress = `${item.address}, Lucknow, Uttar Pradesh, India`;
            
//             geocoder.geocode({ address: cleanAddress }, (results, status) => {
//                 if (status === "OK" && results[0]) {
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: results[0].geometry.location,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP,
//                         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                     });

//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; font-family: sans-serif;">
//                                 <strong>${item.foodType}</strong><br>
//                                 <small>${item.address}</small><br>
//                                 <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:5px 10px; border-radius:4px; margin-top:5px; cursor:pointer;">Claim</button>
//                             </div>`
//                     });

//                     marker.addListener('click', () => {
//                         infoWindow.open(map, marker);
//                     });

//                     mapMarkers.push(marker);

//                     // If there is only one result (from a search), zoom into it
//                     if (donations.length === 1) {
//                         map.setCenter(results[0].geometry.location);
//                         map.setZoom(15);
//                     }
//                 } else {
//                     console.error(`Geocode failed for "${cleanAddress}": ${status}`);
//                 }
//             });
//         }
//     });

//     // 4. If showing multiple items, reset map view to show all pins
//     if (donations.length > 1) {
//         const bounds = new google.maps.LatLngBounds();
//         // Since geocoding is async, we'd normally wait, 
//         // but for now, we reset to Lucknow center if markers are spread out.
//         map.setZoom(12);
//         map.setCenter({ lat: 26.8467, lng: 80.9462 });
//     }
// }
//                     // Add a click popup (InfoWindow) to the map pin
//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; padding: 5px;">
//                                 <strong style="font-size: 14px;">${item.foodType}</strong><br>
//                                 Qty: ${item.quantity}<br>
//                                 Donor: ${item.donorName}<br>
//                                 <button onclick="claimFood('${item.id}')" style="margin-top: 8px; background: #2ecc71; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Claim Food</button>
//                             </div>
//                         `
//                     });

//                     marker.addListener('click', () => {
//                         infoWindow.open(map, marker);
//                     });

//                     mapMarkers.push(marker);
//                 } else {
//                     console.warn("Could not find location for: " + item.address);
//                 }
//             });
//         }
//     });
// }
// import { auth, db, storage } from './firebase.js'; 
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
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
//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

//                 if (userData.role === 'donor') {
//                     donorSection.classList.remove('hidden');
//                     loadDonorHistory(user.uid);
//                 } else {
//                     ngoSection.classList.remove('hidden');
//                     loadAvailableFood();
//                 }
//             } else {
//                 userDisplay.innerText = "Account Data Missing";
//             }
//         } catch (error) {
//             userDisplay.innerText = "Database Error";
//             console.error("Auth error:", error);
//         }
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// // Donor: Submit Donation
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
//     const submitBtn = e.target.querySelector('button');
//     submitBtn.innerText = "Uploading...";
//     submitBtn.disabled = true;

//     const file = document.getElementById('food-photo').files[0];
//     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available";

//     try {
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
//             image: photoURL,
//             donorId: auth.currentUser.uid,
//             donorName: userDisplay.innerText.split(' •')[0],
//             status: 'available',
//             createdAt: serverTimestamp()
//         };

//         await addDoc(collection(db, "donations"), foodData);
//         e.target.reset(); 
//         alert("Donation posted successfully!");
//     } catch (error) { 
//         alert("Error: " + error.message); 
//     } finally {
//         submitBtn.innerText = "List Food Item";
//         submitBtn.disabled = false;
//     }
// };

// // NGO Logic: Filters and Real-time Feed
// let allAvailableDonations = [];

// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         allAvailableDonations = [];
//         snapshot.forEach((docSnap) => {
//             allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         applyFiltersAndRender();
//     });
// }

// // function applyFiltersAndRender() {
// //     const searchTerm = document.getElementById('search-food').value.toLowerCase();
// //     const locationFilter = document.getElementById('filter-location').value.toLowerCase();

// //     const filteredData = allAvailableDonations.filter(item => {
// //         const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
// //         const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
// //         return matchesSearch && matchesLocation;
// //     });

// //     renderFeed(filteredData);
// //     updateMapMarkers(filteredData);     
// // }
// // 1. The Filter Function (Triggers the map update)
// function applyFiltersAndRender() {
//     const searchTerm = document.getElementById('search-food').value.toLowerCase();
//     const locationFilter = document.getElementById('filter-location').value.toLowerCase();

//     // Filter the data based on what the NGO typed
//     const filteredData = allAvailableDonations.filter(item => {
//         const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
//         const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
        
//         return matchesSearch && matchesLocation;
//     });

//     // Update the text list
//     renderFeed(filteredData);
    
//     // Update the Map with ONLY the filtered data
//     updateMapMarkers(filteredData);     
// }
// // 2. The Smart Map Function (Handles zooming and pins)
// function updateMapMarkers(donations) {
//     if (!map) return; // Safety check

//     const geocoder = new google.maps.Geocoder();
//     const bounds = new google.maps.LatLngBounds(); // Used to calculate map zoom
//     let markersProcessed = 0;

//     // Clear old markers off the map before dropping new ones
//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     // If search returns nothing, reset map to default city view
//     if (donations.length === 0) {
//         map.setCenter({ lat: 26.8467, lng: 80.9462 }); // Lucknow Center
//         map.setZoom(12);
//         return;
//     }

//     // Loop through the filtered donations and drop pins
//     donations.forEach(item => {
//         if (item.address) {
//             // Force location to Lucknow for better geocoding accuracy
//             const cleanAddress = `${item.address}, Lucknow, Uttar Pradesh, India`;
            
//             geocoder.geocode({ address: cleanAddress }, (results, status) => {
//                 markersProcessed++; // Keep track of how many we have processed

//                 if (status === "OK" && results[0]) {
//                     const markerLocation = results[0].geometry.location;
                    
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: markerLocation,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP,
//                         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                     });

//                     // Build the popup window for the pin
//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; font-family: sans-serif; padding: 5px;">
//                                 <strong style="font-size: 16px;">${item.foodType}</strong><br>
//                                 <span style="color: #666;">Quantity: ${item.quantity}</span><br>
//                                 <small>${item.address}</small><br>
//                                 <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:8px 12px; border-radius:4px; margin-top:10px; cursor:pointer; width: 100%; font-weight: bold;">Claim for Pickup</button>
//                             </div>`
//                     });

//                     marker.addListener('click', () => infoWindow.open(map, marker));
//                     mapMarkers.push(marker);
                    
//                     // Add this pin's location to our map boundaries
//                     bounds.extend(markerLocation);
//                 } else {
//                     console.warn(`Could not map address: ${cleanAddress}`);
//                 }

//                 // Once all pins have been checked, automatically adjust the camera
//                 if (markersProcessed === donations.length) {
//                     if (mapMarkers.length === 1) {
//                         // Only 1 result? Zoom in close!
//                         map.setCenter(mapMarkers[0].getPosition());
//                         map.setZoom(15);
//                     } else if (mapMarkers.length > 1) {
//                         // Multiple results? Zoom out to fit all of them on screen!
//                         map.fitBounds(bounds);
//                     }
//                 }
//             });
//         } else {
//             markersProcessed++; // Skip items with no address safely
//         }
//     });
// }
// // function renderFeed(donations) {
// //     const feed = document.getElementById('available-feed');
// //     feed.innerHTML = '';
// //     if(donations.length === 0) {
// //         feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
// //         return;
// //     }
// //     donations.forEach((item) => {
// //         feed.innerHTML += `
// //             <div class="data-card">
// //                 <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
// //                 <span class="status-badge badge-available">Available</span>
// //                 <h4 class="card-title">${item.foodType}</h4>
// //                 <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
// //                 <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
// //                 <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
// //                 <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
// //                 <button onclick="claimFood('${item.id}')" style="margin-top: auto;">Claim for Pickup</button>
// //             </div>`;
// //     });
// // }

// // document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
// // document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);

// // NGO: Claiming System
// window.claimFood = async (id) => {
//     if(confirm("Are you sure you want to claim this food?")) {
//         const donationRef = doc(db, "donations", id);
//         await updateDoc(donationRef, {
//             status: 'claimed',
//             claimedBy: auth.currentUser.uid,
//             claimedByName: userDisplay.innerText.split(' •')[0]
//         });
//     }
// };

// // Donor: History and Deletion
// function loadDonorHistory(uid) {
//     const q = query(collection(db, "donations"), where("donorId", "==", uid));
//     onSnapshot(q, (snapshot) => {
//         const history = document.getElementById('donor-history');
//         history.innerHTML = '';
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

// window.deleteDonorItem = async (id) => {
//     if(confirm("Delete this listing permanently?")) {
//         try { await deleteDoc(doc(db, "donations", id)); } 
//         catch (error) { alert("Error: " + error.message); }
//     }
// };

// // Logout Logic
// document.getElementById('logout-btn').addEventListener('click', async () => {
//     try {
//         await signOut(auth);
//         window.location.href = 'index.html';
//     } catch (error) { console.error("Logout error:", error); }
// });

// // --- GOOGLE MAPS INTEGRATION ---
// let map;
// let mapMarkers = [];

// function updateMapMarkers(donations) {
//     if (!map) {
//         map = new google.maps.Map(document.getElementById("map"), {
//             center: { lat: 26.8467, lng: 80.9462 }, 
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false
//         });
//     }

//     const geocoder = new google.maps.Geocoder();
//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     donations.forEach(item => {
//         if (item.address) {
//             const cleanAddress = `${item.address}, Lucknow, Uttar Pradesh, India`;
//             geocoder.geocode({ address: cleanAddress }, (results, status) => {
//                 if (status === "OK" && results[0]) {
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: results[0].geometry.location,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP,
//                         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                     });

//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; font-family: sans-serif; padding: 5px;">
//                                 <strong>${item.foodType}</strong><br>
//                                 <span>Qty: ${item.quantity}</span><br>
//                                 <small>${item.address}</small><br>
//                                 <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:5px 10px; border-radius:4px; margin-top:8px; cursor:pointer;">Claim Now</button>
//                             </div>`
//                     });

//                     marker.addListener('click', () => infoWindow.open(map, marker));
//                     mapMarkers.push(marker);

//                     if (donations.length === 1) {
//                         map.setCenter(results[0].geometry.location);
//                         map.setZoom(15);
//                     }
//                 }
//             });
//         }
//     });

//     if (donations.length > 1) {
//         map.setZoom(12);
//         map.setCenter({ lat: 26.8467, lng: 80.9462 });
//     }
// }
// import { auth, db, storage } from './firebase.js'; 
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
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
//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

//                 if (userData.role === 'donor') {
//                     donorSection.classList.remove('hidden');
//                     loadDonorHistory(user.uid);
//                 } else {
//                     ngoSection.classList.remove('hidden');
//                     loadAvailableFood();
//                 }
//             } else {
//                 userDisplay.innerText = "Account Data Missing";
//             }
//         } catch (error) {
//             userDisplay.innerText = "Database Error";
//             console.error("Auth error:", error);
//         }
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// // Donor: Submit Donation
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
//     const submitBtn = e.target.querySelector('button');
//     submitBtn.innerText = "Uploading...";
//     submitBtn.disabled = true;

//     const file = document.getElementById('food-photo').files[0];
//     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available";

//     try {
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
//             image: photoURL,
//             donorId: auth.currentUser.uid,
//             donorName: userDisplay.innerText.split(' •')[0],
//             status: 'available',
//             createdAt: serverTimestamp()
//         };

//         await addDoc(collection(db, "donations"), foodData);
//         e.target.reset(); 
//         alert("Donation posted successfully!");
//     } catch (error) { 
//         alert("Error: " + error.message); 
//     } finally {
//         submitBtn.innerText = "List Food Item";
//         submitBtn.disabled = false;
//     }
// };

// // ==========================================
// // NGO: DATA, FILTERS, AND FEED RENDERING
// // ==========================================
// let allAvailableDonations = [];

// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         allAvailableDonations = [];
//         snapshot.forEach((docSnap) => {
//             allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         applyFiltersAndRender();
//     });
// }

// function applyFiltersAndRender() {
//     const searchTerm = document.getElementById('search-food').value.toLowerCase();
//     const locationFilter = document.getElementById('filter-location').value.toLowerCase();

//     // Filter the data based on what the NGO typed
//     const filteredData = allAvailableDonations.filter(item => {
//         const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
//         const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
        
//         return matchesSearch && matchesLocation;
//     });

//     // Draw the UI Cards
//     renderFeed(filteredData);
    
//     // Draw the Map Pins
//     updateMapMarkers(filteredData);     
// }

// // Draw the HTML UI Cards (This was accidentally commented out before!)
// function renderFeed(donations) {
//     const feed = document.getElementById('available-feed');
//     feed.innerHTML = '';
    
//     if(donations.length === 0) {
//         feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
//         return;
//     }
    
//     donations.forEach((item) => {
//         feed.innerHTML += `
//             <div class="data-card">
//                 <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
//                 <span class="status-badge badge-available">Available</span>
//                 <h4 class="card-title">${item.foodType}</h4>
//                 <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                 <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
//                 <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                 <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
//                 <button onclick="claimFood('${item.id}')" style="margin-top: auto; background-color: var(--primary); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Claim for Pickup</button>
//             </div>`;
//     });
// }

// // Search Listeners (These were also accidentally commented out!)
// document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
// document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);


// // ==========================================
// // NGO: CLAIMING & DONOR MANAGEMENT
// // ==========================================
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

// // Donor: View History
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

// window.deleteDonorItem = async (id) => {
//     if(confirm("Delete this listing permanently?")) {
//         try { await deleteDoc(doc(db, "donations", id)); } 
//         catch (error) { alert("Error: " + error.message); }
//     }
// };

// // Logout Logic
// document.getElementById('logout-btn').addEventListener('click', async () => {
//     try {
//         await signOut(auth);
//         window.location.href = 'index.html';
//     } catch (error) { console.error("Logout error:", error); }
// });

// // ==========================================
// // SMART GOOGLE MAPS INTEGRATION
// // ==========================================
// let map;
// let mapMarkers = [];

// function updateMapMarkers(donations) {
//     // FAIL-SAFE: If Google Maps hasn't loaded yet, try again in 500ms instead of crashing.
//     if (typeof google === 'undefined') {
//         setTimeout(() => updateMapMarkers(donations), 500);
//         return;
//     }

//     if (!map) {
//         map = new google.maps.Map(document.getElementById("map"), {
//             center: { lat: 26.8467, lng: 80.9462 }, 
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false
//         });
//     }

//     const geocoder = new google.maps.Geocoder();
//     const bounds = new google.maps.LatLngBounds(); 
//     let markersProcessed = 0;

//     // Clear old markers
//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     if (donations.length === 0) {
//         map.setCenter({ lat: 26.8467, lng: 80.9462 }); 
//         map.setZoom(12);
//         return;
//     }

//     donations.forEach(item => {
//         if (item.address) {
//             const cleanAddress = `${item.address}, Lucknow, Uttar Pradesh, India`;
            
//             geocoder.geocode({ address: cleanAddress }, (results, status) => {
//                 markersProcessed++;

//                 if (status === "OK" && results[0]) {
//                     const markerLocation = results[0].geometry.location;
                    
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: markerLocation,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP,
//                         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                     });

//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; font-family: sans-serif; padding: 5px;">
//                                 <strong style="font-size: 16px;">${item.foodType}</strong><br>
//                                 <span style="color: #666;">Quantity: ${item.quantity}</span><br>
//                                 <small>${item.address}</small><br>
//                                 <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:8px 12px; border-radius:4px; margin-top:10px; cursor:pointer; width: 100%; font-weight: bold;">Claim</button>
//                             </div>`
//                     });

//                     marker.addListener('click', () => infoWindow.open(map, marker));
//                     mapMarkers.push(marker);
//                     bounds.extend(markerLocation);
//                 }

//                 // Auto-zoom map to fit all pins
//                 if (markersProcessed === donations.length) {
//                     if (mapMarkers.length === 1) {
//                         map.setCenter(mapMarkers[0].getPosition());
//                         map.setZoom(15);
//                     } else if (mapMarkers.length > 1) {
//                         map.fitBounds(bounds);
//                     }
//                 }
//             });
//         } else {
//             markersProcessed++;
//         }
//     });
// }
// import { auth, db, storage } from './firebase.js'; 
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
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
//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

//                 if (userData.role === 'donor') {
//                     donorSection.classList.remove('hidden');
//                     loadDonorHistory(user.uid);
//                 } else {
//                     ngoSection.classList.remove('hidden');
//                     loadAvailableFood();
//                 }
//             } else {
//                 userDisplay.innerText = "Account Data Missing";
//             }
//         } catch (error) {
//             userDisplay.innerText = "Database Error";
//             console.error("Auth error:", error);
//         }
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// // Donor: Submit Donation
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
//     const submitBtn = e.target.querySelector('button');
//     submitBtn.innerText = "Uploading...";
//     submitBtn.disabled = true;

//     const file = document.getElementById('food-photo').files[0];
//     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available";

//     try {
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
//             image: photoURL,
//             donorId: auth.currentUser.uid,
//             donorName: userDisplay.innerText.split(' •')[0],
//             status: 'available',
//             createdAt: serverTimestamp()
//         };

//         await addDoc(collection(db, "donations"), foodData);
//         e.target.reset(); 
//         alert("Donation posted successfully!");
//     } catch (error) { 
//         alert("Error: " + error.message); 
//     } finally {
//         submitBtn.innerText = "List Food Item";
//         submitBtn.disabled = false;
//     }
// };

// // ==========================================
// // NGO: DATA, FILTERS, AND FEED RENDERING
// // ==========================================
// let allAvailableDonations = [];

// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         allAvailableDonations = [];
//         snapshot.forEach((docSnap) => {
//             allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         applyFiltersAndRender();
//     });
// }

// function applyFiltersAndRender() {
//     const searchTerm = document.getElementById('search-food').value.toLowerCase();
//     const locationFilter = document.getElementById('filter-location').value.toLowerCase();

//     // Filter the data based on what the NGO typed
//     const filteredData = allAvailableDonations.filter(item => {
//         const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
//         const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
        
//         return matchesSearch && matchesLocation;
//     });

//     // Draw the UI Cards
//     renderFeed(filteredData);
    
//     // Draw the Map Pins
//     updateMapMarkers(filteredData);     
// }

// // Draw the HTML UI Cards
// function renderFeed(donations) {
//     const feed = document.getElementById('available-feed');
//     feed.innerHTML = '';
    
//     if(donations.length === 0) {
//         feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
//         return;
//     }
    
//     donations.forEach((item) => {
//         feed.innerHTML += `
//             <div class="data-card">
//                 <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;" alt="Food Image">
//                 <span class="status-badge badge-available">Available</span>
//                 <h4 class="card-title">${item.foodType}</h4>
//                 <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                 <div class="card-detail"><strong>Expires:</strong> <span>${item.shelfLife}</span></div>
//                 <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                 <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
//                 <button onclick="claimFood('${item.id}')" style="margin-top: auto; background-color: var(--primary); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Claim for Pickup</button>
//             </div>`;
//     });
// }

// // Search Listeners
// document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
// document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);

// // ==========================================
// // NGO: CLAIMING & DONOR MANAGEMENT
// // ==========================================
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

// // Donor: View History
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

// window.deleteDonorItem = async (id) => {
//     if(confirm("Delete this listing permanently?")) {
//         try { await deleteDoc(doc(db, "donations", id)); } 
//         catch (error) { alert("Error: " + error.message); }
//     }
// };

// // Logout Logic
// document.getElementById('logout-btn').addEventListener('click', async () => {
//     try {
//         await signOut(auth);
//         window.location.href = 'index.html';
//     } catch (error) { console.error("Logout error:", error); }
// });

// // ==========================================
// // SMART GOOGLE MAPS INTEGRATION
// // ==========================================
// let map;
// let mapMarkers = [];

// function updateMapMarkers(donations) {
//     // FAIL-SAFE: Wait for Google Maps to load
//     if (typeof google === 'undefined') {
//         setTimeout(() => updateMapMarkers(donations), 500);
//         return;
//     }

//     if (!map) {
//         map = new google.maps.Map(document.getElementById("map"), {
//             center: { lat: 26.8467, lng: 80.9462 }, 
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false
//         });
//     }

//     const geocoder = new google.maps.Geocoder();
//     const bounds = new google.maps.LatLngBounds(); 
//     let markersProcessed = 0;

//     // Clear old markers off the map
//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     // If no donations match, zoom out to city view
//     if (donations.length === 0) {
//         map.setCenter({ lat: 26.8467, lng: 80.9462 }); 
//         map.setZoom(12);
//         return;
//     }

//     donations.forEach(item => {
//         if (item.address) {
//             // SMART ADDRESS FORMATTING: Prevent duplicate "Lucknow" strings
//             let cleanAddress = item.address;
//             if (!cleanAddress.toLowerCase().includes("lucknow")) {
//                 cleanAddress += ", Lucknow";
//             }
//             cleanAddress += ", Uttar Pradesh, India";
            
//             geocoder.geocode({ address: cleanAddress }, (results, status) => {
//                 markersProcessed++;

//                 if (status === "OK" && results[0]) {
//                     const markerLocation = results[0].geometry.location;
                    
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: markerLocation,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP,
//                         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                     });

//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; font-family: sans-serif; padding: 5px;">
//                                 <strong style="font-size: 16px;">${item.foodType}</strong><br>
//                                 <span style="color: #666;">Quantity: ${item.quantity}</span><br>
//                                 <small>${item.address}</small><br>
//                                 <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:8px 12px; border-radius:4px; margin-top:10px; cursor:pointer; width: 100%; font-weight: bold;">Claim</button>
//                             </div>`
//                     });

//                     marker.addListener('click', () => infoWindow.open(map, marker));
//                     mapMarkers.push(marker);
//                     bounds.extend(markerLocation);
//                 } else {
//                     console.warn(`Could not map address: ${cleanAddress}`);
//                 }

//                 // CAMERA ZOOM LOGIC
//                 if (markersProcessed === donations.length) {
//                     if (mapMarkers.length === 1) {
//                         // Exactly 1 result (e.g., searched for "rice"): Zoom in to street level!
//                         map.setCenter(mapMarkers[0].getPosition());
//                         map.setZoom(16); 
//                     } else if (mapMarkers.length > 1) {
//                         // Multiple results: Zoom out to fit all pins on screen
//                         map.fitBounds(bounds);
//                         // Prevent the map from zooming in too close if all pins are right next to each other
//                         if (map.getZoom() > 16) map.setZoom(16);
//                     }
//                 }
//             });
//         } else {
//             markersProcessed++; // Skip items without addresses safely
//         }
//     });
// }
// import { auth, db, storage } from './firebase.js'; 
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//     collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
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
//             if (userDoc.exists()) {
//                 const userData = userDoc.data();
//                 userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

//                 if (userData.role === 'donor') {
//                     donorSection.classList.remove('hidden');
//                     loadDonorHistory(user.uid);
//                 } else {
//                     ngoSection.classList.remove('hidden');
//                     loadAvailableFood();
//                     loadNGOClaims(user.uid); // Load active pickups for NGO
//                 }
//             }
//         } catch (error) {
//             console.error("Auth error:", error);
//         }
//     } else {
//         window.location.href = 'index.html';
//     }
// });

// // NEW: Instant Photo Preview Logic
// document.getElementById('food-photo').addEventListener('change', function(e) {
//     const file = e.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const preview = document.getElementById('photo-preview');
//             preview.src = e.target.result;
//             preview.style.display = 'block';
//         }
//         reader.readAsDataURL(file);
//     }
// });

// // Donor: Submit Donation
// document.getElementById('donation-form').onsubmit = async (e) => {
//     e.preventDefault();
//     const submitBtn = e.target.querySelector('button');
//     submitBtn.innerText = "Uploading...";
//     submitBtn.disabled = true;

//     const file = document.getElementById('food-photo').files[0];
//     let photoURL = "https://via.placeholder.com/300?text=No+Image+Available";

//     // NEW: Calculate Expiry Time based on hours
//     const hoursValid = parseInt(document.getElementById('shelf-life').value);
//     const expiryTimestamp = Date.now() + (hoursValid * 60 * 60 * 1000);

//     try {
//         if (file) {
//             const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
//             const snapshot = await uploadBytes(storageRef, file);
//             photoURL = await getDownloadURL(snapshot.ref);
//         }

//         const foodData = {
//             foodType: document.getElementById('food-type').value,
//             quantity: document.getElementById('quantity').value + ' ' + document.getElementById('quantity-unit').value,
//             shelfLifeHours: hoursValid,
//             expiryTime: expiryTimestamp, // Store timestamp for alerts
//             address: document.getElementById('address').value,
//             image: photoURL,
//             donorId: auth.currentUser.uid,
//             donorName: userDisplay.innerText.split(' •')[0],
//             status: 'available', // Tracker: 1. available, 2. picked_up, 3. completed
//             createdAt: serverTimestamp()
//         };

//         await addDoc(collection(db, "donations"), foodData);
//         e.target.reset(); 
//         document.getElementById('photo-preview').style.display = 'none'; // hide preview
//         alert("Donation posted successfully!");
//     } catch (error) { 
//         alert("Error: " + error.message); 
//     } finally {
//         submitBtn.innerText = "List Food Item";
//         submitBtn.disabled = false;
//     }
// };

// // ==========================================
// // NGO: DATA, FILTERS, AND FEED RENDERING
// // ==========================================
// let allAvailableDonations = [];

// function loadAvailableFood() {
//     const q = query(collection(db, "donations"), where("status", "==", "available"));
//     onSnapshot(q, (snapshot) => {
//         allAvailableDonations = [];
//         snapshot.forEach((docSnap) => {
//             allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() });
//         });
//         applyFiltersAndRender();
//     });
// }

// function applyFiltersAndRender() {
//     const searchTerm = document.getElementById('search-food').value.toLowerCase();
//     const locationFilter = document.getElementById('filter-location').value.toLowerCase();

//     const filteredData = allAvailableDonations.filter(item => {
//         const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
//         const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
//         return matchesSearch && matchesLocation;
//     });

//     renderFeed(filteredData);
//     updateMapMarkers(filteredData);     
// }

// function renderFeed(donations) {
//     const feed = document.getElementById('available-feed');
//     feed.innerHTML = '';
    
//     if(donations.length === 0) {
//         feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
//         return;
//     }
    
//     donations.forEach((item) => {
//         // NEW: Expiry Alert Math
//         const hoursLeft = (item.expiryTime - Date.now()) / (1000 * 60 * 60);
//         let expiryAlert = '';
//         if (hoursLeft <= 0) {
//             expiryAlert = `<span style="color: red; font-weight: bold; background: #ffebeb; padding: 2px 6px; border-radius: 4px; font-size: 12px;">⚠️ EXPIRED</span>`;
//         } else if (hoursLeft <= 2) { // Less than 2 hours left
//             expiryAlert = `<span style="color: #d35400; font-weight: bold; background: #fdebd0; padding: 2px 6px; border-radius: 4px; font-size: 12px;">⏳ Expiring Soon!</span>`;
//         } else {
//             expiryAlert = `<span style="color: green;">Valid for ${Math.round(hoursLeft)} hr(s)</span>`;
//         }

//         feed.innerHTML += `
//             <div class="data-card" style="${hoursLeft <= 0 ? 'opacity: 0.6;' : ''}">
//                 <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:8px; margin-bottom:12px;">
//                 <span class="status-badge badge-available">Available</span>
//                 <h4 class="card-title">${item.foodType}</h4>
//                 <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                 <div class="card-detail"><strong>Status:</strong> ${expiryAlert}</div>
//                 <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                 <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                
//                 ${hoursLeft > 0 ? `<button onclick="claimFood('${item.id}')" style="margin-top: auto; background-color: var(--primary); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Claim for Pickup</button>` : `<button disabled style="margin-top: auto; background-color: #ccc; border: none; padding: 0.5rem; border-radius: 6px;">Food Expired</button>`}
//             </div>`;
//     });
// }

// document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
// document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);

// // ==========================================
// // NGO: CLAIMING & COMPLETING LOGIC
// // ==========================================
// window.claimFood = async (id) => {
//     if(confirm("Claim this food? You must coordinate pickup immediately.")) {
//         const donationRef = doc(db, "donations", id);
//         await updateDoc(donationRef, {
//             status: 'picked_up', // Changes status from available to picked up
//             claimedBy: auth.currentUser.uid,
//             claimedByName: userDisplay.innerText.split(' •')[0]
//         });
//     }
// };

// window.completeDonation = async (id) => {
//     if(confirm("Mark as Distributed/Completed? This removes it from your active list.")) {
//         const donationRef = doc(db, "donations", id);
//         await updateDoc(donationRef, {
//             status: 'completed'
//         });
//     }
// };

// // NEW: Load NGO's Active Pickups
// function loadNGOClaims(uid) {
//     const q = query(collection(db, "donations"), where("claimedBy", "==", uid), where("status", "==", "picked_up"));
//     onSnapshot(q, (snapshot) => {
//         const claimsBox = document.getElementById('ngo-claims');
//         const claimsHeader = document.getElementById('my-claims-header');
//         claimsBox.innerHTML = '';
        
//         if(snapshot.empty) {
//             claimsHeader.style.display = 'none';
//             return;
//         }

//         claimsHeader.style.display = 'block'; // Show section if they have claims
//         snapshot.forEach((docSnap) => {
//             const item = docSnap.data();
//             claimsBox.innerHTML += `
//                 <div class="data-card" style="border: 2px solid var(--primary);">
//                     <h4 class="card-title">You are picking up: ${item.foodType}</h4>
//                     <div class="card-detail"><strong>From:</strong> <span>${item.address}</span></div>
//                     <div class="card-detail"><strong>Donor:</strong> <span>${item.donorName}</span></div>
//                     <button onclick="completeDonation('${docSnap.id}')" style="margin-top: 15px; width: 100%; background-color: #27ae60; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; font-weight: bold;">✅ Mark as Completed</button>
//                 </div>`;
//         });
//     });
// }

// // ==========================================
// // DONOR: HISTORY & BADGES
// // ==========================================
// function loadDonorHistory(uid) {
//     const q = query(collection(db, "donations"), where("donorId", "==", uid));
//     onSnapshot(q, (snapshot) => {
//         const history = document.getElementById('donor-history');
//         history.innerHTML = '';
        
//         const totalDonations = snapshot.size;

//         // NEW: Progress Bar & Donor Badges Math
//         let badge = '🥉 Bronze Donor';
//         let badgeColor = '#cd7f32'; // Bronze color
//         let nextTier = 5;
        
//         if (totalDonations >= 15) { 
//             badge = '🏆 Gold Donor'; 
//             badgeColor = '#f1c40f'; // Gold
//             nextTier = totalDonations; // Max tier
//         } else if (totalDonations >= 5) { 
//             badge = '🥈 Silver Donor'; 
//             badgeColor = '#bdc3c7'; // Silver
//             nextTier = 15; 
//         }

//         const progressPercent = Math.min((totalDonations / nextTier) * 100, 100);
        
//         document.getElementById('donor-badge-display').innerHTML = `
//             <div style="background: white; border-left: 5px solid ${badgeColor}; padding: 15px; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
//                 <h4 style="margin:0 0 10px 0; color: #333;">Your Impact Level: <span style="color: ${badgeColor};">${badge}</span></h4>
//                 <div style="background: #e0e0e0; border-radius: 10px; height: 10px; width: 100%; overflow: hidden;">
//                     <div style="background: ${badgeColor}; height: 10px; width: ${progressPercent}%; transition: width 0.5s ease-in-out;"></div>
//                 </div>
//                 <small style="color:#888; display: block; margin-top: 8px;">You've made ${totalDonations} donations! ${totalDonations < 15 ? `(Next tier at ${nextTier})` : 'You reached the top tier!'}</small>
//             </div>
//         `;

//         if(snapshot.empty) {
//             history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
//             return;
//         }

//         snapshot.forEach((docSnap) => {
//             const item = docSnap.data();
            
//             // Map the 3 statuses to UI colors
//             let statusText = 'Pending Pickup';
//             let badgeClass = 'badge-available';
//             if (item.status === 'picked_up') { statusText = 'Picked Up / In Transit'; badgeClass = 'badge-claimed'; }
//             if (item.status === 'completed') { statusText = 'Completed / Distributed'; badgeClass = 'badge-completed'; } // Add .badge-completed { background: #27ae60 } to your CSS!

//             history.innerHTML += `
//                 <div class="data-card">
//                     <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:12px;">
//                     <span class="status-badge ${badgeClass}">${statusText}</span>
//                     <h4 class="card-title">${item.foodType}</h4>
//                     <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
//                     <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
//                     ${item.status !== 'available' ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary-dark);"><strong>Handled By:</strong> <span>${item.claimedByName}</span></div>` : ''}
                    
//                     ${item.status === 'available' ? `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; width: 100%; background-color: #ef4444; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;">Delete Listing</button>` : ''}
//                 </div>`;
//         });
//     });
// }

// window.deleteDonorItem = async (id) => {
//     if(confirm("Delete this listing permanently?")) {
//         try { await deleteDoc(doc(db, "donations", id)); } 
//         catch (error) { alert("Error: " + error.message); }
//     }
// };

// // Logout Logic
// document.getElementById('logout-btn').addEventListener('click', async () => {
//     try {
//         await signOut(auth);
//         window.location.href = 'index.html';
//     } catch (error) { console.error("Logout error:", error); }
// });

// // ==========================================
// // SMART GOOGLE MAPS INTEGRATION
// // ==========================================
// let map;
// let mapMarkers = [];

// function updateMapMarkers(donations) {
//     if (typeof google === 'undefined') {
//         setTimeout(() => updateMapMarkers(donations), 500);
//         return;
//     }

//     if (!map) {
//         map = new google.maps.Map(document.getElementById("map"), {
//             center: { lat: 26.8467, lng: 80.9462 }, 
//             zoom: 12,
//             mapTypeControl: false,
//             streetViewControl: false
//         });
//     }

//     const geocoder = new google.maps.Geocoder();
//     const bounds = new google.maps.LatLngBounds(); 
//     let markersProcessed = 0;

//     mapMarkers.forEach(marker => marker.setMap(null));
//     mapMarkers = [];

//     // Only map items that are NOT expired
//     const activeDonations = donations.filter(item => (item.expiryTime - Date.now()) > 0);

//     if (activeDonations.length === 0) {
//         map.setCenter({ lat: 26.8467, lng: 80.9462 }); 
//         map.setZoom(12);
//         return;
//     }

//     activeDonations.forEach(item => {
//         if (item.address) {
//             let cleanAddress = item.address;
//             if (!cleanAddress.toLowerCase().includes("lucknow")) { cleanAddress += ", Lucknow"; }
//             cleanAddress += ", Uttar Pradesh, India";
            
//             geocoder.geocode({ address: cleanAddress }, (results, status) => {
//                 markersProcessed++;

//                 if (status === "OK" && results[0]) {
//                     const markerLocation = results[0].geometry.location;
                    
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: markerLocation,
//                         title: item.foodType,
//                         animation: google.maps.Animation.DROP,
//                         icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                     });

//                     const infoWindow = new google.maps.InfoWindow({
//                         content: `
//                             <div style="color: #333; font-family: sans-serif; padding: 5px;">
//                                 <strong style="font-size: 16px;">${item.foodType}</strong><br>
//                                 <span style="color: #666;">Quantity: ${item.quantity}</span><br>
//                                 <small>${item.address}</small><br>
//                                 <button onclick="claimFood('${item.id}')" style="background:#2ecc71; color:white; border:none; padding:8px 12px; border-radius:4px; margin-top:10px; cursor:pointer; width: 100%; font-weight: bold;">Claim</button>
//                             </div>`
//                     });

//                     marker.addListener('click', () => infoWindow.open(map, marker));
//                     mapMarkers.push(marker);
//                     bounds.extend(markerLocation);
//                 } 

//                 if (markersProcessed === activeDonations.length) {
//                     if (mapMarkers.length === 1) {
//                         map.setCenter(mapMarkers[0].getPosition());
//                         map.setZoom(16); 
//                     } else if (mapMarkers.length > 1) {
//                         map.fitBounds(bounds);
//                         if (map.getZoom() > 16) map.setZoom(16);
//                     }
//                 }
//             });
//         } else {
//             markersProcessed++; 
//         }
//     });
// }
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
                userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;

                if (userData.role === 'donor') {
                    donorSection.classList.remove('hidden');
                    loadDonorHistory(user.uid);
                } else {
                    ngoSection.classList.remove('hidden');
                    loadAvailableFood();
                    loadNGOClaims(user.uid); 
                }
            }
        } catch (error) { console.error("Auth error:", error); }
    } else {
        window.location.href = 'index.html';
    }
});

// Photo Preview Logic
document.getElementById('food-photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photo-preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
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
    const hoursValid = parseInt(document.getElementById('shelf-life').value);
    const expiryTimestamp = Date.now() + (hoursValid * 60 * 60 * 1000);

    try {
        if (file) {
            const storageRef = ref(storage, `food_images/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            photoURL = await getDownloadURL(snapshot.ref);
        }

        const foodData = {
            foodType: document.getElementById('food-type').value,
            quantity: document.getElementById('quantity').value + ' ' + document.getElementById('quantity-unit').value,
            shelfLifeHours: hoursValid,
            expiryTime: expiryTimestamp, 
            address: document.getElementById('address').value,
            image: photoURL,
            donorId: auth.currentUser.uid,
            donorName: userDisplay.innerText.split(' •')[0],
            status: 'available', 
            createdAt: serverTimestamp()
        };

        await addDoc(collection(db, "donations"), foodData);
        e.target.reset(); 
        document.getElementById('photo-preview').style.display = 'none';
        alert("Donation posted successfully!");
    } catch (error) { 
        alert("Error: " + error.message); 
    } finally {
        submitBtn.innerText = "List Food Item";
        submitBtn.disabled = false;
    }
};

// ==========================================
// NGO: DATA, FILTERS, AND FEED RENDERING
// ==========================================
let allAvailableDonations = [];

function loadAvailableFood() {
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    onSnapshot(q, (snapshot) => {
        allAvailableDonations = [];
        snapshot.forEach((docSnap) => { allAvailableDonations.push({ id: docSnap.id, ...docSnap.data() }); });
        applyFiltersAndRender();
    });
}

function applyFiltersAndRender() {
    const searchTerm = document.getElementById('search-food').value.toLowerCase();
    const locationFilter = document.getElementById('filter-location').value.toLowerCase();

    const filteredData = allAvailableDonations.filter(item => {
        const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || item.donorName.toLowerCase().includes(searchTerm);
        const matchesLocation = locationFilter === 'all' || item.address.toLowerCase().includes(locationFilter);
        return matchesSearch && matchesLocation;
    });

    renderFeed(filteredData);
    updateMapMarkers(filteredData);     
}

function renderFeed(donations) {
    const feed = document.getElementById('available-feed');
    feed.innerHTML = '';
    
    if(donations.length === 0) {
        feed.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No donations match your search criteria.</p>`;
        return;
    }
    
    donations.forEach((item) => {
        const hoursLeft = (item.expiryTime - Date.now()) / (1000 * 60 * 60);
        let expiryAlert = '';
        if (hoursLeft <= 0) {
            expiryAlert = `<span style="color: var(--danger); font-weight: bold; font-size: 13px;">⚠️ EXPIRED</span>`;
        } else if (hoursLeft <= 2) { 
            expiryAlert = `<span style="color: var(--warning); font-weight: bold; font-size: 13px;">⏳ Expiring Soon!</span>`;
        } else {
            expiryAlert = `<span style="color: var(--success); font-weight: bold; font-size: 13px;">Valid for ${Math.round(hoursLeft)} hr(s)</span>`;
        }

        feed.innerHTML += `
            <div class="data-card" style="${hoursLeft <= 0 ? 'opacity: 0.6;' : ''}">
                <img src="${item.image}" style="width:100%; height:160px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:12px;">
                <span class="status-badge badge-available">Available</span>
                <h4 class="card-title">${item.foodType}</h4>
                <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                <div class="card-detail"><strong>Status:</strong> ${expiryAlert}</div>
                <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                
                ${hoursLeft > 0 ? `<button onclick="claimFood('${item.id}')" style="margin-top: auto;">Claim for Pickup</button>` : `<button disabled style="margin-top: auto;">Food Expired</button>`}
            </div>`;
    });
}

document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);
document.getElementById('filter-location').addEventListener('change', applyFiltersAndRender);

// ==========================================
// NGO: CLAIMING & COMPLETING LOGIC
// ==========================================
window.claimFood = async (id) => {
    if(confirm("Claim this food? You must coordinate pickup immediately.")) {
        const donationRef = doc(db, "donations", id);
        await updateDoc(donationRef, {
            status: 'picked_up', 
            claimedBy: auth.currentUser.uid,
            claimedByName: userDisplay.innerText.split(' •')[0]
        });
    }
};

window.completeDonation = async (id) => {
    if(confirm("Mark as Distributed/Completed? This removes it from your active list.")) {
        await updateDoc(doc(db, "donations", id), { status: 'completed' });
    }
};

// Load NGO's Active Pickups (Added Maps & Chat features)
function loadNGOClaims(uid) {
    const q = query(collection(db, "donations"), where("claimedBy", "==", uid), where("status", "==", "picked_up"));
    onSnapshot(q, (snapshot) => {
        const claimsBox = document.getElementById('ngo-claims');
        const claimsHeader = document.getElementById('my-claims-header');
        claimsBox.innerHTML = '';
        
        if(snapshot.empty) {
            claimsHeader.style.display = 'none';
            return;
        }

        claimsHeader.style.display = 'block'; 
        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            
            // Generate Google Maps Directions URL
            const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.address + ', Lucknow, Uttar Pradesh, India')}`;

            claimsBox.innerHTML += `
                <div class="data-card" style="border: 2px solid var(--primary);">
                    <h4 class="card-title">You are picking up: ${item.foodType}</h4>
                    <div class="card-detail"><strong>From:</strong> <span>${item.address}</span></div>
                    <div class="card-detail"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button onclick="openChat('${docSnap.id}', '${item.donorName}')" style="flex: 1; background-color: var(--secondary); color: white; padding: 0.5rem; border-radius: 99px;">💬 Chat</button>
                        <a href="${mapUrl}" target="_blank" style="flex: 1; text-align: center; background-color: var(--info); color: white; padding: 0.5rem; border-radius: 99px; text-decoration: none; font-weight: bold; display: flex; align-items: center; justify-content: center; transition: 0.2s;">📍 Navigate</a>
                    </div>
                    
                    <button onclick="completeDonation('${docSnap.id}')" style="margin-top: 10px; width: 100%; background-color: var(--success); color: white; border-radius: 99px;">✅ Mark as Completed</button>
                </div>`;
        });
    });
}

// ==========================================
// DONOR: HISTORY & BADGES
// ==========================================
function loadDonorHistory(uid) {
    const q = query(collection(db, "donations"), where("donorId", "==", uid));
    onSnapshot(q, (snapshot) => {
        const history = document.getElementById('donor-history');
        history.innerHTML = '';
        
        const totalDonations = snapshot.size;
        let badge = '🥉 Bronze Donor';
        let badgeColor = '#cd7f32'; 
        let nextTier = 5;
        
        if (totalDonations >= 15) { 
            badge = '🏆 Gold Donor'; 
            badgeColor = '#f1c40f'; 
            nextTier = totalDonations; 
        } else if (totalDonations >= 5) { 
            badge = '🥈 Silver Donor'; 
            badgeColor = '#94A3B8'; 
            nextTier = 15; 
        }

        const progressPercent = Math.min((totalDonations / nextTier) * 100, 100);
        
        document.getElementById('donor-badge-display').innerHTML = `
            <div style="background: white; border-left: 6px solid ${badgeColor}; padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 25px; box-shadow: var(--shadow-sm);">
                <h4 style="margin:0 0 10px 0; color: var(--text-main); font-size: 1.2rem;">Your Impact Level: <span style="color: ${badgeColor};">${badge}</span></h4>
                <div style="background: var(--bg-body); border-radius: 10px; height: 12px; width: 100%; overflow: hidden;">
                    <div style="background: ${badgeColor}; height: 12px; width: ${progressPercent}%; transition: width 1s ease-in-out;"></div>
                </div>
                <small style="color:var(--text-muted); display: block; margin-top: 10px; font-weight: 600;">You've made ${totalDonations} donations! ${totalDonations < 15 ? `(Next tier at ${nextTier})` : 'You reached the top tier!'}</small>
            </div>
        `;

        if(snapshot.empty) {
            history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
            return;
        }

        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            let statusText = 'Pending Pickup';
            let badgeClass = 'badge-available';
            if (item.status === 'picked_up') { statusText = 'Picked Up'; badgeClass = 'badge-claimed'; }
            if (item.status === 'completed') { statusText = 'Completed'; badgeClass = 'badge-completed'; } 

            let actionButtons = '';
            if (item.status === 'available') {
                actionButtons = `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; background-color: var(--danger); border-radius: 99px;">Delete Listing</button>`;
            } else if (item.status === 'picked_up') {
                // Add Chat button for donor to speak to NGO
                actionButtons = `<button onclick="openChat('${docSnap.id}', '${item.claimedByName}')" style="margin-top: 10px; background-color: var(--secondary); border-radius: 99px;">💬 Chat with NGO</button>`;
            }

            history.innerHTML += `
                <div class="data-card">
                    <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:12px;">
                    <span class="status-badge ${badgeClass}">${statusText}</span>
                    <h4 class="card-title">${item.foodType}</h4>
                    <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                    <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                    ${item.status !== 'available' ? `<div class="card-detail" style="margin-top: 0.5rem; color: var(--primary);"><strong>Handled By:</strong> <span>${item.claimedByName}</span></div>` : ''}
                    ${actionButtons}
                </div>`;
        });
    });
}

window.deleteDonorItem = async (id) => {
    if(confirm("Delete this listing permanently?")) {
        await deleteDoc(doc(db, "donations", id));
    }
};

// ==========================================
// REAL-TIME IN-APP CHAT LOGIC
// ==========================================
let currentChatDonationId = null;
let unsubscribeChat = null;

window.openChat = (donationId, otherPartyName) => {
    currentChatDonationId = donationId;
    document.getElementById('chat-header').innerText = "Chat with " + otherPartyName;
    document.getElementById('chat-modal').classList.remove('hidden');
    
    // Listen for messages linked to this specific donation
    const q = query(collection(db, "messages"), where("donationId", "==", donationId));
    
    unsubscribeChat = onSnapshot(q, (snapshot) => {
        const chatBox = document.getElementById('chat-messages');
        chatBox.innerHTML = '';
        
        // Extract and sort messages by time so they appear in order
        let messages = [];
        snapshot.forEach(docSnap => messages.push(docSnap.data()));
        messages.sort((a, b) => (a.timestamp?.toMillis() || 0) - (b.timestamp?.toMillis() || 0));

        if (messages.length === 0) {
            chatBox.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:20px;">Send a message to coordinate pickup!</p>`;
        }

        messages.forEach(msg => {
            const isMe = msg.senderId === auth.currentUser.uid;
            chatBox.innerHTML += `
                <div style="align-self: ${isMe ? 'flex-end' : 'flex-start'}; background: ${isMe ? 'var(--primary)' : 'white'}; color: ${isMe ? 'white' : 'var(--text-main)'}; padding: 10px 14px; border-radius: 16px; border-bottom-${isMe ? 'right' : 'left'}-radius: 4px; max-width: 85%; box-shadow: var(--shadow-sm); border: 1px solid ${isMe ? 'var(--primary)' : 'var(--border-light)'};">
                    <span style="font-size: 0.75rem; font-weight: 700; display: block; margin-bottom: 4px; opacity: 0.8;">${msg.senderName}</span>
                    <span style="font-size: 0.95rem;">${msg.text}</span>
                </div>
            `;
        });
        
        // Auto-scroll to latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    });
};

window.closeChat = () => {
    document.getElementById('chat-modal').classList.add('hidden');
    if (unsubscribeChat) unsubscribeChat(); // Stop listening when closed
    currentChatDonationId = null;
};

// Send a message
document.getElementById('chat-form').onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !currentChatDonationId) return;

    input.value = ''; // Clear input instantly for UI speed
    
    await addDoc(collection(db, "messages"), {
        donationId: currentChatDonationId,
        text: text,
        senderId: auth.currentUser.uid,
        senderName: userDisplay.innerText.split(' •')[0],
        timestamp: serverTimestamp()
    });
};

// Logout Logic
document.getElementById('logout-btn').addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
});

// ==========================================
// SMART GOOGLE MAPS INTEGRATION
// ==========================================
let map;
let mapMarkers = [];

function updateMapMarkers(donations) {
    if (typeof google === 'undefined') {
        setTimeout(() => updateMapMarkers(donations), 500);
        return;
    }

    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 26.8467, lng: 80.9462 }, 
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false
        });
    }

    const geocoder = new google.maps.Geocoder();
    const bounds = new google.maps.LatLngBounds(); 
    let markersProcessed = 0;

    mapMarkers.forEach(marker => marker.setMap(null));
    mapMarkers = [];

    const activeDonations = donations.filter(item => (item.expiryTime - Date.now()) > 0);

    if (activeDonations.length === 0) {
        map.setCenter({ lat: 26.8467, lng: 80.9462 }); 
        map.setZoom(12);
        return;
    }

    activeDonations.forEach(item => {
        if (item.address) {
            let cleanAddress = item.address;
            if (!cleanAddress.toLowerCase().includes("lucknow")) cleanAddress += ", Lucknow";
            cleanAddress += ", Uttar Pradesh, India";
            
            geocoder.geocode({ address: cleanAddress }, (results, status) => {
                markersProcessed++;
                if (status === "OK" && results[0]) {
                    const markerLocation = results[0].geometry.location;
                    const marker = new google.maps.Marker({
                        map: map, position: markerLocation, title: item.foodType, animation: google.maps.Animation.DROP
                    });

                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div style="color: #333; font-family: sans-serif; padding: 5px;">
                                <strong>${item.foodType}</strong><br>
                                <span style="color: #666;">Qty: ${item.quantity}</span><br>
                                <button onclick="claimFood('${item.id}')" style="background:var(--success); color:white; border:none; padding:8px 12px; border-radius:4px; margin-top:10px; cursor:pointer; width: 100%;">Claim</button>
                            </div>`
                    });

                    marker.addListener('click', () => infoWindow.open(map, marker));
                    mapMarkers.push(marker);
                    bounds.extend(markerLocation);
                } 

                if (markersProcessed === activeDonations.length) {
                    if (mapMarkers.length === 1) {
                        map.setCenter(mapMarkers[0].getPosition()); map.setZoom(16); 
                    } else if (mapMarkers.length > 1) {
                        map.fitBounds(bounds); if (map.getZoom() > 16) map.setZoom(16);
                    }
                }
            });
        } else { markersProcessed++; }
    });
}

