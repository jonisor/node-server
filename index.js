const express = require('express')
const app = express()
const cors = require('cors')

const notesRouter = require('./controllers/notes')

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)

app.get('/', (request, response) => {
    response.send('<h1>Basic REST Api.</h1>')

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})    