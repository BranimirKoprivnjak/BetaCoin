import * as classes from './Button.module.css';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button = ({ onClick, children, className }: Props) => {
  return (
    <button className={`${classes.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
