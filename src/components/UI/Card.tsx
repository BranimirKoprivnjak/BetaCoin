import React from 'react';
import classes from './Card.module.css';

const Card = React.forwardRef(
  (
    {
      onClick,
      className,
      children,
    }: {
      onClick?: React.MouseEventHandler<HTMLDivElement>;
      className?: string;
      // https://www.carlrippon.com/react-children-with-typescript/
      children: React.ReactNode;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`${classes.wrapper} ${className}`}
      >
        {children}
      </div>
    );
  }
);

export default Card;
