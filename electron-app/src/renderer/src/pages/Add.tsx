import { Todo } from '../../../types/todo'
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
      <section id="addTodo">
        <h2 className="mb-4">Add Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="detail" className="form-label">
              Detail
            </label>
            <textarea
              id="detail"
              name="detail"
              value={newTodo.detail}
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              URL
            </label>
            <input
              id="url"
              name="url"
              value={newTodo.url}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formatDate(newTodo.deadline)}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newTodo.category}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="1">Category1</option>
              <option value="2">Category2</option>
              <option value="3">Category3</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        </form>
      </section>
    </>
  )
}

export default Add
