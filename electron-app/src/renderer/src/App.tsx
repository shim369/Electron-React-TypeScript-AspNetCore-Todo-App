import Header from './components/Header'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import { Todo } from './types/todo'

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

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  // タスクの取得
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
      <Header />
      <main className="max-w-4xl mx-auto p-6 bg-white mt-6">
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Detail</th>
              <th className="py-3 px-6 text-left">URL</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6">{todo.id}</td>
                <td className="py-3 px-6">{categoryMap[todo.category]}</td>
                <td className="py-3 px-6">{todo.title}</td>
                <td className="py-3 px-6">{todo.detail}</td>
                <td className="py-3 px-6">
                  <a href={todo.url} target="_blank" rel="noopener noreferrer">
                    {todo.url}
                  </a>
                </td>
                <td className="py-3 px-6">{formatDate(todo.deadline)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  )
}

export default App
