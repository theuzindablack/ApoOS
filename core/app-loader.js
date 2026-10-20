async function launchApp(appName, appPath) {
  const windowBody = document.getElementById('window-body');
  const windowTitle = document.getElementById('window-title');
  
  windowTitle.innerText = appName;
  windowBody.innerHTML = `<div style="padding:20px; color:#94a3b8;">Carregando ${appName}...</div>`;
  
  try {
    const response = await fetch(`apps/${appPath}/index.html`);
    const html = await response.text();
    windowBody.innerHTML = html;
    
    if (!document.getElementById(`css-${appPath}`)) {
      const link = document.createElement('link');
      link.id = `css-${appPath}`;
      link.rel = 'stylesheet';
      link.href = `apps/${appPath}/style.css`;
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = `apps/${appPath}/app.js`;
    document.body.appendChild(script);

  } catch (err) {
    windowBody.innerHTML = `<p style="color:#ef4444; padding:20px;">Erro ao carregar o app.</p>`;
  }

  document.getElementById('window').classList.remove('hidden');
}

function closeApp() {
  document.getElementById('window').classList.add('hidden');
  document.getElementById('window-body').innerHTML = '';
}
