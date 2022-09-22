import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Crypto from './Crypto';
import { cryptosActions } from '../../store/cryptos-slice';
import classes from './CryptoList.module.css';
import useHttp from '../../hooks/use-http';
import Spinner from '../UI/Spinner';
import Message from '../UI/Message';

const CryptoList = props => {
  const { cryptos, user } = useSelector(state => state);
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, error, sendRequest, hasMore } = useHttp();

  const { searchQuery, dashboardShowsPortfolio } = props;

  const observer = useRef();
  const lastCryptoRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore && pageNum <= 5) {
            setPageNum(prevPageNum => prevPageNum + 1);
          }
        },
        [0.9]
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const filterCryptos = data => {
    if (!dashboardShowsPortfolio) {
      return data.filter(item =>
        item.data.name.toLowerCase().includes(searchQuery)
      );
    }
    return data
      .filter(item => user.wallet.includes(item.id))
      .filter(item => item.data.name.toLowerCase().includes(searchQuery));
  };

  useEffect(() => {
    const handleData = data => {
      const isInitFetch = pageNum === 1 ? true : false;
      dispatch(cryptosActions.addToCryptoList({ data, isInitFetch }));
    };

    sendRequest(
      {
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=${pageNum}&sparkline=true&price_change_percentage=24h%2C7d`,
      },
      handleData
    );
  }, [sendRequest, pageNum]);

  const cryptosToShow = filterCryptos(cryptos.cryptoList);

  return (
    <>
      <div className={classes.container}>
        {cryptosToShow.length > 0 &&
          cryptosToShow.map((item, idx) => {
            if (cryptosToShow.length - 1 === idx) {
              return <Crypto key={item.id} id={item.id} ref={lastCryptoRef} />;
            } else {
              return <Crypto key={item.id} id={item.id} />;
            }
          })}
        {!isLoading &&
          !cryptosToShow.length &&
          dashboardShowsPortfolio &&
          !error && (
            <Message>
              <h3 className={classes['message-title']}>
                This portfolio is empty
              </h3>
              <p className={classes['message-message']}>
                Click on star next to coin to get started
              </p>
            </Message>
          )}
        {isLoading && <Spinner />}
        {!isLoading && error && (
          <Message>
            <h3 className={classes['message-title']}>Something went wrong!</h3>
          </Message>
        )}
      </div>
    </>
  );
};

export default CryptoList;
