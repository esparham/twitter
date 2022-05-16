import React from 'react';
import './App.css';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import { useSelector } from 'react-redux';
import Register from './components/register/register';

function App() {
  const isLogedIn = useSelector((state) => state.user.isLogedIn);

  return (
    <Routes>
      <Route
        path="/home"
        element={isLogedIn ? <Home /> : <Navigate to="/login" replace />}
      ></Route>
      <Route
        path="/profile"
        element={isLogedIn ? <Profile /> : <Navigate to="/login" replace />}
      ></Route>
      <Route
        path="/login"
        element={!isLogedIn ? <Login /> : <Navigate to="/home" replace />}
      ></Route>
      {/* <Route
        path="/logout"
        element={isLogedIn ? <Logout /> : <Navigate to="/login" replace />}
      ></Route> */}
      <Route
        path="/register"
        element={!isLogedIn ? <Register /> : <Navigate to="/" replace />}
      ></Route>
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}

export default App;
