import { useEffect, useState } from 'react'

const Settings = () => {
  const [category, setCategory] = useState(localStorage.getItem('category') || '0')
  const [font, setFont] = useState(localStorage.getItem('font') || 'normal')

  useEffect(() => {
    localStorage.setItem('category', category)
    localStorage.setItem('font', font)

    document.body.classList.remove('font-small', 'font-normal', 'font-big')
    if (font === 'small') {
      document.body.classList.add('font-small')
    } else if (font === 'normal') {
      document.body.classList.add('font-normal')
    } else if (font === 'big') {
      document.body.classList.add('font-big')
    }
  }, [category, font])

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleFontChange = (event) => {
    setFont(event.target.value)
  }

  return (
    <>
      <section id="settings">
        <h2 className="mb-4">Settings</h2>
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
        <div className="d-flex justify-content-between align-items-center mt-4">
          <label htmlFor="font" className="form-label">
            Font
          </label>
          <select
            name="font"
            id="font"
            className="form-control w-25"
            value={font}
            onChange={handleFontChange}
          >
            <option value="small">Small</option>
            <option value="normal">Normal</option>
            <option value="big">Big</option>
          </select>
        </div>
      </section>
    </>
  )
}

export default Settings
