import Todo from '../models/todo.model';
import _ from 'lodash';

const create = async (req, res, next) => {
  const todo = new Todo(req.body)
  try {
    await todo.save()
    return res.status(200).json({ message: "Data successfully saved." })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

const list = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos)
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

const getId = async (req, res, next, id) => {
  try {
    let todo = await User.findById(id)
    if (!todo) return res.status(404).json("Task not found!")
    req.profile = todo
    next()
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

const read = (req, res) => {
  return res.json(req.profile)
}

const update = async (req, res, next) => {
  try {
    let todo = req.profile
    todo = _.extend(todo, req.body)
    await todo.save()
    read.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

const remove = async (req, res, next) => {
  try {
    let todo = req.profile
    let deletedTask = await todo.remove()
    res.status(200).json(deletedTask)
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message })
  }
}

export default { create, list, getId, read, update, remove }