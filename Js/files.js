let fileSystem = [
    { type: 'dir', name: '📁 Documentos', items: ['📄 relatorio_apo.txt', '📄 ideias_projeto.md'] },
    { type: 'dir', name: '📁 Imagens', items: ['📄 wallpaper_apo.png', '📄 avatar.jpg'] },
    { type: 'file', name: '📄 sys_config.json' },
    { type: 'file', name: '📄 main.py' }
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
                    <div class="file-item text-sm" onclick="alert('Abrindo ${f.name}')">
                        <span class="mr-3 text-lg">${f.name.split(' ')[0]}</span>
                        <span class="flex-1 font-medium text-slate-200">${f.name.split(' ').slice(1).join(' ')}</span>
                        <span class="text-xs text-slate-500">${f.type === 'dir' ? 'Pasta' : 'Arquivo'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function addNewFile() {
    const fileName = prompt("Nome do novo arquivo (ex: 📄 script.lua):");
    if (fileName) {
        fileSystem.push({ type: 'file', name: '📄 ' + fileName });
        openApp('files');
    }
}
