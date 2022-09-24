import { useCallback, useEffect, useState, useRef } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/use-redux';
import Crypto from './Crypto';
import { cryptosActions } from '../../store/cryptos-slice';
import * as classes from './CryptoList.module.css';
import useHttp from '../../hooks/use-http';
import Spinner from '../UI/Spinner';
import Message from '../UI/Message';
import { CryptoList } from '../../models/redux/redux-models';

const CryptoList = ({
  searchQuery,
  dashboardShowsPortfolio,
}: {
  searchQuery: string;
  dashboardShowsPortfolio: boolean;
}) => {
  const { cryptos, user } = useCustomSelector(state => state);
  const dispatch = useCustomDispatch();
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, error, sendRequest, hasMore } = useHttp();

  const observer = useRef<IntersectionObserver>();
  const lastCryptoRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore && pageNum <= 5) {
            setPageNum(prevPageNum => prevPageNum + 1);
          }
        },
        [0.9] as IntersectionObserverInit
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const filterCryptos = (cryptos: CryptoList) => {
    if (!dashboardShowsPortfolio) {
      return cryptos.cryptoList.filter(item =>
        item.data.name.toLowerCase().includes(searchQuery)
      );
    }
    return cryptos.cryptoList
      .filter(item => user.wallet.includes(item.id))
      .filter(item => item.data.name.toLowerCase().includes(searchQuery));
  };

  useEffect(() => {
    const handleData = (data: any) => {
      const isInitFetch = pageNum === 1 ? true : false;
      dispatch(cryptosActions.addToCryptoList({ data, isInitFetch }));
    };

    sendRequest(
      {
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNum}&sparkline=true&price_change_percentage=24h%2C7d`,
      },
      handleData
    );
  }, [sendRequest, pageNum]);

  const cryptosToShow = filterCryptos(cryptos);

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
              <h3 className={classes.messageTitle}>This portfolio is empty</h3>
              <p className={classes.messageMessage}>
                Click on star next to coin to get started
              </p>
            </Message>
          )}
        {isLoading && <Spinner />}
        {!isLoading && error && (
          <Message>
            <h3 className={classes.messageTitle}>Something went wrong!</h3>
          </Message>
        )}
      </div>
    </>
  );
};

export default CryptoList;
