function executeGSearch() {
  const query = document.getElementById('g-search-input').value;
  const frame = document.getElementById('google-frame');
  if (query.trim() !== '') {
    frame.src = `https://www.google.com/search?igu=1&q=${encodeURIComponent(query)}`;
  } else {
    frame.src = 'https://www.google.com/search?igu=1';
  }
}
function handleGSearch(e) { if (e.key === 'Enter') executeGSearch(); }
