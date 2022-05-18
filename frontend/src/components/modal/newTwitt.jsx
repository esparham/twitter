import React, { useEffect, useRef, useState } from 'react';
import classes from './newTwitt.module.css';
import useInput from '../../hooks/useInput';
import useHttp from '../../hooks/useHttp';
import config from '../../appconfig.json';
import ReactDom from 'react-dom';
import Message from './message';

const NewTwitt = (props) => {
  const [showModal, setShowModal] = useState(false);
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const {
    value: twittValue,
    hasError: twittHasError,
    isValid: twittIsValid,
    valueChangeHandler: twittValueChangeHandler,
    inputBlurHandler: twittInputBlurHandler,
    reset,
  } = useInput((twitt) => twitt.length > 0);

  const formIsInValid = twittHasError && !twittIsValid;

  const { isLoading, error, sendRequest } = useHttp((res) => console.log(res));

  useEffect(() => {
    if (error !== null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [error]);

  const modalRoot = document.getElementById('modal');

  const handleSendTwitt = async () => {
    let formData = new FormData();
    formData.append('text', twittValue);
    formData.append('image', file);

    sendRequest({
      url: `${config.api}twitt`,
      method: 'POST',
      formData,
    });
    reset();
    setFile(null);
    setPreviewUrl(null);
    imageRef.current.value = null;
    props.handleHide();
  };

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
      <div
        id="new-twitt-modal"
        className={`${classes.newTwittModal} ${
          props.show ? classes.newTwittModal__show : classes.newTwittModal__hide
        }`}
      >
        <div className={classes.newTwittModal_row}>
          <i className="fa-solid fa-arrow-left" onClick={props.handleHide}></i>
          <button disabled={formIsInValid} onClick={handleSendTwitt}>
            Tweet
          </button>
        </div>
        <div className={classes.textArea}>
          <textarea
            name=""
            id=""
            // cols="30"
            // rows="10"
            value={twittValue}
            onChange={twittValueChangeHandler}
            onBlur={twittInputBlurHandler}
            placeholder="Share what's hapening..."
          ></textarea>
          <div className={classes.newTwittModal_row}>
            <input
              className={classes.fileInput}
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={pickImageHandler}
              ref={imageRef}
            />
          </div>
          <div className={classes.newTwitt__photo}>
            {previewUrl && <img src={previewUrl} alt="preview" />}
          </div>
          <div className={classes.newTwittModal_row}>
            {/* <div className="new-twitt-modal_row right"> */}
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
                imageRef.current.value = null;
              }}
            >
              Remove photo
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewTwitt;
