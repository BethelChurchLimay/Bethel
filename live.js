// Switch tabs
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Run commands
function execCmd(command) {
  document.execCommand(command, false, null);
}

function setParagraph(tag) {
  document.execCommand('formatBlock', false, tag);
}

// Download PDF
document.getElementById("downloadBtn").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const notesText = document.getElementById("notesBox").innerText;
  doc.text(notesText, 10, 10, { maxWidth: 180 });
  doc.save("MyNotes.pdf");
});

// Prayer Modal
const openPrayerModal = document.getElementById("openPrayerModal");
const prayerModal = document.getElementById("prayerModal");
const closePrayerModal = document.getElementById("closePrayerModal");

openPrayerModal.addEventListener("click", () => {
  prayerModal.style.display = "flex";
});

closePrayerModal.addEventListener("click", () => {
  prayerModal.style.display = "none";
});

// Close modal if clicked outside content
prayerModal.addEventListener("click", (e) => {
  if (e.target === prayerModal) {
    prayerModal.style.display = "none";
  }
});

// ==== FIREBASE CONFIG ====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5nDJs46FrjQZDkxEaCPlfVORkTM13aI0",
  authDomain: "bethelchurch-site.firebaseapp.com",
  projectId: "bethelchurch-site",
  storageBucket: "bethelchurch-site.firebasestorage.app",
  messagingSenderId: "850779673311",
  appId: "1:850779673311:web:8f58ce29d1748ab2ef4f6a",
  measurementId: "G-PSKDKVM2Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// === Prayer Request Form Submission ===
document.querySelector(".prayer-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.querySelector('input[type="text"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();
  const message = e.target.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    await addDoc(collection(db, "prayerRequests"), {
      name,
      email,
      message,
      timestamp: new Date()
    });

    e.target.reset();
prayerModal.style.display = "none";

// Create toast
const toast = document.createElement("div");
toast.className = "toast";
toast.innerText = "Prayer Request Submitted Successfully!";
document.body.appendChild(toast);

// Remove toast after animation
setTimeout(() => {
  toast.remove();
}, 3500);

  } catch (error) {
    console.error("Error adding document: ", error);
    alert("❌ Something went wrong. Please try again.");
  }
});
