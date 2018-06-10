const _           = require('lodash');
const express     = require('express');
const bodyParser  = require('body-parser');
require('./config/config.js');

var {mongoose}  = require('./db/mongoose');
var {Todo}      = require('./models/todo');
var {User}      = require('./models/users');

const {ObjectID}    =   require('mongodb');


const port = process.env.PORT || 3000; // process.env.PORT  for heroku 

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

app.delete('/todos/:id', (req, res) => {
    // res.send(req.params);
    var id = req.params.id;
    //validate id
    if(!ObjectID.isValid(id)){
        console.log("Invaild ID")
        // if not vaild then 404 and empty body
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            // if no todo, send back 404 with empty body
            return res.status(404).send();
        }
        // if todo, send it back
        res.send({todo});
    }).catch((e) => {
        //400 - and send empty body back
        res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    // res.send(req.params);
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    //validate id
    if(!ObjectID.isValid(id)){
        console.log("Invaild ID")
        // if not vaild then 404 and empty body
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            // if no todo, send back 404 with empty body
            return res.status(404).send();
        }
        // if todo, send it back
        res.send({todo});
    }).catch((e) => {
        //400 - and send empty body back
        res.status(400).send();
    })
});

app.post('/users', (req, res) => {
    // console.log(req.body);
    var body = _.pick(req.body, ['email', 'password']);
    
    var user = new User({
        email: body.email,
        password: body.password
    });

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});


app.listen(port, () => {
    console.log('Listening on port: ', port);
});

module.exports = {
    app
};