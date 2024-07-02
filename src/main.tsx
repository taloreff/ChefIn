import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { store } from './store/store'
import App from './App.tsx'
import './assets/styles/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <Provider store={store}>
  <Router>
    <App />
  </Router>
  // </Provider>
)
