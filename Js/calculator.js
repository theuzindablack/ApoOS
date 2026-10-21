let calcVal = "0";

function renderCalcApp() {
    return `
        <div class="flex flex-col h-full justify-end p-6">
            <div class="text-right mb-4">
                <div id="calcDisplay" class="text-4xl font-bold text-white tracking-wider">0</div>
            </div>
            <div class="grid grid-cols-4 gap-3">
                <button onclick="calcClear()" class="bg-slate-800 text-red-400 p-4 rounded-2xl font-bold text-lg">C</button>
                <button onclick="calcPress('/')" class="bg-slate-800 text-blue-400 p-4 rounded-2xl font-bold text-lg">÷</button>
                <button onclick="calcPress('*')" class="bg-slate-800 text-blue-400 p-4 rounded-2xl font-bold text-lg">×</button>
                <button onclick="calcPress('-')" class="bg-slate-800 text-blue-400 p-4 rounded-2xl font-bold text-lg">-</button>
                <button onclick="calcPress('7')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">7</button>
                <button onclick="calcPress('8')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">8</button>
                <button onclick="calcPress('9')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">9</button>
                <button onclick="calcPress('+')" class="bg-slate-800 text-blue-400 p-4 rounded-2xl font-bold text-lg row-span-2">+</button>
                <button onclick="calcPress('4')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">4</button>
                <button onclick="calcPress('5')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">5</button>
                <button onclick="calcPress('6')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">6</button>
                <button onclick="calcPress('1')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">1</button>
                <button onclick="calcPress('2')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">2</button>
                <button onclick="calcPress('3')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">3</button>
                <button onclick="calcEquals()" class="bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg row-span-2">=</button>
                <button onclick="calcPress('0')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg col-span-2">0</button>
                <button onclick="calcPress('.')" class="bg-slate-800/60 text-white p-4 rounded-2xl font-bold text-lg">.</button>
            </div>
        </div>
    `;
}

function calcPress(val) { calcVal = calcVal === "0" ? val : calcVal + val; document.getElementById('calcDisplay').innerText = calcVal; }
function calcClear() { calcVal = "0"; document.getElementById('calcDisplay').innerText = calcVal; }
function calcEquals() { try { calcVal = eval(calcVal).toString(); document.getElementById('calcDisplay').innerText = calcVal; } catch { calcVal = "0"; } }
