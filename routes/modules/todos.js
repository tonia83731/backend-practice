import express from 'express'
const router = express.Router()

import Todo from '../../models/todo.js'

router.post("/", (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  return Todo.create({ name, type })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', {todo}))
    .catch(error => console.log(error))
})

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, type, description, isDone } = req.body;
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      todo.type = type;
      todo.description = description;
      todo.done = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.deleteOne())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

export default router