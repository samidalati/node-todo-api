const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //this is what configure mongoose to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};