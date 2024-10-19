import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '@renderer/utils/dateUtils'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import PageTitle from '@renderer/components/PageTitle'

ChartJS.register(ArcElement, Tooltip, Legend)

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('category') || '0')
  // const [category, setCategory] = useState(localStorage.getItem('category') || '0')

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

  const filteredTodos = todos.filter((todo) => {
    if (selectedCategory === '0') {
      console.log(setSelectedCategory)
      return true
    }
    console.log(setSelectedCategory)
    return todo.category === parseInt(selectedCategory, 10)
  })

  const ascTimeSort = (a: Date, b: Date) => {
    return a > b ? 1 : -1
  }

  filteredTodos.sort((a, b) => ascTimeSort(a.deadline, b.deadline))

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5266/tasks/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete the task')

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleEdit = (id: number) => {
    navigate(`/task/edit/${id}`)
  }

  const statusCounts = todos.reduce(
    (acc, todo) => {
      acc[todo.status] += 1
      return acc
    },
    { 0: 0, 1: 0, 2: 0 }
  )

  const data = {
    labels: ['Incomplete', 'Working', 'Complete'],
    datasets: [
      {
        label: 'Task Status',
        data: [statusCounts[0], statusCounts[1], statusCounts[2]],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
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
            <PageTitle title="Sort tasks" />
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
