import { useState } from "react"

export const TodoItem = ({ index, todo, onUpdate, onDelete }) => {
  const [newTodo, setNewTodo] = useState(todo)

  const handleUpdate = () => {
    onUpdate(index, newTodo)
  }

  const handleDelete = () => {
    onDelete(index)
  }

  return <li className="todo">
    <h4 className="todo-index">
      {index + 1}
    </h4>

    <input
      className="todo-input"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />

    <button className="todo-update" onClick={handleUpdate}>Update</button>

    <button className="todo-delete" onClick={handleDelete}>Delete</button>
  </li>
}