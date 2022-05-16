import React, { useEffect, useState } from 'react';
import Footer from '../footer/footer';
import Header from './header/header';
import Twitt from './twitt/twitt';
import ReactDom from 'react-dom';
import NewTwitt from '../modal/newTwitt';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/userSlice';
import classes from './home.module.css';

var isInitial = true;

const Home = () => {
  const [showNewTwittModal, setShowNewTwittModal] = useState(false);

  const dispatch = useDispatch();
  const [blur, setBlur] = useState(false);

  const handleBlur = () => {
    setBlur((prevState) => !prevState);
  };

  useEffect(() => {
    if (isInitial) {
      const token = localStorage.getItem('token');
      dispatch(fetchUserData(token));
      isInitial = false;
    }
  }, [dispatch]);

  const modalRoot = document.getElementById('modal');

  const toggleShowModal = () => {
    setShowNewTwittModal((prev) => !prev);
  };

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <NewTwitt show={showNewTwittModal} handleHide={toggleShowModal} />,
        modalRoot
      )}
      <div
        className={
          blur ? `${classes.container} ${classes.blur}` : classes.container
        }
        id="all"
      >
        <Header handleBlur={handleBlur} />
        <section className={classes.body}>
          {/* Twitt */}
          <Twitt />
          <Twitt />

          <div onClick={toggleShowModal} className={classes.newTwit}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
