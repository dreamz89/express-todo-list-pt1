const express = require('express') // borrow express function, but not running express
const todosController = require('../controllers/todos_controller')
const router = express.Router()

router.get('/', todosController.list)
router.get('/:id', todosController.show)

router.post('/', function (req, res) {
  res.send('create new todo')
})

router.put('/:id', todosController.onDone)
router.delete('/:id', todosController.destroy)

module.exports = router
