export interface Wallet {
  wallet: string[];
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
      days: number;
    };
  };
}

export interface CryptoList {
  cryptoList: Crypto[];
}
