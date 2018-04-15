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

//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5ad370131140e5ad3c5fdb4b')
//     }, {
//         $set: {
//         completed: true,
//         }
//     }, {
//         returnOriginal: false
//     })
//     .then((result) => {
//         console.log(result);
//     })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ad37822f6c3bac4322a58d7')
    },{
        $set: {name: 'Sami'},
        $inc: {age: 3}
    },{
        returnOriginal: false
    })
    .then((result) => {
        console.log(result);
    })
    
    // client.close();
})