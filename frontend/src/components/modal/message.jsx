import React from 'react';
import classes from './message.module.css';

const Message = (props) => {
  // { text: 'OK', type: 'success', action: () => {} },
  // { text: 'Retry', type: 'danger', action: () => {} },
  return (
    <div className={`${classes.backdrop} ${props.show && classes.active}`}>
      <div className={classes.modal}>
        <h2>{props.header}</h2>
        <p>{props.text}</p>
        <div className={classes.row}>
          {props.buttons.map((btn) => (
            <button
              key={btn.text}
              className={
                btn.type === 'success' ? classes.btnSuccess : classes.btnDanger
              }
              onClick={btn.action}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
