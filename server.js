const express = require('express')
const path = require('path')
const app = express()
const PORT = 3001
const data = require('./db/db.json')
const fs = require('fs')
//generates a random id
const { v4: uuidv4 } = require('uuid');


app.get('/api/db', (req, res) => res.json(data))

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.get('/api/notes', (req, res) => {
  res.json(`${req.method} test`)
})

app.post('/api/notes', (req, res) => {
  res.json(`${req.method} has been posted!`)

  const { title, text } = req.body
  console.log(title, text)
  
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4()
    }

   const notes = []
    notes.push(newNote)

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
      } else {
        //convert string into json object
        const parsedNotes = JSON.parse(data)
        parsedNotes.push(newNote)

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          writeErr =>
            writeErr
              ? console.error(writeErr)
              : console.info('successfully saved note!')
      )}
      })
    }
      })



app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.listen(PORT, () => console.log(`now listening at http://localhost:${PORT}`))
