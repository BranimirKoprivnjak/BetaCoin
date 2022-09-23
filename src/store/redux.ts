import { configureStore } from '@reduxjs/toolkit';
import cryptosSlice from './cryptos-slice';
import userSlice from './user-slice';

const store = configureStore({
  reducer: {
    cryptos: cryptosSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
