import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchTodos, updateTodo } from '@renderer/store/todosSlice'
import { AppDispatch, RootState } from '@renderer/store'
import PageTitle from '@renderer/components/PageTitle'

const Edit = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const navigate = useNavigate()

  const [editTodo, setEditTodo] = useState<Todo | null>(null)

  useEffect(() => {
    if (!todos.length) {
      dispatch(fetchTodos())
    } else {
      const todo = todos.find((t) => t.id === Number(id))
      if (todo) {
        setEditTodo(todo)
      }
    }
  }, [todos, dispatch, id])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    if (editTodo) {
      setEditTodo({ ...editTodo, [name]: value })
    }
  }

  const saveEdit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!editTodo) return
    dispatch(updateTodo(editTodo))
    navigate('/')
  }

  return (
    <>
      <section id="editTodo">
        <PageTitle title="Edit Todo" />
        <form onSubmit={saveEdit} className="space-y-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={editTodo?.title || ''}
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
              value={editTodo?.detail || ''}
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
              value={editTodo?.url || ''}
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
              value={
                editTodo?.deadline ? new Date(editTodo.deadline).toISOString().split('T')[0] : ''
              }
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
              value={editTodo?.category || ''}
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
              value={editTodo?.status || ''}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="0">Incomplete</option>
              <option value="1">Working</option>
              <option value="2">Complete</option>
            </select>
          </div>
          <button type="submit" className="me-2 btn btn-primary">
            Save
          </button>
        </form>
      </section>
    </>
  )
}

export default Edit
