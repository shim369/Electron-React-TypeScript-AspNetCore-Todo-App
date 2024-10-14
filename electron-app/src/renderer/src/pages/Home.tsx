import { useEffect, useState } from 'react'
import { Todo } from '../../../types/todo'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '@renderer/utils/dateUtils'

function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('category') || '0')

  const navigate = useNavigate()

  const categoryMap: Record<number, string> = {
    1: 'category1',
    2: 'category2',
    3: 'category3'
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

  const filteredTodos = todos.filter((todo) => {
    if (selectedCategory === '0') {
      console.log(setSelectedCategory)
      return true
    }
    console.log(setSelectedCategory)
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

  const handleEdit = (id: number) => {
    navigate(`/task/edit/${id}`)
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
                  <button className="btn btn-secondary" onClick={() => handleEdit(todo.id)}>
                    Edit
                  </button>
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
