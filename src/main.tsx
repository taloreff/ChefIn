import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './assets/styles/main.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='457034665593-ullvul9j63hbbjh5sd6pnj2g56uen50u.apps.googleusercontent.com'>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </GoogleOAuthProvider>

)
