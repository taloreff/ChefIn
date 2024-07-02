import { Route, Routes } from "react-router-dom";
import { LoginSignup } from "./pages/LoginSignup";
import { ChefIndex } from "./pages/ChefIndex";
import { AppHeader } from "./cmps/AppHeader";

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <AppHeader />
              <ChefIndex />
            </>
          }
        />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
    </>
  )
}

export default App;