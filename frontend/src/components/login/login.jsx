import React, { useEffect, useCallback } from 'react';
import useInput from '../../hooks/useInput';
import useHttp from '../../hooks/useHttp';
import config from '../../appconfig.json';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import classes from './login.module.css';
import Spinner from '../ui/Spinner/spinner';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput((email) => email.includes('@'));

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordValueChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
  } = useInput((password) => password.length > 7);

  const formIsValid = emailIsValid && passwordIsValid;

  function setTokenAndNavigate(data) {
    localStorage.setItem('token', data.token);
    dispatch(userActions.setUserLogin(data.token));
    navigate('/');
  }

  const { isLoading, error, sendRequest } = useHttp(setTokenAndNavigate);

  //TODO handle errors

  const loginRequestConfig = {
    url: `${config.api}user/login`,
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: { email: emailValue, password: passwordValue },
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await sendRequest(loginRequestConfig);
  };

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      const dateNow = Date.now() / 1000;
      if (decodedToken.payload.exp < dateNow) {
        localStorage.removeItem('token');
        dispatch(userActions.setUserLogout());
      } else {
        dispatch(userActions.setUserLogin(token));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <div className={classes.container}>
      <i className="fa-brands fa-twitter"></i>
      <h1>Twitter</h1>
      <h2>Login</h2>

      <div className={classes.form}>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            className={emailHasError ? classes.error : classes.valid}
            type="email"
            id="email"
            autoComplete="email"
            onBlur={emailInputBlurHandler}
            value={emailValue}
            onChange={emailValueChangeHandler}
          />
          <label htmlFor="email">Password</label>
          <input
            className={passwordHasError ? classes.error : classes.valid}
            type="password"
            id="password"
            autoComplete="password"
            onBlur={passwordInputBlurHandler}
            value={passwordValue}
            onChange={passwordValueChangeHandler}
          />
          <button disabled={!formIsValid}>
            {isLoading ? <Spinner /> : 'Login'}
          </button>
        </form>
        {/* TODO Change links*/}
        <a href="">Forgot password?</a>

        <Link to="/register">Do not have an account?</Link>
      </div>
    </div>
  );
};

export default Login;
