import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { LoginSignup } from './pages/LoginSignup';
import { ChefIndex } from './pages/ChefIndex';
import { AppHeader } from './cmps/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER } from './store/reducers/user.reducer';

interface AppState {
  chefModule: any;
  userModule: {
    user: any;
    users: any[];
  };
  systemModule: any;
}

const App: React.FC = () => {
  const user = useSelector((state: AppState) => state.userModule.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedinUser');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (loggedInUser && accessToken && refreshToken) {
      dispatch({ type: SET_USER, user: JSON.parse(loggedInUser) });
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

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
};

export default App;
