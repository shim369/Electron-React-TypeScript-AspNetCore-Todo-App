import { useEffect, useState } from 'react'

function Settings() {
  const [category, setCategory] = useState(localStorage.getItem('category') || '0')

  useEffect(() => {
    // categoryが0の場合でもlocalStorageに保存
    localStorage.setItem('category', category)
  }, [category])

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <>
      <section id="settings">
        <h2 className="text-xl mb-4">Settings</h2>
        <div className="d-flex justify-content-between align-items-center">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="form-control w-25"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="0">All</option>
            <option value="1">Category1</option>
            <option value="2">Category2</option>
            <option value="3">Category3</option>
          </select>
        </div>
      </section>
    </>
  )
}

export default Settings
