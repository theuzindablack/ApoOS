function renderBrowserApp() {
    return `
        <div class="flex flex-col h-full">
            <div class="bg-slate-800 p-3 border-b border-slate-700 flex items-center gap-2">
                <div class="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-200 flex items-center gap-2">
                    <i class="fa-brands fa-google text-blue-400"></i>
                    <input type="text" id="browserInput" value="https://www.google.com" class="bg-transparent w-full outline-none text-white text-xs" />
                </div>
                <button onclick="searchGoogle()" class="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold">Ir</button>
            </div>
            <div class="flex-1 bg-slate-950 flex flex-col items-center justify-center p-6 text-center" id="browserContent">
                <h1 class="text-3xl font-bold text-white mb-2 tracking-tight"><span class="text-blue-500">G</span><span class="text-red-500">o</span><span class="text-yellow-400">o</span><span class="text-blue-500">g</span><span class="text-green-500">l</span><span class="text-red-500">e</span></h1>
                <p class="text-xs text-slate-400 mb-6">Navegador nativo do apoOs</p>
            </div>
        </div>
    `;
}

function searchGoogle() {
    const query = document.getElementById('browserInput').value;
    document.getElementById('browserContent').innerHTML = `
        <div class="p-6 text-left w-full max-w-md">
            <p class="text-xs text-slate-400 mb-4">Resultados para: <strong class="text-white">${query}</strong></p>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-3">
                <span class="text-xs text-blue-400">https://apo.dev › termux</span>
                <h3 class="text-sm font-bold text-blue-300 mt-1">Termux Web no apoOs</h3>
                <p class="text-xs text-slate-400 mt-1">Execute scripts Python, JavaScript e ferramentas de linha de comando direto pelo celular.</p>
            </div>
        </div>
    `;
}
