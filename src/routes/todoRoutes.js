const express = require("express");
const router = express.Router();

const {
  getCreateForm,
  createTodo,
  getTodos,
  editTodo,
  updateTodo,
  deleteTodo,
} = require("../Controllers/todoController");

const requireLogin = require("../middlewares/authMiddlewares");

// Show form to create a new todo
router.get("/create", requireLogin, getCreateForm);

// Handle form submission for new todo
router.post("/create", requireLogin, createTodo);

// View all todos
router.get("/todos", requireLogin, getTodos);

// Edit a specific todo
router.get("/edit/:id", requireLogin, editTodo);

// Update a specific todo
router.post("/update/:id", requireLogin, updateTodo);

// Delete a specific todo
router.post("/delete/:id", requireLogin, deleteTodo);

module.exports = router;
