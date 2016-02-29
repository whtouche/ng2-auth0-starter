var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    name: String,
    completed: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);