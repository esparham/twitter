import React, { useEffect, useCallback, useState } from 'react';
import useInput from '../../hooks/useInput';
import ReactDom from 'react-dom';
import useHttp from '../../hooks/useHttp';
import config from '../../appconfig.json';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import classes from './login.module.css';
import Spinner from '../ui/Spinner/spinner';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Message from '../modal/message';

const Login = () => {
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (error !== null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [error]);

  const loginRequestConfig = {
    url: `${config.api}user/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
  const modalRoot = document.getElementById('modal');

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Message
          header="Error!"
          text={error && error.message}
          show={showModal}
          buttons={[
            {
              text: 'Retry',
              type: 'success',
              action: () => {
                setShowModal(false);
              },
            },
          ]}
        />,
        modalRoot
      )}

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
          <Link to="/forgotPassword">Forgot password?</Link>
          <Link to="/register">Do not have an account?</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
