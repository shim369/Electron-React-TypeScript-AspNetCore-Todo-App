function Header(): JSX.Element {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-200">
      <h1 className="text-2xl font-bold">Electron Todo App</h1>
      <nav>
        <a href="" className="mr-4">
          Home
        </a>
        <a href="">Add Todo</a>
      </nav>
    </header>
  )
}

export default Header
