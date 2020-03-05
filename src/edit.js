import { loadNotes, updateNote, removeNote } from './notes'
import { generateLastEdited, initializeEditpage } from './veiws'

const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeButton = document.querySelector('#remove-note');
const dateElem = document.querySelector('#update-from-now');
const noteId = location.hash.substring(1);

initializeEditpage(noteId)

//Edit note title
noteTitle.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElem.textContent = generateLastEdited(note.updateDate)
})

//Edit note body
noteBody.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElem.textContent = generateLastEdited(note.updateDate)
})

//Remove note
removeButton.addEventListener('click', () => {
    removeNote(noteId);
    location.assign('/index.html');
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        loadNotes()
        initializeEditrage(noteId)
    }
})