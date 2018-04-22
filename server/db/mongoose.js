const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //this is what configure mongoose to use promises
mongodb://heroku_mwfpz92l:hruiedv067v6elodi726l0k6rn@ds253889.mlab.com:53889/heroku_mwfpz92l

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};