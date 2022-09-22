import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, formatNumber } from '../../helpers/helpers';
import { cryptosActions } from '../../store/cryptos-slice';
import Card from '../UI/Card';
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

  return (
    <>
      <div className={classes.container}>
        {changePerc.map(change => (
          <Card
            class={`${classes.box} ${
              selectedInterval === change.interval ? classes.selected : ''
            }`}
            click={clickHandler.bind(null, change.interval, change.value)}
          >
            <h3
              className={classes.change}
              style={{ color: setColor(change.value) }}
            >
              {formatNumber(change.value)}%
            </h3>
            <p className={classes.interval}>{change.interval}</p>
          </Card>
        ))}
      </div>
    </>
  );
});

export default PriceChanges;
