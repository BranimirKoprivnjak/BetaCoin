import { useState } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import CryptoList from '../Cryptos/CryptoList';
import classes from './Dashboard.module.css';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardShowsPortfolio, setDashboardShowsPortfolio] = useState(false);

  const dashboardViewHandler = (view: string) => {
    if (view === 'portfolio') setDashboardShowsPortfolio(true);
    else setDashboardShowsPortfolio(false);
  };

  return (
    <div className={classes.container}>
      <Toolbar
        setSearchQuery={setSearchQuery}
        dashboardViewHandler={dashboardViewHandler}
      />
      <CryptoList
        searchQuery={searchQuery}
        dashboardShowsPortfolio={dashboardShowsPortfolio}
      />
    </div>
  );
};

export default Dashboard;
