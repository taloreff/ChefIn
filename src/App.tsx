import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { LoginSignup } from "./pages/LoginSignup";
import { ChefIndex } from "./pages/ChefIndex";
import { AppHeader } from "./cmps/AppHeader";

function App() {
  const user = useSelector((state: any) => state.userModule.user)

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/' element={user ? (
          <>
            <AppHeader />
            <ChefIndex />
          </>
        ) : (
          <Navigate to="/login" replace />
        )} />
      </Routes>
    </Router>
  )
}

export default App;
