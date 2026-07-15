document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("installBtn");
  if (!installBtn) return;

  installBtn.style.display = "none";
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "block";
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(outcome === "accepted" ? "App installed" : "Install dismissed");
    } catch (err) {
      console.error("Install prompt failed:", err);
    } finally {
      deferredPrompt = null;
      installBtn.style.display = "none";
    }
  });

  window.addEventListener("appinstalled", () => {
    installBtn.style.display = "none";
    deferredPrompt = null;
  });
});