import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './footer.module.css';

const Footer= (props) => {
  return (
    <React.Fragment>
      <section className={classes.footer}>
        <div className={classes.footerIcons}>
          <NavLink
            to="/home"
            className={(navData) => (navData.isActive ? classes.active : '')}
          >
            <i className="fa-solid fa-house"></i>
          </NavLink>

          <NavLink
            to="/search"
            className={(navData) => (navData.isActive ? classes.active : '')}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>

          <NavLink
            to="/notifications"
            className={(navData) => (navData.isActive ? classes.active : '')}
          >
            <i className="fa-solid fa-bell"></i>
          </NavLink>

          <NavLink
            to="/messages"
            className={(navData) => (navData.isActive ? classes.active : '')}
          >
            <i className="fa-solid fa-envelope"></i>
          </NavLink>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Footer;
