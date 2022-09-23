import React from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/use-redux';
import { setColor, formatNumber } from '../../helpers/helpers';
import { cryptosActions } from '../../store/cryptos-slice';
import Card from '../UI/Card';
import classes from './PriceChanges.module.css';

const PriceChanges = React.memo(({ id }: { id: string }) => {
  const dispatch = useCustomDispatch();
  const cryptos = useCustomSelector(state => state.cryptos.cryptoList);
  const crypto = cryptos.find(crypto => crypto.id === id);

  // refactor
  if (crypto === undefined)
    return <p>Error! .find method didn't found crypto</p>;

  const changePerc = crypto.data.changePerc;
  const selectedInterval = crypto.chart.selectedChange.interval;

  const clickHandler = (interval: string, value: number) => {
    dispatch(
      cryptosActions.onNewSelectedChange({ id: crypto.id, interval, value })
    );
  };

  return (
    <>
      <div className={classes.container}>
        {changePerc.map(change => (
          <Card
            className={`${classes.box} ${
              selectedInterval === change.interval ? classes.selected : ''
            }`}
            onClick={clickHandler.bind(null, change.interval, change.value)}
          >
            <h3
              className={classes.change}
              style={{ color: setColor(change.value.toString()) }}
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
