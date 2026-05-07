import { auth, db, storage } from './firebase.js'; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    collection, addDoc, query, where, onSnapshot, doc, getDoc, updateDoc, serverTimestamp, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const userDisplay = document.getElementById('user-display');
// ==========================================
// 🔥 NEW: MAP SEARCH BOX FIX (ADDED)
// ==========================================
let searchBox;
function initSearchBox() {
    if (typeof google === "undefined") {
        setTimeout(initSearchBox, 500);
        return;
    }

    const input = document.getElementById("search-food");
    if (!input) return;

    searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        const place = places[0];
        if (!place.geometry) return;

        if (map) {
            map.setCenter(place.geometry.location);
            map.setZoom(14);
        }
    });
}
window.addEventListener("load", initSearchBox);


// ==========================================
// 1. AUTH STATE & ROUTING
// ==========================================
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            userDisplay.innerText = `${userData.name} • ${userData.role.toUpperCase()}`;
            if (userData.role === 'donor') {
                document.getElementById('donor-section').classList.remove('hidden');
                loadDonorHistory(user.uid);
            } else {
                document.getElementById('ngo-section').classList.remove('hidden');
                loadAvailableFood();
                loadNGOClaims(user.uid); 
            }
        }
    } else { 
        window.location.href = 'index.html'; 
    }
});

// ==========================================
// 2. PHOTO PREVIEW LOGIC
// ==========================================
document.getElementById('food-photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Only image files allowed!");
        e.target.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('photo-preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

// ==========================================
// 3. DONOR: SUBMIT DONATION (Using Cloudinary)
// ==========================================
document.getElementById('donation-form').onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button');
    submitBtn.innerText = "Uploading Image...";
    submitBtn.disabled = true;

    const file = document.getElementById('food-photo').files[0];
    let photoURL = "https://via.placeholder.com/300?text=No+Image+Available";
    const hoursValid = parseInt(document.getElementById('shelf-life').value);
    const expiryTimestamp = Date.now() + (hoursValid * 60 * 60 * 1000);

    // ⚠️ PASTE YOUR CLOUDINARY DETAILS HERE ⚠️
    const cloudName = "duj9ummoo"; 
    const uploadPreset = "fooddonation_preset"; 

    try {
        // --- CLOUDINARY UPLOAD LOGIC ---
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            // Send the image directly to Cloudinary's API
            const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            });

            if (!cloudinaryResponse.ok) {
                throw new Error("Failed to upload image to Cloudinary.");
            }

            const cloudinaryData = await cloudinaryResponse.json();
            // Grab the secure HTTPS link provided by Cloudinary
            photoURL = cloudinaryData.secure_url; 
        }

        // --- FIREBASE DATABASE LOGIC ---
        submitBtn.innerText = "Saving to Database...";

        const foodData = {
            foodType: document.getElementById('food-type').value,
            quantity: document.getElementById('quantity').value + ' ' + document.getElementById('quantity-unit').value,
            contact: document.getElementById('contact-number').value, // <--- CONTACT NUMBER EXTRACTED HERE
            shelfLifeHours: hoursValid,
            expiryTime: expiryTimestamp, 
            address: document.getElementById('address').value,
            image: photoURL, // This is now the Cloudinary URL!
            donorId: auth.currentUser.uid,
            donorName: userDisplay.innerText.split(' •')[0],
            status: 'available', 
            createdAt: serverTimestamp()
        };

        // Save the details (with the new image link) to Firestore
        await addDoc(collection(db, "donations"), foodData);
        e.target.reset(); 
        document.getElementById('photo-preview').style.display = 'none';
        alert("Donation posted successfully!");

    } catch (error) { 
        console.error("Upload Error:", error);
        alert("Error: " + error.message); 
    } finally {
        submitBtn.innerText = "List Food Item";
        submitBtn.disabled = false;
    }
};

// ==========================================
// 4. NGO: SEARCH, FILTER & DYNAMIC MAP ZOOM
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

    const filteredData = allAvailableDonations.filter(item => {
        const matchesSearch = item.foodType.toLowerCase().includes(searchTerm) || 
                              item.address.toLowerCase().includes(searchTerm) || 
                              item.donorName.toLowerCase().includes(searchTerm);
        return matchesSearch;
    });

    renderFeed(filteredData);
    
    // We now pass the searchTerm to the map engine!
    updateMapMarkers(filteredData, searchTerm); 
}

function renderFeed(donations) {
    const feed = document.getElementById('available-feed');
    feed.innerHTML = '';
    
    // FIXED SYNTAX ERROR HERE
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
                <div class="card-detail"><strong>Contact:</strong> <span>${item.contact || 'N/A'}</span></div> <!-- FIXED SYNTAX ERROR HERE -->
                <div class="card-detail" style="margin-bottom: 0.5rem;"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                
                ${hoursLeft > 0 ? `<button onclick="claimFood('${item.id}')" style="margin-top: auto;">Claim for Pickup</button>` : `<button disabled style="margin-top: auto;">Food Expired</button>`}
            </div>`;
    });
}

document.getElementById('search-food').addEventListener('input', applyFiltersAndRender);

// ==========================================
// 5. NGO: CLAIMING & COMPLETING LOGIC
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
            const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.address + ', Lucknow, Uttar Pradesh, India')}`;

            claimsBox.innerHTML += `
                <div class="data-card" style="border: 2px solid var(--primary);">
                    <h4 class="card-title">You are picking up: ${item.foodType}</h4>
                    <div class="card-detail"><strong>From:</strong> <span>${item.address}</span></div>
                    <div class="card-detail"><strong>Donor:</strong> <span>${item.donorName}</span></div>
                    <div class="card-detail"><strong>Contact:</strong> <span>${item.contact || 'N/A'}</span></div> <!-- ALREADY CORRECT HERE -->
                    <a href="${mapUrl}" target="_blank" style="margin-top: 15px; text-align: center; background-color: var(--secondary); color: white; padding: 0.75rem; border-radius: var(--radius-md); text-decoration: none; font-weight: bold; display: block; transition: 0.2s;">📍 Navigate to Location</a>
                    
                    <button onclick="completeDonation('${docSnap.id}')" style="margin-top: 10px; width: 100%; background-color: var(--success); color: white;">✅ Mark as Completed</button>
                </div>`;
        });
    });
}

// ==========================================
// 6. DONOR: HISTORY, BADGES & EXPIRED CLEANUP
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
            <div style="background: rgba(255,255,255,0.05); border-left: 6px solid ${badgeColor}; padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 25px; border: 1px solid var(--border-light);">
                <h4 style="margin:0 0 10px 0; color: var(--text-main); font-size: 1.2rem;">Your Impact Level: <span style="color: ${badgeColor};">${badge}</span></h4>
                <div style="background: var(--bg-body); border-radius: 10px; height: 12px; width: 100%; overflow: hidden;">
                    <div style="background: ${badgeColor}; height: 12px; width: ${progressPercent}%; transition: width 1s ease-in-out;"></div>
                </div>
                <small style="color:var(--text-muted); display: block; margin-top: 10px; font-weight: 600;">You've made ${totalDonations} donations! ${totalDonations < 15 ? `(Next tier at ${nextTier})` : 'You reached the top tier!'}</small>
            </div>
        `;

        // FIXED SYNTAX ERROR HERE
        if(snapshot.empty) {
            history.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">You haven't posted any donations yet.</p>`;
            return;
        }

        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            
            // NEW: Check if the food is expired
            const hoursLeft = (item.expiryTime - Date.now()) / (1000 * 60 * 60);
            const isExpired = hoursLeft <= 0 && item.status === 'available';

            let statusText = 'Pending Pickup';
            let badgeClass = 'badge-available';
            let expiredStyles = ''; 

            if (item.status === 'picked_up') { 
                statusText = 'Picked Up'; badgeClass = 'badge-claimed'; 
            } else if (item.status === 'completed') { 
                statusText = 'Completed'; badgeClass = 'badge-completed'; 
            } else if (isExpired) {
                // Change UI to red if it is expired
                statusText = 'Expired'; 
                badgeClass = ''; 
                expiredStyles = 'background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid var(--danger);';
            }

            let actionButtons = '';
            if (item.status === 'available') {
                if (isExpired) {
                    // Show a bold delete button for expired food
                    actionButtons = `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; background: var(--danger); background-image: none; box-shadow: 0 4px 15px rgba(239,68,68,0.3);">🗑️ Delete Expired Food</button>`;
                } else {
                    // Standard cancel button for active food
                    actionButtons = `<button onclick="deleteDonorItem('${docSnap.id}')" style="margin-top: 10px; background: transparent; color: var(--danger); border: 1px solid var(--danger); background-image: none;">Cancel Listing</button>`;
                }
            }

            history.innerHTML += `
                <div class="data-card" style="${isExpired ? 'opacity: 0.8; border-color: rgba(239,68,68,0.4);' : ''}">
                    <img src="${item.image}" style="width:100%; height:120px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:12px;">
                    <span class="status-badge ${badgeClass}" style="${expiredStyles}">${statusText}</span>
                    <h4 class="card-title">${item.foodType}</h4>
                    <div class="card-detail"><strong>Quantity:</strong> <span>${item.quantity}</span></div>
                    <div class="card-detail"><strong>Location:</strong> <span>${item.address}</span></div>
                    <div class="card-detail"><strong>Contact:</strong> <span>${item.contact || 'N/A'}</span></div> <!-- FIXED SYNTAX ERROR HERE -->
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
// 7. LOGOUT
// ==========================================
document.getElementById('logout-btn').addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
});

// ==========================================
// 8. LUCKNOW SMART GOOGLE MAPS ZOOM
// ==========================================
let map;
let mapMarkers = [];

// NEW: Added searchTerm parameter
function updateMapMarkers(donations, searchTerm = "") {
    if (typeof google === 'undefined') {
        setTimeout(() => updateMapMarkers(donations, searchTerm), 500);
        return;
    }

    if (!map) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 26.8467, lng: 80.9462 }, 
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            styles: [ { "elementType": "geometry", "stylers": [ { "color": "#242f3e" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#746855" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#242f3e" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#263c3f" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#6b9a76" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#38414e" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#212a37" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#9ca5b3" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#746855" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#1f2835" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#f3d19c" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#2f3948" } ] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#17263c" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#515c6d" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#17263c" } ] } ]
        });
    }

    const geocoder = new google.maps.Geocoder();
    const bounds = new google.maps.LatLngBounds(); 
    let markersProcessed = 0;

    mapMarkers.forEach(marker => marker.setMap(null));
    mapMarkers = [];

    const activeDonations = donations.filter(item => (item.expiryTime - Date.now()) > 0);

    // ==========================================
    // THE FIX: If no food exists, try to zoom to the typed text anyway!
    // ==========================================
    if (activeDonations.length === 0) {
        if (searchTerm.trim() !== "") {
            // User typed something, but there is no food. Let's find the location anyway.
            geocoder.geocode({ address: searchTerm + ", Lucknow, Uttar Pradesh, India" }, (results, status) => {
                if (status === "OK" && results[0]) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(14); // Zoom into the empty neighborhood
                } else {
                    // Fallback if Google Maps doesn't recognize the word
                    map.setCenter({ lat: 26.8467, lng: 80.9462 }); 
                    map.setZoom(12);
                }
            });
        } else {
            // Search bar is empty, show default Lucknow
            map.setCenter({ lat: 26.8467, lng: 80.9462 }); 
            map.setZoom(12);
        }
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
                                <button onclick="claimFood('${item.id}')" style="background:#10B981; color:white; border:none; padding:8px 12px; border-radius:4px; margin-top:10px; cursor:pointer; width: 100%;">Claim</button>
                            </div>`
                    });

                    marker.addListener('click', () => infoWindow.open(map, marker));
                    mapMarkers.push(marker);
                    bounds.extend(markerLocation);
                } 

                if (markersProcessed === activeDonations.length) {
                    if (mapMarkers.length === 1) {
                        map.setCenter(mapMarkers[0].getPosition()); 
                        map.setZoom(16); 
                    } else if (mapMarkers.length > 1) {
                        map.fitBounds(bounds); 
                        if (map.getZoom() > 16) map.setZoom(16);
                    }
                }
            });
        } else { markersProcessed++; }
    });
}
