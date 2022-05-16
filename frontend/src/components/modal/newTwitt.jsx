import React, { useEffect, useRef, useState } from 'react';
import classes from './newTwitt.module.css';
import useInput from '../../hooks/useInput';
import useHttp from '../../hooks/useHttp';
import config from '../../appconfig.json';

const NewTwitt = (props) => {
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
  } = useInput((twitt) => twitt.length > 0);

  const formIsInValid = twittHasError && !twittIsValid;

  const { isLoading, error, sendRequest } = useHttp((res) => {
    console.log(res);
  });

  //TODO handle errors

  // const sendTwittRequestConfig = {
  //   url: `${config.api}twitt`,
  //   method: 'POST',
  //   body: { text: twittValue },
  // };

  const handleSendTwitt = async () => {
    let formData = new FormData();
    formData.append('text', twittValue);
    formData.append('image', file);
    console.log(formData);
    // await fetch(`${config.api}twitt`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    //   formData,
    // });

    // console.log(formData);
    // sendRequest({
    //   url: `${config.api}twitt`,
    //   method: 'POST',
    //   formData: formData,
    // });
    // props.handleHide();
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
      {/* <!-- New Twitt Modal --> */}
    </React.Fragment>
  );
};

export default NewTwitt;
