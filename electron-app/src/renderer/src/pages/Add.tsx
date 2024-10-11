import { Todo } from '../types/todo'
import { useState } from 'react'

function Add() {
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    category: 1,
    title: '',
    detail: '',
    url: '',
    deadline: new Date()
  })

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

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
      setNewTodo({ id: 0, title: '', detail: '', url: '', deadline: new Date(), category: 1 })
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <>
      <main>
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
                value={formatDate(newTodo.deadline)}
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
    </>
  )
}

export default Add
