import { colors } from '../../config/config';
import classes from './Coin.module.css';

const Coin = props => {
  const isPositiveChange = !props.change.includes('-');

  return (
    <div className={classes.container}>
      <div
        className={classes.dot}
        style={{
          backgroundColor: props.color,
          boxShadow: `0 0 2px ${props.color}, 0 0 4px ${props.color}`,
        }}
      ></div>
      <div className={classes.data}>
        <div className={classes.value}>{props.value}</div>
        <div className={classes['symbol-wrapper']}>
          <div className={classes.symbol}>{props.symbol}</div>
          <div
            style={{
              color: isPositiveChange ? colors.GREEN.base : colors.RED.base,
            }}
            className={classes.change}
          >
            {props.change}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
