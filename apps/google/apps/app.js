let calcExpression = '';
function calcInput(val) {
  const display = document.getElementById('calc-display');
  if (display.value === '0' && val !== '.') calcExpression = val;
  else calcExpression += val;
  display.value = calcExpression;
}
function calcClear() { calcExpression = ''; document.getElementById('calc-display').value = '0'; }
function calcCalculate() {
  try {
    const res = eval(calcExpression);
    document.getElementById('calc-display').value = res;
    calcExpression = String(res);
  } catch {
    document.getElementById('calc-display').value = 'Erro';
    calcExpression = '';
  }
}
