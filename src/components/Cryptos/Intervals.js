import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cryptosActions } from '../../store/cryptos-slice';
import { userActions } from '../../store/user-slice';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Intervals.module.css';

const intervals = [
  { name: '24h', days: 1 },
  { name: '3d', days: 3 },
  { name: '7d', days: 7 },
  { name: '1M', days: 30 },
  { name: '3M', days: 90 },
  { name: '1Y', days: 365 },
  { name: 'ALL', days: 'max' },
];

const Intervals = props => {
  const dispatch = useDispatch();
  const { cryptos, user } = useSelector(state => state);

  const crypto = cryptos.cryptoList.find(crypto => crypto.id === props.id);
  const selectedInterval = crypto.detailedChart.interval.name;

  const isCryptoInWallet = user.wallet.find(id => id === props.id);
  const [isStarFilled, setIsStarFilled] = useState(
    isCryptoInWallet ? true : false
  ); //redux -> local storage

  const intervalClickHandler = interval => {
    dispatch(cryptosActions.onNewInterval({ id: props.id, interval }));
  };

  const starClickHandler = id => {
    setIsStarFilled(filled => !filled);
    dispatch(userActions.addRemoveCrypto(id));
  };

  return (
    <div className={classes.container}>
      {intervals.map(interval => (
        <h4
          key={interval.name}
          onClick={intervalClickHandler.bind(null, interval)}
          className={selectedInterval === interval.name ? classes.selected : ''}
        >
          {interval.name}
        </h4>
      ))}
      <MaterialIcon
        type="star"
        class={isStarFilled ? classes['star-filled'] : classes.star}
        click={starClickHandler.bind(null, props.id)}
      />
    </div>
  );
};

export default Intervals;
