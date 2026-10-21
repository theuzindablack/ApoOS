// --- TERMUX WEB COMPLETO PARA APO OS ---
let installedPackages = ['python3', 'nodejs', 'git', 'lua', 'bash', 'coreutils'];
let commandHistory = [];
let historyIndex = -1;
let activeEditorFile = null;

function renderTermuxApp() {
    return `
        <div class="flex flex-col h-full bg-black font-mono text-xs p-3 text-emerald-400 select-text">
            <!-- Header do Terminal -->
            <div class="mb-3 text-slate-400 leading-relaxed border-b border-slate-800 pb-2 select-none">
                <span class="text-emerald-400 font-bold text-sm">Termux Web v3.0 (apoOs Kernel v1.0)</span><br>
                <span class="text-slate-500">Desenvolvido para desenvolvimento mobile & web</span><br>
                * Digite <span class="text-yellow-400">help</span> para ver a lista completa de comandos.<br>
                * Teste: <span class="text-cyan-400">python3 -c "print('ApoOS')"</span> ou <span class="text-cyan-400">nano script.py</span>
            </div>

            <!-- Área de Saída de Texto -->
            <div id="termuxOutput" class="flex-1 overflow-y-auto space-y-1 mb-2 font-mono whitespace-pre-wrap"></div>

            <!-- Editor Nano embutido (Escondido por padrão) -->
            <div id="nanoEditor" class="hidden flex-col h-full bg-slate-950 border border-emerald-500/40 p-2 rounded mb-2">
                <div class="flex justify-between items-center text-xs text-yellow-400 border-b border-slate-800 pb-1 mb-2 font-bold">
                    <span id="nanoTitle">GNU nano 7.2 - Arquivo: novo.txt</span>
                    <button onclick="closeNano()" class="text-red-400 text-xs px-2 py-0.5 border border-red-500/40 rounded">[X] Sair</button>
                </div>
                <textarea id="nanoTextarea" class="flex-1 bg-transparent text-emerald-300 font-mono text-xs outline-none resize-none" placeholder="Digite seu código aqui..."></textarea>
                <div class="flex justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                    <button onclick="saveNano()" class="bg-emerald-600/30 text-emerald-300 px-3 py-1 rounded border border-emerald-500/40 font-bold">^O Salvar</button>
                    <button onclick="closeNano()" class="bg-slate-800 text-slate-300 px-3 py-1 rounded">^X Sair</button>
                </div>
            </div>

            <!-- Prompt de Comando -->
            <div id="termuxPromptContainer" class="flex items-center gap-2 border-t border-slate-800 pt-2 select-none">
                <span class="text-emerald-400 font-bold">apo@apoOs:~$</span>
                <input type="text" id="termuxInput" class="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs" placeholder="digite um comando..." autocomplete="off" spellcheck="false" autofocus />
            </div>
        </div>
    `;
}

function initTermuxEvents() {
    const input = document.getElementById('termuxInput');
    if (!input) return;

    // Foco automático ao clicar no terminal
    const output = document.getElementById('termuxOutput');
    if (output) {
        output.parentNode.addEventListener('click', () => input.focus());
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            if (cmd !== '') {
                commandHistory.push(cmd);
                historyIndex = commandHistory.length;
                runTermuxCmd(cmd);
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });
}

function printTermux(text, color = 'text-slate-200') {
    const out = document.getElementById('termuxOutput');
    if (!out) return;
    out.innerHTML += `<div class="${color}">${text}</div>`;
    out.scrollTop = out.scrollHeight;
}

// Interprétador Principal de Comandos
function runTermuxCmd(cmd) {
    printTermux(`apo@apoOs:~$ ${cmd}`, 'text-emerald-400 font-bold');
    
    // Parse de argumentos mantendo strings entre aspas juntas
    const match = cmd.match(/(?:[^\s"]+|"[^"]*")+/g);
    if (!match) return;
    
    const args = match.map(a => a.replace(/^"|"$/g, ''));
    const main = args[0].toLowerCase();

    switch (main) {
        case 'help':
            printTermux(`Comandos disponíveis no Termux Web:`, 'text-yellow-400');
            printTermux(`  pkg install <pacote>  - Instala pacotes (python, node, lua, git, clang, nano)`);
            printTermux(`  pkg list              - Lista os pacotes instalados`);
            printTermux(`  ls                    - Lista os arquivos do sistema`);
            printTermux(`  cat <arquivo>         - Lê o conteúdo de um arquivo`);
            printTermux(`  nano <arquivo>        - Abre/cria arquivo no editor de texto`);
            printTermux(`  touch <arquivo>       - Cria um novo arquivo vazio`);
            printTermux(`  rm <arquivo>          - Remove um arquivo`);
            printTermux(`  python3 -c "código"   - Executa código Python`);
            printTermux(`  node -e "código"      - Executa código JavaScript/Node.js`);
            printTermux(`  clear                 - Limpa a tela do terminal`);
            printTermux(`  whoami / pwd / date   - Informações do sistema`);
            break;

        case 'clear':
            const out = document.getElementById('termuxOutput');
            if (out) out.innerHTML = '';
            break;

        case 'whoami':
            printTermux(`theuzin_da_black (root)`, 'text-cyan-300');
            break;

        case 'pwd':
            printTermux(`/home/apo/storage`, 'text-blue-400');
            break;

        case 'date':
            printTermux(new Date().toString(), 'text-slate-300');
            break;

        case 'ls':
            if (typeof fileSystem !== 'undefined' && Array.isArray(fileSystem)) {
                const filesList = fileSystem.map(f => {
                    return f.type === 'dir' 
                        ? `<span class="text-blue-400 font-bold">📁 ${f.name}/</span>` 
                        : `<span class="text-slate-200">📄 ${f.name}</span>`;
                }).join('   ');
                printTermux(filesList || 'Diretório vazio.');
            } else {
                printTermux(`📁 Documentos/   📁 Imagens/   📄 sys_config.json   📄 main.py`, 'text-blue-400');
            }
            break;

        case 'cat':
            if (!args[1]) {
                printTermux(`Uso: cat <nome_do_arquivo>`, 'text-red-400');
                break;
            }
            const fileName = args[1].replace('📄 ', '').replace('📁 ', '');
            if (typeof fileSystem !== 'undefined') {
                const found = fileSystem.find(f => f.name.replace('📄 ', '') === fileName);
                if (found) {
                    if (found.type === 'dir') {
                        printTermux(`cat: ${fileName}: É um diretório`, 'text-red-400');
                    } else {
                        printTermux(found.content || `[Conteúdo vazio do arquivo ${fileName}]`, 'text-slate-300');
                    }
                } else {
                    printTermux(`cat: ${fileName}: Arquivo não encontrado`, 'text-red-400');
                }
            } else {
                printTermux(`[cat]: Arquivo ${fileName} lido com sucesso.`, 'text-slate-300');
            }
            break;

        case 'touch':
            if (!args[1]) {
                printTermux(`Uso: touch <nome_do_arquivo>`, 'text-red-400');
                break;
            }
            const newName = args[1];
            if (typeof fileSystem !== 'undefined') {
                fileSystem.push({ type: 'file', name: newName, content: '' });
                printTermux(`[+] Arquivo '${newName}' criado com sucesso!`, 'text-emerald-400');
            }
            break;

        case 'rm':
            if (!args[1]) {
                printTermux(`Uso: rm <nome_do_arquivo>`, 'text-red-400');
                break;
            }
            const target = args[1];
            if (typeof fileSystem !== 'undefined') {
                const index = fileSystem.findIndex(f => f.name.replace('📄 ', '') === target);
                if (index !== -1) {
                    fileSystem.splice(index, 1);
                    printTermux(`[-] Arquivo '${target}' removido.`, 'text-yellow-400');
                } else {
                    printTermux(`rm: impossível remover '${target}': Arquivo não encontrado`, 'text-red-400');
                }
            }
            break;

        case 'nano':
            if (!args[1]) {
                printTermux(`Uso: nano <nome_do_arquivo>`, 'text-red-400');
                break;
            }
            openNano(args[1]);
            break;

        case 'pkg':
            if (args[1] === 'install') {
                const pkg = args[2];
                if (!pkg) {
                    printTermux(`Uso: pkg install <pacote>`, 'text-red-400');
                } else if (installedPackages.includes(pkg)) {
                    printTermux(`[pkg] O pacote '${pkg}' já está instalado.`, 'text-yellow-400');
                } else {
                    printTermux(`[+] Conectando aos repositórios do apoOs...`, 'text-slate-400');
                    printTermux(`[+] Baixando ${pkg}-latest-arm64.deb...`, 'text-slate-400');
                    setTimeout(() => {
                        installedPackages.push(pkg);
                        printTermux(`[✓] Pacote '${pkg}' instalado com sucesso!`, 'text-emerald-400');
                    }, 800);
                }
            } else if (args[1] === 'list') {
                printTermux(`Pacotes instalados: ${installedPackages.join(', ')}`, 'text-cyan-300');
            } else {
                printTermux(`Uso: pkg install <pacote> ou pkg list`, 'text-red-400');
            }
            break;

        case 'python3':
        case 'python':
            if (!installedPackages.includes('python3') && !installedPackages.includes('python')) {
                printTermux(`O comando 'python3' não foi encontrado. Instale com: pkg install python3`, 'text-red-400');
                break;
            }
            if (args[1] === '-c') {
                const code = cmd.substring(cmd.indexOf('-c') + 3).trim().replace(/^["']|["']$/g, '');
                try {
                    // Execução JS/Python simulada via eval seguro
                    const result = eval(code);
                    printTermux(result !== undefined ? String(result) : '[Executado sem erros]', 'text-cyan-300');
                } catch (err) {
                    printTermux(`Python Error: ${err.message}`, 'text-red-400');
                }
            } else {
                printTermux(`Python 3.11.4 (apoOs arm64 build)\nDigite: python3 -c "código" para executar.`, 'text-cyan-400');
            }
            break;

        case 'node':
            if (!installedPackages.includes('nodejs')) {
                printTermux(`O comando 'node' não foi encontrado. Instale com: pkg install nodejs`, 'text-red-400');
                break;
            }
            if (args[1] === '-e') {
                const code = cmd.substring(cmd.indexOf('-e') + 3).trim().replace(/^["']|["']$/g, '');
                try {
                    const result = eval(code);
                    printTermux(result !== undefined ? String(result) : '[Executado sem erros]', 'text-green-300');
                } catch (err) {
                    printTermux(`Node.js Error: ${err.message}`, 'text-red-400');
                }
            } else {
                printTermux(`Node.js v20.5.0 (apoOs v8 engine)\nDigite: node -e "código" para executar.`, 'text-green-400');
            }
            break;

        default:
            try {
                // Tenta avaliar como expressão matemática ou JS
                const evalRes = eval(cmd);
                printTermux(String(evalRes), 'text-slate-300');
            } catch {
                printTermux(`Termux: comando não encontrado: ${main}. Digite 'help' para ajuda.`, 'text-red-400');
            }
            break;
    }
}

// --- FUNÇÕES DO EDITOR NANO ---
function openNano(fileName) {
    activeEditorFile = fileName;
    const nanoEditor = document.getElementById('nanoEditor');
    const termuxOutput = document.getElementById('termuxOutput');
    const termuxPrompt = document.getElementById('termuxPromptContainer');
    const nanoTitle = document.getElementById('nanoTitle');
    const nanoArea = document.getElementById('nanoTextarea');

    if (!nanoEditor) return;

    let existingContent = '';
    if (typeof fileSystem !== 'undefined') {
        const found = fileSystem.find(f => f.name.replace('📄 ', '') === fileName);
        if (found) existingContent = found.content || '';
    }

    nanoTitle.innerText = `GNU nano 7.2 - Arquivo: ${fileName}`;
    nanoArea.value = existingContent;

    termuxOutput.classList.add('hidden');
    termuxPrompt.classList.add('hidden');
    nanoEditor.classList.remove('hidden');
    nanoEditor.classList.add('flex');
    nanoArea.focus();
}

function saveNano() {
    if (!activeEditorFile) return;
    const content = document.getElementById('nanoTextarea').value;

    if (typeof fileSystem !== 'undefined') {
        const existing = fileSystem.find(f => f.name.replace('📄 ', '') === activeEditorFile);
        if (existing) {
            existing.content = content;
        } else {
            fileSystem.push({ type: 'file', name: activeEditorFile, content: content });
        }
    }
    alert(`[GNU nano] Arquivo '${activeEditorFile}' salvo com sucesso!`);
}

function closeNano() {
    const nanoEditor = document.getElementById('nanoEditor');
    const termuxOutput = document.getElementById('termuxOutput');
    const termuxPrompt = document.getElementById('termuxPromptContainer');

    if (!nanoEditor) return;

    nanoEditor.classList.remove('flex');
    nanoEditor.classList.add('hidden');
    termuxOutput.classList.remove('hidden');
    termuxPrompt.classList.remove('hidden');

    printTermux(`[GNU nano] Editor fechado.`, 'text-yellow-400');
    activeEditorFile = null;
                }
                    
