const fs = require('fs');
const express = require('express');
const { get } = require('http');
const path = require('path')
const dbJson = require('./db/db.json')
const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


app.get('/notes', (req, res) => {
    // return notes.html
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
    // return index.html
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/api/notes', (req, res) => {
    // read the `db.json` file and return all saved notes as JSON
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        console.log(data)
        
     })
         

 })



app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title: req.body.title,
      text: req.body.text,
    };

    dbJson.push(newNote);
    const note = JSON.stringify(dbJson);

    fs.writeFileSync(`./db/db.json`, note, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note has been written to JSON file`
          )
    );
    const response = {
        body: newNote
    }
}

});


app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);