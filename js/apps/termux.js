let installedPackages = ['python3', 'nodejs', 'git', 'lua'];

function renderTermuxApp() {
    return `
        <div class="flex flex-col h-full bg-black font-mono text-xs p-3 text-emerald-400">
            <div class="mb-3 text-slate-400 leading-relaxed">
                <span class="text-emerald-500 font-bold">Welcome to Termux Web v2.4 (apoOs Kernel)</span><br>
                * Packages available: python3, nodejs, lua, git, clang<br>
                * Type <span class="text-yellow-400">help</span> for commands or <span class="text-yellow-400">pkg install &lt;pkg&gt;</span>
            </div>
            <div id="termuxOutput" class="flex-1 overflow-y-auto space-y-1 mb-2"></div>
            <div class="flex items-center gap-2 border-t border-slate-800 pt-2">
                <span class="text-emerald-400 font-bold">~$</span>
                <input type="text" id="termuxInput" class="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs" placeholder="digite um comando..." autofocus />
            </div>
        </div>
    `;
}

function initTermuxEvents() {
    const input = document.getElementById('termuxInput');
    if(!input) return;
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            if (!cmd) return;
            runTermuxCmd(cmd);
            input.value = '';
        }
    });
}

function printTermux(text, color = 'text-slate-200') {
    const out = document.getElementById('termuxOutput');
    if(!out) return;
    out.innerHTML += `<div class="${color}">${text}</div>`;
    out.scrollTop = out.scrollHeight;
}

function runTermuxCmd(cmd) {
    printTermux(`~$ ${cmd}`, 'text-emerald-400 font-bold');
    const args = cmd.split(' ');
    const main = args[0].toLowerCase();

    switch(main) {
        case 'help':
            printTermux(`Comandos disponíveis:`, 'text-yellow-400');
            printTermux(`  pkg install &lt;pacote&gt; - Instala pacotes/linguagens`);
            printTermux(`  pkg list             - Lista pacotes instalados`);
            printTermux(`  python3 -c "&lt;code&gt;" - Executa código Python`);
            printTermux(`  node -e "&lt;code&gt;"    - Executa código JavaScript`);
            printTermux(`  ls / cat / clear     - Comandos de shell`);
            break;
        case 'clear':
            document.getElementById('termuxOutput').innerHTML = '';
            break;
        case 'ls':
            printTermux(`📁 storage/  📄 main.py  📄 app.js  📄 sys_config.json`, 'text-blue-400');
            break;
        case 'pkg':
            if (args[1] === 'install') {
                const pkg = args[2];
                if (!pkg) {
                    printTermux(`Uso: pkg install &lt;nome_do_pacote&gt;`, 'text-red-400');
                } else if (installedPackages.includes(pkg)) {
                    printTermux(`[pkg] Pacote '${pkg}' já está instalado.`, 'text-yellow-400');
                } else {
                    installedPackages.push(pkg);
                    printTermux(`[+] Baixando ${pkg}...`, 'text-slate-400');
                    setTimeout(() => printTermux(`[✓] ${pkg} instalado com sucesso!`, 'text-emerald-400'), 600);
                }
            } else if (args[1] === 'list') {
                printTermux(`Pacotes Instalados: ${installedPackages.join(', ')}`, 'text-slate-300');
            } else {
                printTermux(`Uso: pkg install ou pkg list`, 'text-red-400');
            }
            break;
        case 'python3':
        case 'python':
            if (args[1] === '-c') {
                const code = cmd.substring(cmd.indexOf('-c') + 3).replace(/^["']|["']$/g, '');
                try {
                    printTermux(`[Python3 Output]: ${eval(code)}`, 'text-cyan-300');
                } catch(err) {
                    printTermux(`Python Error: ${err.message}`, 'text-red-400');
                }
            } else {
                printTermux(`Python 3.11.4 (apoOs build)\nDigite: python3 -c "print('Olá Apo')"`, 'text-cyan-400');
            }
            break;
        case 'node':
            if (args[1] === '-e') {
                const code = cmd.substring(cmd.indexOf('-e') + 3).replace(/^["']|["']$/g, '');
                try {
                    printTermux(`[Node.js Output]: ${eval(code)}`, 'text-green-300');
                } catch(err) {
                    printTermux(`Node Error: ${err.message}`, 'text-red-400');
                }
            } else {
                printTermux(`Node.js v20.5.0 (apoOs v8 runtime)`, 'text-green-400');
            }
            break;
        default:
            try {
                const res = eval(cmd);
                printTermux(String(res), 'text-slate-300');
            } catch {
                printTermux(`comando não encontrado: ${main}. Digite 'help'.`, 'text-red-400');
            }
    }
}
