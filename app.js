// For testing, split app.js from server.js
const express = require("express");
const bodyParser = require("body-parser");
//
const { mongoose } = require("./db/mongoose");
const Todo = require("./models/todo");


var app = express();
// middleware
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post('/todos', (req, res)=>{
  var todo = new Todo({
    text: req.body.text
  });
  console.log(req.body.text);
  todo.save().then((doc)=>{
    res.send(doc);
  }, (err)=>{
    res.status(400).send(err);
  })
})

module.exports = app;
