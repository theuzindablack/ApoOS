function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const clockEl = document.getElementById('clock');
  if (clockEl) clockEl.innerText = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

function toggleMenu() {
  alert("⚡ ApoOS v1.0 — Web Ecosystem Minimalista.");
}
