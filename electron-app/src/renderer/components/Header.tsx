import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="shadow d-flex justify-content-between align-items-center p-4">
      <h1 className="font-bold">
        <Link to="/" className="text-dark text-decoration-none">
          Electron Todo App
        </Link>
      </h1>
      <nav>
        <Link to="/" className="me-4 text-dark text-decoration-none">
          Home
        </Link>
        <Link to="/task/add" className="me-4 text-dark text-decoration-none">
          Add Todo
        </Link>
        <Link to="/settings" className="text-dark text-decoration-none">
          Settings
        </Link>
      </nav>
    </header>
  )
}

export default Header
