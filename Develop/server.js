const express = require("express");
const fs = require("fs");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.use('/api', routes);

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT);
});  