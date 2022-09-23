import React, { MouseEventHandler } from 'react';
import classes from './MaterialIcon.module.css';

const MaterialIcon = ({
  type,
  onClick,
  className,
}: {
  type: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  className?: string;
}) => {
  return (
    <span
      onClick={onClick}
      className={`material-symbols-outlined ${classes.icon} ${className}`}
    >
      {type}
    </span>
  );
};

export default MaterialIcon;
