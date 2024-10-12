import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Todo } from '../types/todo'
import { formatDate } from '@renderer/utils/dateUtils'

const Edit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [todo, setTodo] = useState<Todo | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDetail, setEditDetail] = useState('')
  const [editUrl, setEditUrl] = useState('')
  const [editDeadline, setEditDeadline] = useState('')
  const [editCategory, setEditCategory] = useState('1')

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const response = await fetch(`http://localhost:5266/tasks/${id}`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setTodo(data)
        setEditTitle(data.title)
        setEditDetail(data.detail)
        setEditUrl(data.url)
        setEditDeadline(formatDate(data.deadline))
        setEditCategory(data.category.toString())
      } catch (error) {
        console.error('Error:', error)
      }
    }
    loadTodo()
  }, [id])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    switch (name) {
      case 'title':
        setEditTitle(value)
        break
      case 'detail':
        setEditDetail(value)
        break
      case 'url':
        setEditUrl(value)
        break
      case 'deadline':
        setEditDeadline(value)
        break
      case 'category':
        setEditCategory(value)
        break
      default:
        break
    }
  }

  const saveEdit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!todo) return

    const updatedTodo = {
      ...todo,
      title: editTitle,
      detail: editDetail,
      url: editUrl,
      deadline: new Date(editDeadline).toISOString(),
      category: editCategory
    }

    try {
      const response = await fetch(`http://localhost:5266/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      })

      if (!response.ok) throw new Error('Failed to update todo')

      navigate('/')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const cancelEdit = () => {
    navigate('/')
  }

  if (!todo) return <div>Loading...</div>

  return (
    <>
      <section id="editTodo">
        <h2 className="text-xl mb-4">Edit Todo</h2>
        <form onSubmit={saveEdit} className="space-y-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={editTitle}
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
              value={editDetail}
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
              value={editUrl}
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
              value={editDeadline}
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
              value={editCategory}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="1">Category1</option>
              <option value="2">Category2</option>
              <option value="3">Category3</option>
            </select>
          </div>
          <button type="submit" className="me-2 btn btn-primary">
            Save
          </button>
          <button type="button" onClick={cancelEdit} className="btn btn-secondary">
            Cancel
          </button>
        </form>
      </section>
    </>
  )
}

export default Edit
