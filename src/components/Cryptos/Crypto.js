import React from 'react';
import { useSelector } from 'react-redux';
import BasicInfo from './BasicInfo';
import PriceChanges from './PriceChanges';
import Chart from '../Charts/Chart';
import Intervals from './Intervals';
import DetailedChart from '../Charts/DetailedChart';
import classes from './Crypto.module.css';
import Card from '../UI/Card';

const Crypto = React.forwardRef((props, ref) => {
  const { id } = props;

  const cryptos = useSelector(state => state.cryptos.cryptoList);
  const crypto = cryptos.find(crypto => crypto.id === id);
  const isDetailedChartShown = crypto.detailedChart.isShown;

  const outerContainerClass = `${classes.outer} ${
    !isDetailedChartShown ? '' : classes['outer-detailed']
  }`;
  const innerContainerClass = `${classes.inner} ${
    !isDetailedChartShown ? '' : classes['inner-detailed']
  }`;

  return (
    <>
      <Card ref={ref} class={outerContainerClass}>
        <div className={innerContainerClass}>
          <BasicInfo id={id} isDetailedChartShown={isDetailedChartShown} />
          {!isDetailedChartShown && (
            <>
              <PriceChanges id={id} />
              <Chart crypto={crypto} />
            </>
          )}
          {isDetailedChartShown && <Intervals id={id} />}
        </div>
        {isDetailedChartShown && <DetailedChart id={id} />}
      </Card>
    </>
  );
});

export default Crypto;
