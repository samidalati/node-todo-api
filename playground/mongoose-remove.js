const {ObjectID}    =   require('mongodb');
const {mongoose}    =   require('./../server/db/mongoose');
const {Todo}        =   require('./../server/models/todo');
const {User}        =   require('./../server/models/users');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id: '5adcc71f07a6a3398b7e1fbe'}).then((todo) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove({_id: '5adcc79d616f663a0a6f869c'}).then((todo) => {
    console.log(todo);
});
