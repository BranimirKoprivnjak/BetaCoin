import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, formatNumber } from '../../helpers/helpers';
import { cryptosActions } from '../../store/cryptos-slice';
import classes from './PriceChanges.module.css';

const PriceChanges = React.memo(props => {
  const dispatch = useDispatch();
  const { id } = props;

  const cryptos = useSelector(state => state.cryptos.cryptoList);
  const crypto = cryptos.find(crypto => crypto.id === id);

  const changePerc = crypto.data.changePerc;
  const selectedInterval = crypto.chart.selectedChange.interval;

  const clickHandler = (interval, value) => {
    dispatch(
      cryptosActions.onNewSelectedChange({ id: crypto.id, interval, value })
    );
  };

  // console.log('price changes', Date.now());

  return (
    <>
      <div className={classes.container}>
        {changePerc.map(change => (
          <div
            className={`${classes.box} ${
              selectedInterval === change.interval ? classes.selected : ''
            }`}
            onClick={clickHandler.bind(null, change.interval, change.value)}
          >
            <h3 style={{ color: setColor(change.value) }}>
              {formatNumber(change.value)}%
            </h3>
            <p className={classes.interval}>{change.interval}</p>
          </div>
        ))}
      </div>
    </>
  );
});

export default PriceChanges;
