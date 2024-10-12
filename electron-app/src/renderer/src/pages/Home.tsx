import { useEffect, useState } from 'react'
import { Todo } from '../types/todo'

function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('category') || '0')

  const categoryMap: Record<number, string> = {
    1: 'category1',
    2: 'category2',
    3: 'category3'
  }

  function formatDate(deadline: Date): string {
    const date = new Date(deadline)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch('http://localhost:5266/tasks')
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    loadTodos()
  }, [])

  useEffect(() => {
    const categoryFromStorage = localStorage.getItem('category') || '0'
    setSelectedCategory(categoryFromStorage)
  }, [localStorage.getItem('category')])

  const filteredTodos = todos.filter((todo) => {
    if (selectedCategory === '0') {
      return true
    }
    return todo.category === parseInt(selectedCategory, 10)
  })

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5266/tasks/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete the task')

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <>
      <section id="home">
        <table className="table table-bordered table-hover mb-4">
          <thead>
            <tr className="table-light">
              <th scope="col">Id</th>
              <th scope="col">Category</th>
              <th scope="col">Title</th>
              <th scope="col">Detail</th>
              <th scope="col">URL</th>
              <th scope="col">Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{categoryMap[todo.category]}</td>
                <td>{todo.title}</td>
                <td>{todo.detail}</td>
                <td>
                  <a href={todo.url} target="_blank" rel="noopener noreferrer">
                    {todo.url}
                  </a>
                </td>
                <td>{formatDate(todo.deadline)}</td>
                <td>
                  <button className="btn btn-secondary">Edit</button>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Home
