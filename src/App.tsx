import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSignup } from './pages/LoginSignup';
import { ChefIndex } from './pages/ChefIndex';
import { ProfileIndex } from './pages/ProfileIndex';
import { MyPostsIndex } from './pages/MyPostsIndex';
import { AppHeader } from './cmps/AppHeader';
import { SET_USER } from './store/reducers/user.reducer';
import ChefDetails from './pages/ChefDetails';

interface AppState {
  chefModule: any;
  userModule: {
    user: any;
    users: any[];
  };
  systemModule: any;
}

function App() {
  const user = useSelector((state: AppState) => state.userModule.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedinUser');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (loggedInUser && accessToken && refreshToken) {
      dispatch({ type: SET_USER, user: JSON.parse(loggedInUser) });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <>
      {user ? (
        <>
          <AppHeader />
          <Routes>
            <Route path='/login' element={<Navigate to="/" replace />} />
            <Route path='/' element={<ChefIndex />} />
            <Route path='post/:postId' element={<ChefDetails />} />
            <Route path='/posts' element={<MyPostsIndex />} />
            <Route path='/profile' element={<ProfileIndex />} />
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path='/login' element={<LoginSignup />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </>
  );
}

export default App;
