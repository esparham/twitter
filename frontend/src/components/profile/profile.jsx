import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Twitt from '../home/twitt/twitt';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTwitts } from '../../store/twittSlice';
import classes from './profile.module.css';
import Spinner from '../ui/Spinner/spinner';
import { useCallback } from 'react';
import formatDate from '../../tools/formatDate';

const Profile = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const userInfo = useSelector((state) => state.user);
  const userTwitts = useSelector((state) => state.twitt.twitts);

  const getTwitts = useCallback(() => {
    const token = localStorage.getItem('token');
    dispatch(fetchUserTwitts(token, limit, skip));
  }, [dispatch, limit, skip]);

  useEffect(() => {
    getTwitts();
  }, [getTwitts]);

  return (
    <React.Fragment>
      <div className={classes.container} id="all">
        {/* <!-- Header --> */}
        <section className={classes.header}>
          <div className={classes.headerLeft}>
            <Link to="/home">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <h1>
              {userInfo.firstName} {userInfo.lastName}
            </h1>
          </div>
          {/* <!-- <div className="header-right">
          <i className="fa-solid fa-bahai"> </i>
        </div> --> */}
        </section>
        {/* <!-- Header --> */}

        {/* <!-- Body --> */}
        <section className={classes.body}>
          <div className={classes.coverPhoto}>
            <img className={classes.cover} src="images/header.jpeg" alt="" />
            <img
              className={classes.profile}
              src={`http://localhost:4000/${userInfo.image}`}
              alt=""
            />
          </div>

          <div className={classes.editProfile}>
            {/* <link to="/profile">Edit profile</link> */}
            <a href="">Edit profile</a>
          </div>

          <div className={classes.userInfo__profile}>
            <h1>
              {userInfo.firstName} {userInfo.lastName}
            </h1>
            <h2>{userInfo.email}</h2>
            <span>
              <i className="fa-solid fa-calendar-days"></i>
              <h2>
                Joined
                {formatDate(userInfo.registeredAt, true, false)}
              </h2>
            </span>
            <div className="row">
              <h3>
                {userInfo.followings.length} <span>Following</span>
              </h3>
              <h3>
                {userInfo.followers.length} <span>Followers</span>
              </h3>
            </div>
          </div>

          <div className={classes.tweets}>
            {userTwitts ? (
              userTwitts.map((twitt) => (
                <Twitt
                  key={twitt._id}
                  text={twitt.text}
                  userImage={`http://localhost:4000/${userInfo.image}`}
                  image={`http://localhost:4000/${twitt.image}`}
                  createdAt={formatDate(twitt.createdAt)}
                />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </section>
        {/* <!-- Body --> */}

        {/* <!-- Footer --> */}
        <Footer />
        {/* <!-- Footer --> */}
      </div>
    </React.Fragment>
  );
};

export default Profile;
