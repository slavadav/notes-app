import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate the DOM structure for the note
const generateNoteDOM = (note) => {
    const noteElem = document.createElement('a')
    const textElem = document.createElement('p')
    const statusElem = document.createElement('p')

    // Setup the link
    noteElem.setAttribute('href', `/edit.html#${note.id}`)
    noteElem.classList.add('list-item')

    // Setup the note title text
    if (note.title.length > 0) {
        textElem.textContent = note.title
    } else textElem.textContent = `Unnamed note`
    textElem.classList.add('list-item__title')
    noteElem.appendChild(textElem)

    // Setup the edit status
    statusElem.textContent = generateLastEdited(note.updateDate)
    statusElem.classList.add('list-item__subtitle')
    noteElem.appendChild(statusElem)
    
    return noteElem;
}

// Render application notes
const renderNotes = () => {
    const notesElem = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesElem.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteElem = generateNoteDOM(note)
            notesElem.appendChild(noteElem)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.innerHTML = 'You have no notes.'
        notesElem.appendChild(emptyMessage)
    } 
}

//Genereate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last update ${moment(timestamp).fromNow()}`
}

const initializeEditpage = (noteId) => {
    const noteTitle = document.querySelector('#note-title')
    const noteBody = document.querySelector('#note-body')
    const dateElem = document.querySelector('#update-from-now')

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) location.assign('/index.html')
    
    noteTitle.value = note.title
    noteBody.value = note.body
    dateElem.textContent = generateLastEdited(note.updateDate)
}

export { renderNotes, generateNoteDOM, generateLastEdited, initializeEditpage }