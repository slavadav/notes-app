import { createNote, loadNotes } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './veiews'

renderNotes()

document.querySelector('#sort-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#create-note').addEventListener('click', function(e) {
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        loadNotes()
        renderNotes()
    }
})

// document.querySelector('#delete-all').addEventListener('click', function(e) {
//     notes = []
//     localStorage.removeItem('notes')
//     renderNotes(notes, filters)
// })


