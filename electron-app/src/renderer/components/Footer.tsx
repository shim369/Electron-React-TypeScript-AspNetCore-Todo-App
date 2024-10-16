import Versions from './Versions'

function Footer(): JSX.Element {
  return (
    <footer className="text-center p-4">
      <Versions />
      <small>Electron Todo App</small>
    </footer>
  )
}

export default Footer
