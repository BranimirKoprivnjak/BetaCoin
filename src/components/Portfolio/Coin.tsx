import { colors } from '../../config/config';
import classes from './Coin.module.css';

const Coin = ({
  change,
  color,
  value,
  symbol,
}: {
  change: string;
  color: string;
  value: string;
  symbol: string;
}) => {
  const isPositiveChange = !change.includes('-');

  return (
    <div className={classes.container}>
      <div
        className={classes.dot}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 3px ${color}, 0 0 6px ${color}`,
        }}
      ></div>
      <div className={classes.data}>
        <div className={classes.value}>{value}</div>
        <div className={classes['symbol-wrapper']}>
          <div className={classes.symbol}>{symbol}</div>
          <div
            style={{
              color: isPositiveChange ? colors.GREEN.base : colors.RED.base,
            }}
            className={classes.change}
          >
            {change}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
