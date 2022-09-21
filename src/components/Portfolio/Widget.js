import MaterialIcon from '../UI/MaterialIcon';
import classes from './Widget.module.css';

const Widget = props => {
  return (
    <div
      className={`${classes.container} ${props.spacing ? classes.spacing : ''}`}
    >
      <div className={classes['icon-container']}>
        <div className={classes['icon-wrapper']}>
          <MaterialIcon type={props.icon} class={classes.icon} />
        </div>
      </div>
      <div className={classes.stats}>{props.children}</div>
    </div>
  );
};

export default Widget;
