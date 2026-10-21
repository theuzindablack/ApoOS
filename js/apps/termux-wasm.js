// Importação do Xterm.js via CDN para o apoOs
const xtermScript = document.createElement('script');
xtermScript.src = "https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js";
document.head.appendChild(xtermScript);

const xtermCss = document.createElement('link');
xtermCss.rel = "stylesheet";
xtermCss.href = "https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css";
document.head.appendChild(xtermCss);

function renderTermuxApp() {
    return `
        <div class="flex flex-col h-full bg-black p-2">
            <div class="flex justify-between items-center mb-2 px-2 text-xs text-emerald-400 border-b border-slate-800 pb-1">
                <span>apoOs Kernel v1.0 [Wasm Active]</span>
                <span class="text-slate-500">Bash / Linux Environment</span>
            </div>
            <div id="terminal-container" class="flex-1 w-full h-full overflow-hidden rounded-lg"></div>
        </div>
    `;
}

function initTermuxEvents() {
    setTimeout(() => {
        const container = document.getElementById('terminal-container');
        if (!container || typeof Terminal === 'undefined') {
            document.getElementById('terminal-container').innerHTML = '<div class="text-red-400 p-4">Erro ao carregar o motor do terminal. Verifique a conexão.</div>';
            return;
        }

        // Inicializa o terminal real com Xterm.js
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#090d16',
                foreground: '#10b981',
                cursor: '#10b981'
            },
            fontSize: 12,
            fontFamily: 'Fira Code, monospace'
        });

        term.open(container);
        term.writeln('\x1b[1;32mWelcome to apoOs Native Terminal (WebAssembly Powered)\x1b[0m');
        term.write('\r\napo@apoOs:~$ ');

        let currentLine = '';

        term.onData(e => {
            switch (e) {
                case '\r': // Enter
                    term.writeln('');
                    processCommand(currentLine.trim(), term);
                    currentLine = '';
                    term.write('apo@apoOs:~$ ');
                    break;
                case '\u007f': // Backspace (Del)
                    if (currentLine.length > 0) {
                        currentLine = currentLine.slice(0, -1);
                        term.write('\b \b');
                    }
                    break;
                default:
                    if (e >= ' ' && e <= '~') {
                        currentLine += e;
                        term.write(e);
                    }
                    break;
            }
        });
    }, 300);
}

function processCommand(cmd, term) {
    if (!cmd) return;
    const args = cmd.split(' ');
    const main = args[0];

    if (main === 'clear') {
        term.clear();
        return;
    }

    if (main === 'help') {
        term.writeln('Comandos nativos do apoOs Wasm:');
        term.writeln('  uname -a    Exibe informações do Kernel');
        term.writeln('  ls          Lista arquivos do sistema');
        term.writeln('  node        Executa interpretador JS local');
        term.writeln('  clear       Limpa a tela');
        return;
    }

    if (main === 'uname') {
        term.writeln('Linux apoOs-Mobile 6.5.0-wasm-architect x86_64 GNU/Linux');
        return;
    }

    if (main === 'ls') {
        term.writeln('📁 Documentos/   📁 Imagens/   📄 main.py   📄 sys_config.json');
        return;
    }

    try {
        // Se o usuário digitar código JS direto, a API executa de verdade
        const res = eval(cmd);
        term.writeln(String(res));
    } catch (err) {
        term.writeln(`bash: comando ou sintaxe inválida: ${main}`);
    }
    }
