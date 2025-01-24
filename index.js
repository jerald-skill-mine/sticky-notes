const containerElement = document.getElementById("container");
const btnAdd = document.getElementsByClassName("btn-add")[0];

// Retrieve saved notes from localStorage
function getAppStorage() {
    return JSON.parse(localStorage.getItem('notes-app') || "[]");
}

// Load existing notes from localStorage and render them
getAppStorage().forEach(element => {
    const textElement = createTextElement(element.id, element.content);
    containerElement.insertBefore(textElement, btnAdd);
});

// Create a new textarea element for a note, including a delete button
function createTextElement(id, content) {
    const textElement = document.createElement('div');
    textElement.classList.add('sticky-container');

    const textarea = document.createElement('textarea');
    textarea.classList.add('sticky');
    textarea.value = content;  // Set the content
    textarea.placeholder = 'Enter your notes';

    // Add event listener to save content when the user types
    textarea.addEventListener('input', () => {
        updateNoteContent(id, textarea.value);
    });

    // Create the delete button for the note
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.textContent = 'Delete';

    // Add event listener to handle deleting the note
    deleteButton.addEventListener('click', () => {
        deleteNote(id, textElement);
    });

    // Append the textarea and delete button to the note container
    textElement.appendChild(textarea);
    textElement.appendChild(deleteButton);

    return textElement;
}

// Add a new sticky note to the container and update localStorage
function addSticky() {
    const notes = getAppStorage();

    // Create a new note with a unique ID using Date.now() and empty content
    const notesObject = {
        id: Date.now(),  // Use timestamp for a unique ID
        content: ""      // Start with empty content
    };

    const textElement = createTextElement(notesObject.id, notesObject.content);
    containerElement.insertBefore(textElement, btnAdd);

    // Focus on the newly added note so the user can start typing
    const textarea = textElement.querySelector('textarea');
    textarea.focus();

    // Add the new note to the array and update localStorage
    notes.push(notesObject);
    saveNotes(notes);
}

// Save all notes to localStorage
function saveNotes(notes) {
    localStorage.setItem("notes-app", JSON.stringify(notes));
}

// Update content of a note in localStorage when it is edited
function updateNoteContent(id, newContent) {
    const notes = getAppStorage();
    const noteIndex = notes.findIndex(note => note.id === id);
    
    if (noteIndex !== -1) {
        notes[noteIndex].content = newContent;
        saveNotes(notes); // Save the updated notes to localStorage
    }
}

// Delete a note from the container and localStorage
function deleteNote(id, noteElement) {
    // Remove the note from the UI
    noteElement.remove();

    // Remove the note from the saved notes array
    const notes = getAppStorage();
    const updatedNotes = notes.filter(note => note.id !== id);

    // Save the updated notes array to localStorage
    saveNotes(updatedNotes);
}

// Event listener to add a new sticky note when the button is clicked
btnAdd.addEventListener('click', () => addSticky());
