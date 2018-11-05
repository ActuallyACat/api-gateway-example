const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const database = require('./database.json');
app.use(bodyParser.json());

app.get('/users', function (req, res) {
  res.send(database);
});

app.post('/users', function (req, res) {
  const newUser = Object.assign({}, req.body, {_id: database.length + 1});

  database.push(newUser);

  res.send(database);
});

app.get('/users/:id', function (req, res) {
  res.send(database.find(({_id}) => _id === parseInt(req.params.id, 10)));
});

app.delete('/users/:id', function (req, res) {
  database.splice(parseInt(req.params.id, 10) - 1, 1);

  res.send(database);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));