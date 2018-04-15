// const MongoClient   =   require('mongodb').MongoClient;
const {MongoClient, ObjectID}   =   require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log("Unable to connect to mongodb server");
    }
    console.log('Connected to mongosb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({completed: "false"}).toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     if(err){
    //         console.log('Unabe to fetch todos');
    //     }
    // })

    // db.collection('Todos').find().count()
    // .then((count) => {
    //     console.log('Todos count', count);
    // }, (err) => {
    //     if(err){
    //         console.log('Unabe to fetch todos');
    //     }
    // })

    db.collection('Userss').find({name: 'sami'}).toArray()
    .then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch((err) => {
        console.log('Error in findings docs in Users: ', err);
    })
    
    // client.close();
})