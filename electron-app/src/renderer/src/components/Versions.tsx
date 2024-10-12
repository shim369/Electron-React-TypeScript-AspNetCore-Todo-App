import { useState } from 'react'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="list-unstyled versions d-flex justify-content-center mt-4">
      <li className="electron-version me-4">Electron v{versions.electron}</li>
      <li className="chrome-version me-4">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
