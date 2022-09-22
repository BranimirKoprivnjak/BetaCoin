import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatNumber, setColor } from '../../helpers/helpers';
import { cryptosActions } from '../../store/cryptos-slice';
import MaterialIcon from '../UI/MaterialIcon';
import classes from './BasicInfo.module.css';

const BasicInfo = React.memo(props => {
  const { id, isDetailedChartShown } = props;

  const [isArrowUp, setIsArrowUp] = useState(isDetailedChartShown);
  const dispatch = useDispatch();

  const cryptos = useSelector(state => state.cryptos.cryptoList);
  const crypto = cryptos.find(crypto => crypto.id === id);
  const { data, chart } = crypto;
  const { name, logo, symbol, currentPrice } = data;

  const selectedChange = chart.selectedChange;
  const formattedPrice = formatNumber(currentPrice);
  const changePercAsNum =
    parseFloat(selectedChange.value.toString().split('%')[0]) / 100;
  // should be changePercAsNum * price at that interval, not current price
  const formattedChange = formatNumber(currentPrice * changePercAsNum);

  const clickHandler = () => {
    setIsArrowUp(prev => !prev);
    dispatch(cryptosActions.toggleDetailedChart({ id }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <img src={logo} className={classes.logo} alt={`${name} logo`} />
        <div className={classes.name}>
          <h3 className={classes.coin} onClick={clickHandler}>
            {name}
            <MaterialIcon
              type="expand_more"
              class={`${classes.icon} ${isArrowUp ? classes.up : classes.down}`}
            />
          </h3>
          <p className={classes.symbol}>{symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className={classes.right}>
        <h3 className={classes.price}>${formattedPrice}</h3>
        <p
          className={classes.change}
          style={{ color: setColor(changePercAsNum) }}
        >
          ${formattedChange}
        </p>
      </div>
    </div>
  );
});

export default BasicInfo;
