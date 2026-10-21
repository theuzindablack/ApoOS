function renderStoreApp() {
    return `
        <div class="p-4 space-y-3">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-2xl text-white">
                <h3 class="font-bold text-base">storeOs</h3>
                <p class="text-xs text-purple-200">Baixe extensões para o Termux e apoOs</p>
            </div>
            <div class="bg-slate-800/60 border border-slate-700/50 p-3 rounded-xl flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-lg border border-slate-700">💻</div>
                    <div>
                        <h4 class="text-xs font-bold text-white">Termux C++ Pack</h4>
                        <p class="text-[10px] text-slate-400">Compilador g++ / clang</p>
                    </div>
                </div>
                <button onclick="alert('Pacote pronto para instalar no Termux!')" class="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium">Baixar</button>
            </div>
        </div>
    `;
}
