import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { useSelector } from 'react-redux';

import Sidebar from '../../sidebar/sidebar';

import classes from './header.module.css';

const Header = (props) => {
  const userInfo = useSelector((state) => state.user);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const sidebarRoot = document.getElementById('sidebar');

  const toggleShowSideMenu = () => {
    setShowSideMenu((prevState) => !prevState);
    props.handleBlur();
  };

  return (
    <React.Fragment>
      {/* Sidebar */}
      {ReactDom.createPortal(
        <Sidebar show={showSideMenu} handleHide={toggleShowSideMenu} />,
        sidebarRoot
      )}
      {/* Sidebar */}
      {/* <!-- Header --> */}
      <section className={classes.header}>
        <div className={classes.headerLeft}>
          <img
            src={`http://localhost:4000/${userInfo.image}`}
            alt="profile"
            onClick={toggleShowSideMenu}
          />
          <h1>Home</h1>
        </div>
        <div className={classes.headerRight}>
          <i className="fa-solid fa-bahai"> </i>
        </div>
      </section>
      {/* <!-- Header --> */}
    </React.Fragment>
  );
};

export default Header;
