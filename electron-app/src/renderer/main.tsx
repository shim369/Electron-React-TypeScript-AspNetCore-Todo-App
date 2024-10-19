import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { todoStore } from './store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={todoStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
