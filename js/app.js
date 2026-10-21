const apps = [
    { id: 'files', name: 'Arquivos', icon: '📁', bg: 'bg-amber-500' },
    { id: 'termux', name: 'Termux Web', icon: '💻', bg: 'bg-black border border-slate-700' },
    { id: 'browser', name: 'Google', icon: '🌐', bg: 'bg-blue-600' },
    { id: 'calculator', name: 'Calculadora', icon: '🧮', bg: 'bg-orange-500' },
    { id: 'notepad', name: 'Notas', icon: '📝', bg: 'bg-yellow-500' },
    { id: 'store', name: 'storeOs', icon: '🛍️', bg: 'bg-purple-600' },
    { id: 'settings', name: 'Ajustes', icon: '⚙️', bg: 'bg-slate-600' }
];

function renderDesktop() {
    const grid = document.getElementById('desktopGrid');
    if (!grid) return;
    grid.innerHTML = apps.map(app => `
        <div class="app-icon" onclick="openApp('${app.id}')">
            <div class="app-badge ${app.bg} text-white shadow-lg">
                ${app.icon}
            </div>
            <span class="app-name">${app.name}</span>
        </div>
    `).join('');
}

function openApp(appId) {
    const container = document.getElementById('appWindowContainer');
    let content = '';

    switch(appId) {
        case 'files': content = renderFilesApp(); break;
        case 'termux': content = renderTermuxApp(); break;
        case 'browser': content = renderBrowserApp(); break;
        case 'calculator': content = renderCalcApp(); break;
        case 'notepad': content = renderNotepadApp(); break;
        case 'store': content = renderStoreApp(); break;
        case 'settings': content = renderSettingsApp(); break;
    }

    const appInfo = apps.find(a => a.id === appId);

    container.innerHTML = `
        <div class="app-window active" id="window-${appId}">
            <div class="app-header">
                <span class="flex items-center gap-2"><span class="text-lg">${appInfo.icon}</span> ${appInfo.name}</span>
                <button onclick="closeApp('${appId}')" class="text-slate-400 hover:text-white px-2 py-1"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto bg-slate-900 flex flex-col">
                ${content}
            </div>
        </div>
    `;

    if (appId === 'termux') initTermuxEvents();
}

function closeApp(appId) {
    const win = document.getElementById(`window-${appId}`);
    if (win) {
        win.classList.remove('active');
        setTimeout(() => win.remove(), 300);
    }
}

function goHome() {
    document.getElementById('appWindowContainer').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', renderDesktop);
