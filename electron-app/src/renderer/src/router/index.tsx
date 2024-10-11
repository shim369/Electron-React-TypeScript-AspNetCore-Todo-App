import { Routes, Route } from 'react-router-dom'
import Add from '../pages/Add'
import Home from '../pages/Home'

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/add" element={<Add />} />
    </Routes>
  )
}

export default MyRouter
