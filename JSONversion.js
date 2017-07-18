const todosController = require('./controllers/todos_controller')
const Todo = require('./models/todo')
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const url = 'mongodb://localhost:27017/todo-list'
const fs = require('fs')
const uuidGenerator = require('uuid/v4')

// connect to mongo
mongoose.connect(url, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

// setting dynamic view folders
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// without this, u cant read req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Index / Read (GET) Show all
app.get('/todos', function (req, res) {
  let todos = fs.readFileSync('./data.json')
  todos = JSON.parse(todos)
  res.send(todos)
})

// Show / Read (GET) Show one
app.get('/todos/:idx', function (req, res) {
  let todos = fs.readFileSync('./data.json')
  todos = JSON.parse(todos)
  // get array index from url parameter
  let todoIndex = req.params.idx
  console.log(todoIndex)
  var searchedTodo = todos.filter(function (todo) {
  return todo._id === todoIndex
  })
  // render page with data of the specified todo
  res.send(searchedTodo)
})

// Create (POST)
app.post('/todos', function (req, res) {
  let todos = fs.readFileSync('./data.json')
  todos = JSON.parse(todos)
  req.body._id = uuidGenerator()
  todos.push(req.body)
  fs.writeFileSync('./data.json', JSON.stringify(todos))
  res.send(req.body)
})

const port = 4000
app.listen(port, function () {
  console.log('Running Todo at ' + port)
})
