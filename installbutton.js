document.addEventListener("DOMContentLoaded", () => {
  const installBtn = document.getElementById("installBtn");
  if (!installBtn) return;

  // Button stays visible at all times now (no hiding by default)
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("Install is available — beforeinstallprompt fired");
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) {
      // No install prompt available — either already installed,
      // unsupported browser (e.g. Safari/iOS), or criteria not met yet
      alert("This app can be installed from your browser's menu (e.g. 'Add to Home Screen').");
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(outcome === "accepted" ? "App installed" : "Install dismissed");
    } catch (err) {
      console.error("Install prompt failed:", err);
    } finally {
      deferredPrompt = null;
    }
  });

  window.addEventListener("appinstalled", () => {
    console.log("App was installed");
    deferredPrompt = null;
  });
});