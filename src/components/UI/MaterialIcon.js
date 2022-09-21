import classes from './MaterialIcon.module.css';

const MaterialIcon = props => {
  return (
    <span
      onClick={props.click}
      className={`material-symbols-outlined ${classes.icon} ${props.class}`}
    >
      {props.type}
    </span>
  );
};

export default MaterialIcon;
