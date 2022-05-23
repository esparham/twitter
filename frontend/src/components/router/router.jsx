import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../home/home';
import Login from '../login/login';
import Register from '../register/register';
import Profile from '../profile/profile';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import jwt from 'jsonwebtoken';
import { useLayoutEffect } from 'react';
import Logout from '../logout/logout';

const Router = () => {
  const isLogedIn = localStorage.getItem('token');
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      const dateNow = Date.now() / 1000;
      if (decodedToken === null) {
        console.log('null');
        localStorage.clear();
        dispatch(userActions.setUserLogout());
        window.location.pathname = '/';
      } else if (decodedToken.payload.exp < dateNow) {
        localStorage.clear();
        dispatch(userActions.setUserLogout());
      } else {
        dispatch(userActions.setUserLogin());
      }
    }
  }, [location, dispatch]);

  return (
    <Routes>
      <Route
        path="/user/:id"
        element={isLogedIn ? <Profile /> : <Navigate to="/login" replace />}
      ></Route>
      <Route
        path="/profile"
        element={isLogedIn ? <Profile /> : <Navigate to="/login" replace />}
      ></Route>
      <Route
        path="/login"
        element={!isLogedIn ? <Login /> : <Navigate to="/home" replace />}
      ></Route>
      <Route
        path="/register"
        element={!isLogedIn ? <Register /> : <Navigate to="/" replace />}
      ></Route>
      <Route
        path="/home"
        element={isLogedIn ? <Home /> : <Navigate to="/login" replace />}
      ></Route>
      <Route
        path="/logout"
        element={isLogedIn ? <Logout /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/"
        element={!isLogedIn ? <Navigate to="/login" replace /> : <Home />}
      ></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default Router;
