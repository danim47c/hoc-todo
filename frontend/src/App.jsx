import { useEffect, useState } from "react"
import { TodoItem } from "./components/TodoItem"
import { api } from "./utils/api"

function App() {
  const [todos, setTodos] = useState(undefined)

  useEffect(() => {
    api.get("/todos")
      .then(({ data }) => {
        setTodos(data)
      })
  }, [])

  const [newTodo, setNewTodo] = useState("")

  const handleCreate = () => {
    // const newTodos = Array.from(todos)

    // newTodos.push(newTodo)

    api.post("/todos", {
      content: newTodo,
    }).then(({ data }) => {
      setTodos([...todos, data])
      setNewTodo("")
    })
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

    api.put(`/todos/${todos[index]._id}`, {
      content: newTodo
    }).then(({ data }) => {
      setTodos(todos.map((todo, i) => i === index ? data : todo))
    })
  }

  const handleDelete = (index) => {
    // const newTodos = Array.from(todos)

    // newTodos.splice(index, 1)

    api.delete(`/todos/${todos[index]._id}`)
      .then(() => {
        setTodos(todos.filter((todo, i) => i !== index))
      })
  }

  return (
    <div className="app">
      <h1 className="title">Todo List</h1>

      <ul className="todolist">
        {
          todos?.map((todo, index) => (
            <TodoItem
              key={`todo-${todo._id}`}
              index={index}
              todo={todo.content}
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
