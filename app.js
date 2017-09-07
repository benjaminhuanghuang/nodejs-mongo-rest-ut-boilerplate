// For testing, split app.js from server.js
const express = require('express');

var app = express();

app.get("/", (req, res)=>{
  res.send('Hello world');
});

module.exports = app;