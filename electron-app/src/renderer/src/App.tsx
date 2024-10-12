import MyRouter from './router/index'
import Header from './components/Header'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.css'

function App() {
  return (
    <>
      <Header />
      <main className="flex-1 p-4 my-3 h-100">
        <MyRouter />
      </main>
      <Footer />
    </>
  )
}

export default App
