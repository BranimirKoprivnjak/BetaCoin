import React from 'react';
import classes from './Message.module.css';

const Message = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Message;
