import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wallet } from '../models/redux/redux-models';

const initialState: Wallet = {
  wallet: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addRemoveCrypto(state: Wallet, action: PayloadAction<string>) {
      const { wallet } = state;
      const existingCrypto = wallet.find(id => id === action.payload);
      if (existingCrypto) {
        const idx = wallet.indexOf(action.payload);
        wallet.splice(idx, 1);
      } else {
        wallet.push(action.payload);
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
