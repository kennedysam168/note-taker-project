const fs = require('fs');
const express = require('express');
const { get } = require('http');







app.get('/notes', (req, res) => {
    // return notes.html
})


app.get('*', (req, res) => {
    // return index.html
})


app.get('/api/notes', (req, res) => {
    // read the `db.json` file and return all saved notes as JSON
})