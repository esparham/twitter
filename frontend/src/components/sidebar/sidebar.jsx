import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import classes from './sidebar.module.css';

const Sidebar = (props) => {
  const userInfo = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <aside id="side-menu" className={props.show ? classes.active : ''}>
        <div className={classes.sideTop}>
          <div className={classes.top}>
            <h2>Account info</h2>
            <i className="fa-solid fa-xmark" onClick={props.handleHide}></i>
          </div>
          <Link to="/profile">
            <div className={classes.userInfo}>
              <img src={`http://localhost:4000/${userInfo.image}`} alt="" />
              <h3>
                {userInfo.firstName} {userInfo.lastName}
              </h3>
              <h4>{userInfo.email}</h4>
            </div>
          </Link>
          <div className={classes.row}>
            <h3>
              {userInfo.followings.length} <span>Following</span>
            </h3>
            <h3>
              {userInfo.followers.length} <span>Followers</span>
            </h3>
          </div>
          <Link to="/profile">
            <i className="fa-solid fa-user"></i>Profile
          </Link>

          <Link to="/list">
            <i className="fa-solid fa-rectangle-list"></i>List
          </Link>

          <Link to="/setting">
            <i className="fa-solid fa-sliders"></i>Setting
          </Link>

          <Link to="/display">
            <i className="fa-solid fa-sun"></i>Disply
          </Link>
        </div>

        <div className={classes.sideBottom}>
          <Link to="/logout">Logout</Link>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
