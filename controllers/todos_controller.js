const Todo = require('../models/todo')

function create (params) {
  Todo.create(params, function (err, todo) {
    if (err) {
      console.log(err)
      return
    }
    console.log(todo)
  })
}

function list (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      console.log(err)
      return
    }
    res.render('todos/index', {
      allTodos: todos
    })
  })
}

function show (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return console.log(err)
    res.send(todo)
  })
}

function update (id, params) {
  Todo.findOneAndUpdate({ _id: id }, params, function (err, todo) {
    if (err) console.log(err)
    console.log(todo)
  })
}

// this is a function that changes only the completed property
function onDone (req, res) {
  var qObj = {_id: req.params.id}
  var updateObj = {completed: true}
  Todo.findOneAndUpdate(qObj, updateObj, function (err, updatedTodo) {
    if (err) console.log(err)
    res.redirect('/todos')
  })
}

function destroy (req, res) {
  Todo.findOneAndRemove({_id: req.params.id }, function (err) {
    if (err) console.log(err)
    res.redirect('/todos')
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  onDone,
  destroy
}
