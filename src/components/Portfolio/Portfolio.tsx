import Widget from './Widget';
import Select from '../UI/Select';
import Coin from './Coin';
import * as classes from './Portfolio.module.css';
import Header from './Header';

const Portfolio = () => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.portfolio}>
        <div className={classes.balance}>
          <h3>Your balance</h3>
          <Select options={[{ name: '3M', value: '3M' }]} />
        </div>
        <div className={classes.center}>
          <div className={`${classes.outer} ${classes.circle}`}>
            <button className={classes.button}>
              <div className={classes.circleTitle}>Total</div>
              <div className={classes.circleValue}>$ 12,000.00</div>
              <div className={classes.circleChange}>+17.1%</div>
            </button>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={classes.details}>Details</div>
        <div className={classes.coins}>
          <div className={classes.coinRow}>
            <Coin
              value="$ 12,000.00"
              symbol="ETH"
              change="+33%"
              color="rgb(42, 90, 218)"
            />
            <Coin
              value="$ 9,000.00"
              symbol="BTC"
              change="+33%"
              color="rgb(247, 147, 26)"
            />
          </div>
          <div className={classes.coinRow}>
            <Coin
              value="$ 4,999.23"
              symbol="DOT"
              change="+33%"
              color="rgb(250, 238, 215)"
            />
            <Coin
              value="$ 2,230.00"
              symbol="LUNA"
              change="-12.1%"
              color="rgb(165, 219, 255)"
            />
          </div>
        </div>
        <div className={classes.widgets}>
          <div className={classes.widgetRow}>
            <Widget icon="show_chart" spacing={true}>
              <div className={`${classes.widgetTitle} ${classes.green}`}>
                $59.67
              </div>
              <div className={classes.widgetText}>Wallet profit - 3M</div>
            </Widget>
            <Widget icon="star">
              <div className={classes.widgetTitle}>11 coins</div>
              <div className={classes.widgetText}>On your watchlist</div>
            </Widget>
          </div>
          <div className={classes.widgetRow}>
            <Widget icon="currency_bitcoin" spacing={true}>
              <div className={classes.widgetTitle}>39.56%</div>
              <div className={classes.widgetText}>
                Bitcoin Market Cap Dominance
              </div>
            </Widget>
            <Widget icon="mood">
              <div className={classes.widgetTitle}>74% Extreeme Greed</div>
              <div className={classes.widgetText}>Fear and greed index</div>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
