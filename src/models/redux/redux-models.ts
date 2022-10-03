import store from '../../store/redux';

export interface Wallet {
  wallet: {
    id: string;
    // transactions shouldn't be optional
    transactions?: Transaction[];
  }[];
}

export interface Transaction {
  type: string;
  date: string;
  quantity: number;
  pricePerCoin: number;
}

export interface Crypto {
  id: string;
  data: {
    name: string;
    logo: string;
    symbol: string;
    currentPrice: number;
    lastUpdated: string;
    changePerc: {
      value: number;
      interval: string;
    }[];
    sparkline: number[];
  };
  chart: {
    selectedChange: {
      value: number;
      interval: string;
    };
  };
  detailedChart: {
    isShown: boolean;
    interval: {
      name: string;
      days: string;
    };
  };
}

export interface CryptoList {
  cryptoList: Crypto[];
}

// custom redux hooks types, https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
