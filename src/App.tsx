import { Route, Routes, Navigate } from "react-router-dom";
import { LoginSignup } from "./pages/LoginSignup";
import { ChefIndex } from "./pages/ChefIndex";
import { AppHeader } from "./cmps/AppHeader";
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state: any) => state.userModule.user);

  return (
    <>
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
    </>
  );
}

export default App;
