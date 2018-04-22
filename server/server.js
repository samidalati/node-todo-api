var express     = require('express');
var bodyParser  = require('body-parser');

var {mongoose}  = require('./db/mongoose');
var {Todo}      = require('./models/todo');
var {User}      = require('./models/users');

const {ObjectID}    =   require('mongodb');


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

app.get('/todos/:id', (req, res) => {
    // res.send(req.params);

    //validate id
    if(!ObjectID.isValid(req.params.id)){
        console.log("Invaild ID")
        // if not vaild then 404 and empty body
        return res.status(404).send();
    }
    
    Todo.findById(req.params.id).then((todo) => {
        if(!todo){
            // if no todo, send back 404 with empty body
            console.log("ID not found!");
            return res.status(404).send();
        }
        //sucess
        console.log('Todo by id: ', todo);
        // if todo, send it back
        res.send({todo});
    }).catch((e) => {
        //400 - and send empty body back
        console.log(e);
        res.status(400).send();
    })
});

app.listen(port, () => {

});

module.exports = {
    app
};