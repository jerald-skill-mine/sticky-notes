const containerElement = document.getElementById("container");
const btnAdd = document.getElementsByClassName("btn-add")[0];

function getAppStorage() {
    return JSON.parse(localStorage.getItem('notes-app') || "[]");
}

function renderNotes() {
    const notes = getAppStorage();

    containerElement.innerHTML = '';
    containerElement.appendChild(btnAdd);

    notes
        .sort((a, b) => b.id - a.id)
        .forEach(note => {
            const textElement = createTextElement(note.id, note.title, note.content, note.timestamp);
            containerElement.appendChild(textElement);
        });
}

function createTextElement(id, title, content, timestamp) {
    const textElement = document.createElement('div');
    textElement.classList.add('sticky-container');

    const titleInput = document.createElement('input');
    titleInput.classList.add('sticky-title');
    titleInput.type = 'text';
    titleInput.value = title || '';
    titleInput.placeholder = 'Enter title';

    titleInput.addEventListener('input', () => {
        updateNoteTitle(id, titleInput.value);
    });

    const textarea = document.createElement('textarea');
    textarea.classList.add('sticky');
    textarea.value = content || '';
    textarea.placeholder = 'Enter your notes';

    textarea.addEventListener('input', () => {
        updateNoteContent(id, textarea.value);
    });

    const footer = document.createElement('div');
    footer.classList.add('note-footer');
    footer.textContent = timestamp || new Date().toLocaleString();

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        deleteNote(id);
    });

    textElement.appendChild(titleInput);
    textElement.appendChild(textarea);
    textElement.appendChild(footer);
    textElement.appendChild(deleteButton);

    return textElement;
}

function addSticky() {
    const notes = getAppStorage();

    const timestamp = new Date().toLocaleString();
    const notesObject = {
        id: Date.now(),
        title: "",
        content: "",
        timestamp: timestamp
    };

    notes.push(notesObject);
    saveNotes(notes);

    renderNotes();
}

function saveNotes(notes) {
    localStorage.setItem("notes-app", JSON.stringify(notes));
}

function updateNoteTitle(id, newTitle) {
    const notes = getAppStorage();
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
        notes[noteIndex].title = newTitle;
        saveNotes(notes);
    }
}

function updateNoteContent(id, newContent) {
    const notes = getAppStorage();
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
        notes[noteIndex].content = newContent;
        saveNotes(notes);
    }
}

function deleteNote(id) {
    const notes = getAppStorage();
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);

    renderNotes();
}

btnAdd.addEventListener('click', () => addSticky());

renderNotes();
