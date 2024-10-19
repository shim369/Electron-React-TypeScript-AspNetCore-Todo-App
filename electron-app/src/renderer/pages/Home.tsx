import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchTodos, deleteTodo, setSelectedCategory } from '@renderer/store/todosSlice'
import PageTitle from '@renderer/components/PageTitle'
import { Pie } from 'react-chartjs-2'
import { formatDate } from '@renderer/utils/dateUtils'
import { AppDispatch, RootState } from '@renderer/store'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { todos, selectedCategory } = useSelector((state: RootState) => state.todos)
  const navigate = useNavigate()

  const categoryMap: Record<number, string> = {
    1: 'category1',
    2: 'category2',
    3: 'category3'
  }

  const statusMap: Record<number, string> = {
    0: 'Incomplete',
    1: 'Working',
    2: 'Complete'
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id))
  }

  const handleEdit = (id: number) => {
    navigate(`/task/edit/${id}`)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(event.target.value))
  }

  const filteredTodos = todos.filter((todo) =>
    selectedCategory === '0' ? true : todo.category === parseInt(selectedCategory, 10)
  )

  const statusCounts = {
    0: filteredTodos.filter((todo) => todo.status === 0).length,
    1: filteredTodos.filter((todo) => todo.status === 1).length,
    2: filteredTodos.filter((todo) => todo.status === 2).length
  }

  const data = {
    labels: ['Incomplete', 'Working', 'Complete'],
    datasets: [
      {
        label: 'Task Status',
        data: [statusCounts[0], statusCounts[1], statusCounts[2]],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  }

  return (
    <>
      <section id="home">
        <div className="d-flex">
          <div className="w-50">
            <PageTitle title="Task Status Distribution" />
            <div className="chart-container">
              <Pie data={data} />
            </div>
          </div>
          <div className="w-50">
            <PageTitle title="Category Selection" />
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-control w-25"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="0">All</option>
                <option value="1">Category1</option>
                <option value="2">Category2</option>
                <option value="3">Category3</option>
              </select>
            </div>
          </div>
        </div>

        <PageTitle title="Task List" />
        <table className="table table-bordered table-hover mb-4">
          <thead>
            <tr className="table-light">
              <th scope="col">Id</th>
              <th scope="col">Status</th>
              <th scope="col">Category</th>
              <th scope="col">Title</th>
              <th scope="col">Detail</th>
              <th scope="col">URL</th>
              <th scope="col">Deadline</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{statusMap[todo.status]}</td>
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
