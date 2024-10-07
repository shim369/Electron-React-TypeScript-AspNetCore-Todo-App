import Versions from './components/Versions'
import Header from './components/Header'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6 bg-white mt-6">
        <table className="min-w-full bg-white border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Detail</th>
              <th className="py-3 px-6 text-left">URL</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
        </table>
      </main>
      <Versions></Versions>
    </>
  )
}

export default App
