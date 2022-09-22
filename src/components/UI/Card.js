import React from 'react';
import classes from './Card.module.css';

const Card = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      onClick={props.click}
      className={`${classes.wrapper} ${props.class}`}
    >
      {props.children}
    </div>
  );
});

export default Card;
