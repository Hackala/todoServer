import '../models/todo.model'
import Repository from './repository'

class UnitOfWork {
    static Todo = new Repository('Todo')
}

export default UnitOfWork;