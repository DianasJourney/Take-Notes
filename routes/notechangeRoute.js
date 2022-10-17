const express = require('express');
const noteRoute = express.Router();
const fs = require('fs');
//generates random id
const { v4: uuidv4 } = require('uuid');

//gets the notes from our data
noteRoute.get('/db', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
    } else {
      //convert string into json object
      const parsedNotes = JSON.parse(data)
      res.json(parsedNotes)
    }
  })
});


noteRoute.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
    } else {
      //convert string into json object
      const parsedNotes = JSON.parse(data)
      res.json(parsedNotes)
    }
  })
});

//if all params are valid then notes will be posted and save the notes into a json file 
noteRoute.post('/notes', (req, res) => {
  res.json(`${req.method} has been posted!`)

  const { title, text } = req.body
  console.log(title, text)

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    }

    const notes = []
    notes.push(newNote)

    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
      } else {
        //convert string into json object
        const parsedNotes = JSON.parse(data)
        parsedNotes.push(newNote)

        fs.writeFile(
          'db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          writeErr =>
            writeErr
              ? console.error(writeErr)
              : console.info('successfully saved note!')
        )
      }
    })
  }
});

module.exports = noteRoute;
