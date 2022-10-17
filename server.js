const express = require('express');
const app = express();

const PORT = 3001

const fs = require('fs');

const htmlRoutes = require('./routes/htmlRoute');
const noteRoutes = require('./routes/noteRoute');



app.use(express.static('public'));
app.use(express.static('db'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api', noteRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => console.log(`now listening at http://localhost:${PORT}`));
