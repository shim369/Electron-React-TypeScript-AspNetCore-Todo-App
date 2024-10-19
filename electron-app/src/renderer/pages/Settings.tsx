import PageTitle from '@renderer/components/PageTitle'
import { useEffect, useState } from 'react'

const Settings = () => {
  const [font, setFont] = useState(localStorage.getItem('font') || 'normal')

  useEffect(() => {
    localStorage.setItem('font', font)

    document.body.classList.remove('font-small', 'font-normal', 'font-big')
    if (font === 'small') {
      document.body.classList.add('font-small')
    } else if (font === 'normal') {
      document.body.classList.add('font-normal')
    } else if (font === 'big') {
      document.body.classList.add('font-big')
    }
  }, [font])

  const handleFontChange = (event) => {
    setFont(event.target.value)
  }

  return (
    <>
      <section id="settings">
        <PageTitle title="Settings" />
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
