const {ObjectID}    =   require('mongodb');
const {mongoose}    =   require('./../server/db/mongoose');
const {Todo}        =   require('./../server/models/todo');
const {User}        =   require('./../server/models/users');


var id = '5ad38d3007deadc6da9f2e44'; //5ad3a330ac4165cb7f05d987

if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}

User.findById(id).then((user) => {
    if(!user){
        return console.log("user not found!");
    }
    console.log('user by id: ', user);
}).catch((e) => {
    console.log(e);
})

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if(!todo){
//         return console.log("ID not found!");
//     }
//     console.log('Todo: ', todo);
// }); 

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log("ID not found!");
//     }
//     console.log('Todo by id: ', todo);
// }).catch((e) => {
//     console.log(e);
// })