document.addEventListener('DOMContentLoaded', () => {
  const openFormBtn = document.getElementById('openFormBtn');
  const closeFormBtn = document.getElementById('closeFormBtn');
  const popupForm = document.getElementById('popupForm');
  const myForm = document.getElementById('myForm');

  const nameInput = document.getElementById('name');
  const amountInput = document.getElementById('amount');
  const methodInput = document.getElementById('method');

  openFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popupForm.style.display = 'flex';
  });

  closeFormBtn.addEventListener('click', () => {
    popupForm.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === popupForm) popupForm.style.display = 'none';
  });

  myForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const method = methodInput.value;

    if (!name || !method || isNaN(amount)) {
      alert("⚠️ Please fill in all fields correctly.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "offerings"), {
        name,
        amount,
        method,
        timestamp: new Date()
      });

      alert(`✅ Thank you, ${name}! Your offering of ₱${amount} via ${method} has been recorded.`);
      myForm.reset();
      popupForm.style.display = 'none';
    } catch (error) {
      console.error("Firestore error:", error);
      alert("❌ There was an error submitting your offering. Check console.");
    }
  });
});
