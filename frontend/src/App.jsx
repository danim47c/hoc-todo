import { useState } from "react"
import { TodoItem } from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([])

  const [newTodo, setNewTodo] = useState("")

  const handleCreate = () => {
    // const newTodos = Array.from(todos)

    // newTodos.push(newTodo)

    setTodos([...todos, newTodo])
    setNewTodo("")
  }

  const handleUpdate = (index, newTodo) => {
    // const newTodos = []

    // for (let i = 0; i < todos.length; i++) {
    //   if (i === index) {
    //     newTodos.push(newTodo)
    //   } else {
    //     newTodos.push(todos[i])
    //   }
    // }

    setTodos(todos.filter((todo, i) => i === index ? newTodo : todo))
  }

  const handleDelete = (index) => {
    // const newTodos = Array.from(todos)

    // newTodos.splice(index, 1)

    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="app">
      <h1 className="title">Todo List</h1>

      <ul className="todolist">
        {
          todos.map((todo, index) => (
            <TodoItem
              key={`todo-${index}`}
              index={index}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        }
      </ul>

      <form
        className="newtodo"
        onSubmit={(e) => {
          e.preventDefault()

          handleCreate()
        }}
      >
        <input
          className="newtodo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button
          className="newtodo-button"
          type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default App
