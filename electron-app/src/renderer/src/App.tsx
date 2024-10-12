import MyRouter from './router/index'
import Header from './components/Header'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Header />
      <main className="bg-white p-4">
        <MyRouter />
      </main>
      <Footer />
    </>
  )
}

export default App
