import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { calc3dPriceChangePerc } from '../helpers/helpers';
import { Crypto, CryptoList } from '../models/redux/redux-models';

const initialState: CryptoList = {
  cryptoList: [],
};

const cryptosSlice = createSlice({
  name: 'cryptos',
  initialState,
  reducers: {
    addToCryptoList(state: CryptoList, action: PayloadAction<any>) {
      const { data, isInitFetch } = action.payload;

      data.forEach((item: any, idx: number) => {
        const {
          sparkline_in_7d: sparkline,
          current_price: currentPrice,
          last_updated: lastUpdated,
        } = item;

        const crypto = {
          name: item.name,
          logo: item.image,
          symbol: item.symbol,
          currentPrice,
          lastUpdated,
          changePerc: [
            {
              value: item.price_change_percentage_24h_in_currency,
              interval: '24h',
            },
            {
              value: calc3dPriceChangePerc(
                item.current_price,
                item.sparkline_in_7d.price
              ),
              interval: '3 days',
            },
            {
              value: item.price_change_percentage_7d_in_currency,
              interval: '7 days',
            },
          ],
          sparkline: sparkline.price,
        };

        const cryptoState: Crypto = {
          id: item.id,
          data: crypto,
          chart: {
            selectedChange: crypto.changePerc[2],
          },
          detailedChart: {
            isShown: false,
            interval: { name: '24h', days: '1' },
          },
        };

        // feature showoff
        if (isInitFetch && idx === 1) cryptoState.detailedChart.isShown = true;

        state.cryptoList.push(cryptoState);
      });
    },

    onNewSelectedChange(state, action) {
      const { id, interval, value } = action.payload;

      const crypto = state.cryptoList.find(item => item.id === id);

      crypto!.chart = {
        selectedChange: { value, interval },
      };
    },

    onNewInterval(state, action) {
      const { id, interval } = action.payload;

      const crypto = state.cryptoList.find(item => item.id === id);

      crypto!.detailedChart.interval = interval;
    },

    toggleDetailedChart(state, action) {
      const crypto = state.cryptoList.find(
        item => item.id === action.payload.id
      );
      crypto!.detailedChart.isShown = !crypto!.detailedChart.isShown;
    },
  },
});

export const cryptosActions = cryptosSlice.actions;
export default cryptosSlice;
