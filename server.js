const express = require('express')
const path = require('path')
const app = express()
const PORT = 3001
const data = require('./db/db.json');
const fs = require('fs');

app.get('/api/db', (req, res) => res.json(data));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);



app.get('/api/notes', (req, res) => {
    res.json(`${req.method} test`);
});


app.post('/api/notes', (req, res) => {
    res.json(`${req.method} has been posted!`);
});



app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.listen(PORT, () => console.log(`now listening at http://localhost:${PORT}`));





