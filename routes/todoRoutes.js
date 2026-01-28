const express = require('express');
const router = express.Router();
const { 
  getTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes in this file
router.use(protect);

// Routes mapped to /api/todos
router.route('/')
  .get(getTodos)
  .post(createTodo);

router.route('/:id')
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;