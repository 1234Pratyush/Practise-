const todoModel = require("../models/todoModel");

// Render the form to create a new todo
exports.getCreateForm = (req, res) => {
  res.render("create"); // EJS file should be 'create.ejs'
};

// Handle form submission and create new todo
exports.createTodo = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  await todoModel.create({ title, description, dueDate, priority });
  res.redirect("/todos");
};

// Get and render all todos
exports.getTodos = async (req, res) => {
  const todos = await todoModel.find();
  res.render("todos", { todos }); // EJS file should be 'todos.ejs'
};

// Render the edit form for a specific todo
exports.editTodo = async (req, res) => {
  const todoEdit = await todoModel.findById(req.params.id);
  res.render("edit", { todoEdit }); // EJS file should be 'edit.ejs'
};

// Handle update form and update a specific todo
exports.updateTodo = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  await todoModel.findByIdAndUpdate(req.params.id, {
    title,
    description,
    dueDate,
    priority,
  });
  res.redirect("/todos");
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  await todoModel.findByIdAndDelete(req.params.id);
  res.redirect("/todos");
};
