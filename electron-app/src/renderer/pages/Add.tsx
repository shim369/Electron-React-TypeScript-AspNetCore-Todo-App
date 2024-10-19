import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '@renderer/store/todosSlice'
import PageTitle from '@renderer/components/PageTitle'
import { AppDispatch } from '@renderer/store'
import { formatDate } from '@renderer/utils/dateUtils'

const Add = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    status: 0,
    category: 1,
    title: '',
    detail: '',
    url: '',
    deadline: new Date()
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewTodo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTodo(newTodo))
    setNewTodo({
      id: 0,
      status: 0,
      title: '',
      detail: '',
      url: '',
      deadline: new Date(),
      category: 1
    })
  }

  return (
    <>
      <section id="addTodo">
        <PageTitle title="Add Todo" />
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
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newTodo.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="0">Incomplete</option>
              <option value="1">Working</option>
              <option value="2">Complete</option>
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
