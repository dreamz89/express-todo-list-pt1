const Todo = require('./models/todo')
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const url = 'mongodb://localhost:27017/todo-list'

// connect to mongo
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () { // resolve callback
    console.log('connected successfully')
  },
  function (err) { // reject callback
    console.log('failed to connect')
    console.log(err)
  }
)
mongoose.Promise = global.Promise

// setting dynamic view folders
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public')) // public is referring to directory in the root folder, for css
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ // without this, u cant read req.body
  extended: true
}))

const todosRoute = require('./routes/todos_route') // to put all requests in another file
app.use('/todos', todosRoute) // everything that starts with /todos

const port = 4000
app.listen(port, function () {
  console.log('Running Todo at ' + port)
})
