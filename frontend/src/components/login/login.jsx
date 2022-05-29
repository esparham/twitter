import React, { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import ReactDom from 'react-dom';
import classes from './login.module.css';
import Spinner from '../ui/Spinner/spinner';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../modal/message';
import { login } from '../../services/services';

const Login = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    login(emailValue, passwordValue)
      .then((loginResult) => {
        localStorage.setItem('token', loginResult.token);
        navigate('/home');
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setShowModal(error !== null);
  }, [error]);

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
