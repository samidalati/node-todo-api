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

    //deletemany
    // db.collection('Todos').deleteMany({text: 'eact launch'})
    // .then((result) => {
    //     console.log(result);
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'delete me3'})
    // .then((result) => {
    //     console.log(result);
    // })
    
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'delete me'})
    // .then((result) => {
    //     console.log(result);
    // })

    // db.collection('Users').deleteMany({name: 'sami'})
    // .then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5ad37813e1024cc42f05a94b')})
    .then((result) => {
        console.log(result);
    })
    
    // client.close();
})