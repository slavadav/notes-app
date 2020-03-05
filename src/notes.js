import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

// Expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id,
        title : '',
        body : '',
        createDate : timestamp,
        updateDate : timestamp
    })
    saveNotes()

    return id
}

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

//Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove note from array
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    notes.splice(noteIndex, 1)
    saveNotes()
}

// Sort notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => b.updateDate - a.updateDate)
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => b.createDate - a.createDate)
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (b.title < a.title) {
                return 1
            }
            else if (b.title > a.title) {
                return -1
            } else return 0
        })
    } else return notes
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }
    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updateDate = moment().valueOf()
    }
    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updateDate = moment().valueOf()
    }
    saveNotes()

    return note
}

notes = loadNotes()

export { getNotes, createNote, saveNotes, removeNote, sortNotes, updateNote }