const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const test_todos = [{
        _id: new ObjectID(),
        text: 'First test todo'
    }, {
        _id: new ObjectID(),
        text: 'Second test todo',
        comepleted: true,
        comepletedAt: 334
    }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(test_todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            })
    });

    it('should not create todo with invalid data', (done) => {
        var text = ''; //invalid data
        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            })
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${test_todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(test_todos[0].text);
        })
        .end(done);
    });

    it('Should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if non object id', (done) => {
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done);
    });

});


describe('Delete /todos/:id', () => {
    it('Should delete todo doc', (done) => {
        request(app)
        .delete(`/todos/${test_todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(test_todos[0].text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.findById(test_todos[0]._id.toHexString()).then((todo) => {
                // expect(todo.text).toBe(test_todos[1].text);
                expect(todo).toBe(null);
                done();
            }).catch((err) => done(err)
        );
        });
    });

    it('Should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if non object id', (done) => {
        request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done);
    });

});

describe('Update /todos/:id', () => {
    it('Should update todo doc', (done) => {
        var testTodo = {
            text: "test todo text",
            completed: true
        }

        request(app)
        .patch(`/todos/${test_todos[0]._id.toHexString()}`)
        .send(testTodo)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(testTodo.text);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var testTodo = {
            text: "test todo text",
            completed: false
        }

        request(app)
        .patch(`/todos/${test_todos[1]._id.toHexString()}`)
        .send(testTodo)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(testTodo.text);
            expect(res.body.todo.completedAt).toBe(null);
        })
        .end(done);
    });

    it('Should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
        .patch(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if non object id', (done) => {
        request(app)
        .patch(`/todos/123abc`)
        .expect(404)
        .end(done);
    });

});