import Versions from './components/Versions'
import Header from './components/Header'
import { useEffect, useState } from 'react'
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

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({
    title: '',
    detail: '',
    url: '',
    deadline: '',
    category: 1
  })

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

  // フォームの変更ハンドラー
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewTodo((prev) => ({ ...prev, [name]: value }))
  }

  // フォームの送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5266/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      })
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      console.log('Todo added:', data)
      setTodos([...todos, data])
      setNewTodo({ title: '', detail: '', url: '', deadline: '', category: 1 })
    } catch (error) {
      console.error('Error:', error)
    }
  }

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

        <section id="addTodo">
          <h2 className="text-xl mb-4">Add a New Todo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={newTodo.title}
                onChange={handleInputChange}
                className="border"
              />
            </div>
            <div>
              <label htmlFor="detail">Detail</label>
              <textarea
                id="detail"
                name="detail"
                value={newTodo.detail}
                onChange={handleInputChange}
                className="border"
              ></textarea>
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <input
                id="url"
                name="url"
                value={newTodo.url}
                onChange={handleInputChange}
                className="border"
              />
            </div>
            <div>
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={newTodo.deadline}
                onChange={handleInputChange}
                className="border"
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={newTodo.category}
                onChange={handleInputChange}
                className="border"
              >
                <option value="1">Category1</option>
                <option value="2">Category2</option>
                <option value="3">Category3</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Add Todo
            </button>
          </form>
        </section>
      </main>
      <Versions></Versions>
    </>
  )
}

export default App
