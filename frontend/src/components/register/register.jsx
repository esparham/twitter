import React, { useEffect, useCallback } from 'react';
import useInput from '../../hooks/useInput';
import useHttp from '../../hooks/useHttp';
import config from '../../appconfig.json';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';
import Spinner from '../ui/Spinner/spinner';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Message from '../modal/message';
import { useRef, useState } from 'react';
import ReactDom from 'react-dom';

import classes from './register.module.css';

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pickImageHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      return;
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameValueChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
  } = useInput((firstName) => firstName.trim().length > 0);

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameValueChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
  } = useInput((lastName) => lastName.trim().length > 0);

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

  const formIsValid =
    firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid;

  const { isLoading, error, sendRequest } = useHttp((res) => {});

  useEffect(() => {
    if (error !== null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [error]);
  const modalRoot = document.getElementById('modal');
  //TODO handle errors
  //TODO add user feedback

  const handleRegister = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('firstName', firstNameValue);
    formData.append('lastName', lastNameValue);
    formData.append('email', emailValue);
    formData.append('password', passwordValue);
    formData.append('image', file);

    sendRequest({
      url: `${config.api}user/signup`,
      method: 'POST',
      formData: formData,
    });
  };

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
        <h2>Signup</h2>

        <div className={classes.form}>
          <form onSubmit={handleRegister}>
            <label htmlFor="firstName">First Name</label>
            <input
              className={firstNameHasError ? classes.error : classes.valid}
              type="text"
              id="firstName"
              onBlur={firstNameInputBlurHandler}
              value={firstNameValue}
              onChange={firstNameValueChangeHandler}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              className={lastNameHasError ? classes.error : classes.valid}
              type="text"
              id="lastName"
              onBlur={lastNameInputBlurHandler}
              value={lastNameValue}
              onChange={lastNameValueChangeHandler}
            />

            <label htmlFor="email">Email</label>
            <input
              className={emailHasError ? classes.error : classes.valid}
              type="email"
              id="email"
              onBlur={emailInputBlurHandler}
              value={emailValue}
              onChange={emailValueChangeHandler}
            />
            <label htmlFor="email">Password</label>
            <input
              className={passwordHasError ? classes.error : classes.valid}
              type="password"
              id="password"
              onBlur={passwordInputBlurHandler}
              value={passwordValue}
              onChange={passwordValueChangeHandler}
            />
            <div>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="preview"
                  className={classes.userPhoto}
                />
              )}
            </div>
            <label htmlFor="image">Your photo</label>
            <input
              className={classes.fileInput}
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={pickImageHandler}
              ref={imageRef}
            />
            <button disabled={!formIsValid}>
              {isLoading ? <Spinner /> : 'Signup'}
            </button>
          </form>

          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
