import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const postBtn = document.getElementById("postBtn");
const list = document.getElementById("list");

let userRole = "";

onAuthStateChanged(auth, async (user) => {
  if (!user) return (window.location = "index.html");

  const userDoc = await getDoc(doc(db, "users", user.uid));
  userRole = userDoc.data().role;

  document.getElementById("userRole").innerText = userRole;

  if (userRole === "ngo") {
    document.getElementById("donorSection").style.display = "none";
  }

  loadFood();
});

postBtn.addEventListener("click", async () => {
  await addDoc(collection(db, "food"), {
    food: food.value,
    qty: qty.value,
    loc: loc.value,
    status: "available"
  });
});

function loadFood() {
  onSnapshot(collection(db, "food"), (snapshot) => {
    list.innerHTML = "";

    snapshot.forEach(docSnap => {
      const d = docSnap.data();

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <b>${d.food}</b> - ${d.qty} (${d.loc}) <br>
        Status: ${d.status}
      `;

      if (userRole === "ngo" && d.status === "available") {
        const btn = document.createElement("button");
        btn.innerText = "Claim";

        btn.onclick = async () => {
          await updateDoc(doc(db, "food", docSnap.id), {
            status: "claimed"
          });
        };

        div.appendChild(btn);
      }

      list.appendChild(div);
    });
  });
}
