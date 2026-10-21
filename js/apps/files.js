let svgFolderIcon = `<svg class="w-5 h-5 inline-block mr-2" viewBox="0 0 64 64" fill="none"><path d="M8 18C8 14.68 10.68 12 14 12H24C26.2 12 28.2 13.2 29.2 15.1L30.7 18.2C31.7 20.1 33.7 21.4 36 21.4H50C53.3 21.4 56 24 56 27.4V48C56 51.3 53.3 54 50 54H14C10.6 54 8 51.3 8 48V18Z" fill="#d97706"/><path d="M8 28C8 24.6 10.6 22 14 22H50C53.3 22 56 24.6 56 28V48C56 51.3 53.3 54 50 54H14C10.6 54 8 51.3 8 48V28Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/></svg>`;
let svgFileIcon = `<svg class="w-5 h-5 inline-block mr-2" viewBox="0 0 64 64" fill="none"><rect x="12" y="8" width="40" height="48" rx="8" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/><line x1="20" y1="20" x2="36" y2="20" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="28" x2="44" y2="28" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="36" x2="40" y2="36" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/></svg>`;

let fileSystem = [
    { type: 'dir', name: 'Documentos' },
    { type: 'dir', name: 'Imagens' },
    { type: 'file', name: 'sys_config.json' },
    { type: 'file', name: 'main.py' },
    { type: 'file', name: 'script.lua' }
];

function renderFilesApp() {
    return `
        <div class="p-4">
            <div class="flex justify-between items-center mb-4">
                <span class="text-xs text-slate-400 uppercase tracking-wider font-bold">Armazenamento / apoOs</span>
                <button onclick="addNewFile()" class="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium">+ Novo Arquivo</button>
            </div>
            <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden" id="fileList">
                ${fileSystem.map(f => `
                    <div class="file-item text-sm flex items-center" onclick="alert('Abrindo ${f.name}')">
                        ${f.type === 'dir' ? svgFolderIcon : svgFileIcon}
                        <span class="flex-1 font-medium text-slate-200">${f.name}</span>
                        <span class="text-xs text-slate-500">${f.type === 'dir' ? 'Pasta' : 'Arquivo'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function addNewFile() {
    const fileName = prompt("Nome do novo arquivo (ex: script.lua):");
    if (fileName) {
        fileSystem.push({ type: 'file', name: fileName });
        openApp('files');
    }
}
