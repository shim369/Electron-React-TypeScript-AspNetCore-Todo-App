import { Todo } from '../types/todo'
import { useState } from 'react'

function Add() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({
    title: '',
    detail: '',
    url: '',
    deadline: '',
    category: 1
  })

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
  )
}

export default Add
