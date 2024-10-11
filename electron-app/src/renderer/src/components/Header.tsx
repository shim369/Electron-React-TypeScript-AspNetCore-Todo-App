import { Link } from 'react-router-dom'

function Header(): JSX.Element {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-200">
      <h1 className="text-2xl font-bold">Electron Todo App</h1>
      <nav>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/task/add">Add Todo</Link>
      </nav>
    </header>
  )
}

export default Header
