import { useEffect, useState } from 'react'
import { Todo } from '../types/todo'

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

function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  // Fetch tasks
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
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Home
