import Todo from '../models/todo.model';
import _ from 'lodash';

const create = async (req, res, next) => {
  const todo = new Todo(req.body)
  try {
    await todo.save()
    return res.status(200).json({ message: "Data successfully saved." })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: "Error saving data!" })
  }
}

const list = (req, res) => { }

const getId = (req, res, next, id) => { }

const read = (req, res) => { }

const update = (req, res, next) => { }

const remove = (req, res, next) => { }

export default { create, list, getId, read, update, remove }