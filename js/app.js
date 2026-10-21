const apps = [
    { 
        id: 'files', 
        name: 'Arquivos', 
        icon: `<svg width="34" height="34" viewBox="0 0 64 64" fill="none"><path d="M8 18C8 14.68 10.68 12 14 12H24C26.2 12 28.2 13.2 29.2 15.1L30.7 18.2C31.7 20.1 33.7 21.4 36 21.4H50C53.3 21.4 56 24 56 27.4V48C56 51.3 53.3 54 50 54H14C10.6 54 8 51.3 8 48V18Z" fill="#d97706"/><path d="M8 28C8 24.6 10.6 22 14 22H50C53.3 22 56 24.6 56 28V48C56 51.3 53.3 54 50 54H14C10.6 54 8 51.3 8 48V28Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/></svg>`, 
        bg: 'bg-amber-950/40 border border-amber-500/30' 
    },
    { 
        id: 'termux', 
        name: 'Termux Web', 
        icon: `<svg width="32" height="32" viewBox="0 0 64 64" fill="none"><rect x="6" y="10" width="52" height="44" rx="10" fill="#000" stroke="#10b981" stroke-width="2"/><path d="M16 22L26 32L16 42" stroke="#10b981" stroke-width="4" stroke-linecap="round"/><line x1="30" y1="42" x2="44" y2="42" stroke="#10b981" stroke-width="4" stroke-linecap="round"/></svg>`, 
        bg: 'bg-black border border-emerald-500/40' 
    },
    { 
        id: 'browser', 
        name: 'Google', 
        icon: '🌐', 
        bg: 'bg-blue-600' 
    },
    { 
        id: 'calculator', 
        name: 'Calculadora', 
        icon: '🧮', 
        bg: 'bg-orange-500' 
    },
    { 
        id: 'notepad', 
        name: 'Notas', 
        icon: `<svg width="32" height="32" viewBox="0 0 64 64" fill="none"><rect x="12" y="8" width="40" height="48" rx="8" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/><line x1="20" y1="20" x2="36" y2="20" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="28" x2="44" y2="28" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="36" x2="40" y2="36" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/></svg>`, 
        bg: 'bg-slate-800 border border-slate-600' 
    },
    { 
        id: 'store', 
        name: 'storeOs', 
        icon: '🛍️', 
        bg: 'bg-purple-600' 
    },
    { 
        id: 'settings', 
        name: 'Ajustes', 
        icon: `<svg width="32" height="32" viewBox="0 0 64 64" fill="none"><rect x="8" y="14" width="48" height="40" rx="14" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/><circle cx="22" cy="30" r="4" fill="#38bdf8"/><circle cx="42" cy="30" r="4" fill="#38bdf8"/><path d="M22 42C22 42 26 45 32 45C38 45 42 42 42 42" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/></svg>`, 
        bg: 'bg-slate-900 border border-sky-500/40' 
    }
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
                <span class="flex items-center gap-2"><span class="w-6 h-6 flex items-center justify-center">${appInfo.icon}</span> ${appInfo.name}</span>
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
