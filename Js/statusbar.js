// Atualiza o relógio da barra de status
function initStatusBar() {
    function updateClock() {
        const now = new Date();
        const clockEl = document.getElementById('clock');
        if (clockEl) {
            clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', initStatusBar);
