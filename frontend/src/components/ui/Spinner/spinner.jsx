import React from 'react';

import classes from './spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <div className={classes.inner}></div>
      <div className={classes.outer}></div>
    </div>
  );
};

export default Spinner;
