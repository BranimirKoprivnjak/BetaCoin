import { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/use-redux';
import { cryptosActions } from '../../store/cryptos-slice';
import { userActions } from '../../store/user-slice';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './Intervals.module.css';

const intervals = [
  { name: '24h', days: '1' },
  { name: '3d', days: '3' },
  { name: '7d', days: '7' },
  { name: '1M', days: '30' },
  { name: '3M', days: '90' },
  { name: '1Y', days: '365' },
  { name: 'ALL', days: 'max' },
];

const Intervals = ({ id }: { id: string }) => {
  const dispatch = useCustomDispatch();
  const { cryptos, user } = useCustomSelector(state => state);

  const crypto = cryptos.cryptoList.find(crypto => crypto.id === id);

  // refactor
  if (crypto === undefined)
    return <p>Error! .find method didn't found crypto</p>;

  const selectedInterval = crypto.detailedChart.interval.name;

  const isCryptoInWallet = user.wallet.find(id => id === id);
  const [isStarFilled, setIsStarFilled] = useState(
    isCryptoInWallet ? true : false
  ); //redux -> local storage

  const intervalClickHandler = (interval: { name: string; days: string }) => {
    dispatch(cryptosActions.onNewInterval({ id, interval }));
  };

  const starClickHandler = (id: string) => {
    setIsStarFilled(filled => !filled);
    dispatch(userActions.addRemoveCrypto(id));
  };

  return (
    <div className={classes.container}>
      {intervals.map(interval => (
        <h4
          key={interval.name}
          onClick={intervalClickHandler.bind(null, interval)}
          className={`${classes.interval} ${
            selectedInterval === interval.name ? classes.selected : ''
          }`}
        >
          {interval.name}
        </h4>
      ))}
      <MaterialIcon
        type="star"
        className={`${classes.icon} ${isStarFilled ? classes.filled : ''}`}
        onClick={starClickHandler.bind(null, id)}
      />
    </div>
  );
};

export default Intervals;
