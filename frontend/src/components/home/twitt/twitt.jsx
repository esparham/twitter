import React from 'react';
import { useSelector } from 'react-redux';
import classes from './twitt.module.css';

const Twitt = (props) => {
  const userInfo = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <div className={classes.twitt}>
        <img className={classes.userPhoto} src="images/My Photo.jpg" alt="" />
        <div className={classes.card}>
          <div className={classes.cardUsername}>
            <div className={classes.cardUsername__left}>
              <h3>{userInfo.firstName}</h3>
              <h4>.</h4>
              <h4>{userInfo.email.split('@', 1)}</h4>
              <h4>.</h4>
              <h4>{props.createdAt}</h4>
            </div>
            <div className={classes.cardUsername__right}>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <div className={classes.cardTwitt}>
            {props.image && (
              <img className={classes.twittPhoto} src={props.image} alt="" />
            )}
            <p>{props.text}</p>
          </div>
          <div className={classes.cardIcons}>
            <span>
              <i className="fa-solid fa-comment"></i>
              <h4>2</h4>
            </span>
            <span>
              <i className="fa-solid fa-retweet"></i>
              <h4>2</h4>
            </span>
            <span>
              <i className="fa-solid fa-heart"></i>
              <h4>3</h4>
            </span>
            <span>
              <i className="fa-solid fa-share"></i>
              <h4>7</h4>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Twitt;
