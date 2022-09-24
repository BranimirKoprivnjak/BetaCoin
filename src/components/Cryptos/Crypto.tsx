import React from 'react';
import { useCustomSelector } from '../../hooks/use-redux';
import BasicInfo from './BasicInfo';
import PriceChanges from './PriceChanges';
import LineChart from '../Charts/LineChart';
import Intervals from './Intervals';
import DetailedChart from '../Charts/DetailedChart';
import * as classes from './Crypto.module.css';
import Card from '../UI/Card';

const Crypto = React.forwardRef(
  ({ id }: { id: string }, ref: React.ForwardedRef<HTMLDivElement>) => {
    const cryptos = useCustomSelector(state => state.cryptos.cryptoList);
    // if crypto doesn't exists, set null value
    const crypto = cryptos.find(crypto => crypto.id === id);

    // refactor
    if (crypto === undefined)
      return <p>Error! .find method didn't found crypto</p>;

    const isDetailedChartShown = crypto!.detailedChart.isShown;

    const outerContainerClass = `${classes.outer} ${
      !isDetailedChartShown ? '' : classes.outerDetailed
    }`;
    const innerContainerClass = `${classes.inner} ${
      !isDetailedChartShown ? '' : classes.innerDetailed
    }`;

    return (
      <>
        <Card ref={ref} className={outerContainerClass}>
          <div className={innerContainerClass}>
            <BasicInfo id={id} isDetailedChartShown={isDetailedChartShown} />
            {!isDetailedChartShown && (
              <>
                <PriceChanges id={id} />
                <LineChart crypto={crypto} />
              </>
            )}
            {isDetailedChartShown && <Intervals id={id} />}
          </div>
          {isDetailedChartShown && <DetailedChart id={id} />}
        </Card>
      </>
    );
  }
);

export default Crypto;
