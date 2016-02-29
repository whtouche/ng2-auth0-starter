var _ = require('lodash');
var Todo = require('../models/todo.js');

module.exports = function (app) {

    // Create
    app.post('/api/todo', function (req, res) {
        var newTodo = new Todo(req.body);
        newTodo.save(function (err) {
            if (err) {
                res.json({ info: 'error during todo create', error: err });
            };
            res.json({ info: 'todo created successfully' });
        });
    });

    // Read
    app.get('/api/todo', function (req, res) {
        Todo.find(function (err, todos) {
            if (err) {
                res.json({ info: 'error during find todos', error: err });
            };
            res.json({ info: 'todos found successfully', data: todos });
        });
    });

    app.get('/api/todo/:id', function (req, res) {
        Todo.findById(req.params.id, function (err, todo) {
            if (err) {
                res.json({ info: 'error during find todo', error: err });
            };
            if (todo) {
                res.json({ info: 'todo found successfully', data: todo });
            } else {
                res.json({ info: 'todo not found' });
            }
        });
    });

    // Update
    app.put('/api/todo/:id', function (req, res) {
        Todo.findById(req.params.id, function (err, todo) {
            if (err) {
                res.json({ info: 'error during find todo', error: err });
            };
            if (todo) {
                _.merge(todo, req.body);
                todo.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during todo update', error: err });
                    };
                    res.json({ info: 'todo updated successfully' });
                });
            } else {
                res.json({ info: 'todo not found' });
            }

        });
    });

    // Delete
    app.delete('/api/todo/:id', function (req, res) {
        Todo.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove todo', error: err });
            };
            res.json({ info: 'todo removed successfully' });
        });
    });


};