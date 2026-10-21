function renderNotepadApp() {
    const savedNote = localStorage.getItem('apo_note') || 'Anotações rápidas do apoOs...';
    return `
        <div class="flex flex-col h-full p-4">
            <textarea id="noteArea" oninput="localStorage.setItem('apo_note', this.value)" class="flex-1 bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-white text-sm outline-none resize-none">${savedNote}</textarea>
        </div>
    `;
}
