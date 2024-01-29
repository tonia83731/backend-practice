import express from 'express'
const router = express.Router()

import Todo from '../../models/todo.js'

router.post("/", (req, res) => {
  const userId = req.user._id
  const name = req.body.name;
  const type = req.body.type;
  const description = req.body.description
  return Todo.create({ name, type, userId, description })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Todo.findOne({_id, userId})
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
})

router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  const { name, type, description, isDone } = req.body;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name;
      todo.type = type;
      todo.description = description;
      todo.done = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .then((todo) => todo.deleteOne())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

export default router