var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/users');

const port = 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save()
    .then((doc) => {
        res.send(doc);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
    Todo.find()
    .then((todos) => {
        res.send({todos});
    })
    .catch((err) => {
        res.status(400).send(err);
    });
})

app.listen(port, () => {

});

module.exports = {
    app
};