const notesRouter = require('express').Router()

let notes = [
    {
        id: 1,
        content: 'First note.',
        important: true
    },
    {
        id: 2,
        content: 'Second note.',
        important: true
    },
    {
        id: 3,
        content: 'Third note.',
        important: false
    }
]

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}

notesRouter.get('/', (request, response) => {
    response.json(notes)
})

notesRouter.get('/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
})

notesRouter.delete('/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

module.exports = notesRouter