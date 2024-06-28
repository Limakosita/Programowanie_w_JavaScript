document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes');

    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';
        notes.forEach(note => displayNote(note));
    };

    const saveNote = (note) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNote(note);
    };

    const displayNote = (note) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <small>${new Date(note.date).toLocaleString()}</small>
            <button onclick="deleteNote('${note.id}')">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    };

    const createNote = () => {
        const title = prompt('Enter note title:');
        const content = prompt('Enter note content:');
        const color = prompt('Enter note color:');
        const note = {
            id: Date.now().toString(),
            title,
            content,
            color,
            pinned: false,
            date: new Date().toISOString()
        };
        saveNote(note);
    };

    window.deleteNote = (id) => {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };

    loadNotes();
});
