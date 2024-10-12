import { Routes, Route } from 'react-router-dom'
import Settings from '@renderer/pages/Settings'
import Add from '@renderer/pages/Add'
import Home from '@renderer/pages/Home'

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/add" element={<Add />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default MyRouter
