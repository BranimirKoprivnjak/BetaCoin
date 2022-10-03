import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, Wallet } from '../models/redux/redux-models';

// { id: string, transactions: [{ date: Date, pricePerCoin: number, quantity: number, type: string }] }
const initialState: Wallet = {
  wallet: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addRemoveCrypto(state: Wallet, action: PayloadAction<string>) {
      const { wallet } = state;
      const existingCrypto = wallet.find(coin => coin.id === action.payload);
      if (existingCrypto) {
        const idx = wallet.map(coin => coin.id).indexOf(action.payload);
        wallet.splice(idx, 1);
      } else {
        wallet.push({ id: action.payload });
      }
    },
    addTransaction(
      state: Wallet,
      action: PayloadAction<{ id: string; transaction: Transaction }>
    ) {
      const { id, transaction } = action.payload;

      const existingCoin = state.wallet.find(coin => coin.id === id);
      if (!existingCoin) {
        state.wallet.push({ id, transactions: [transaction] });
      } else {
        existingCoin.transactions!.push(transaction);
      }
    },
    removeCoin(state: Wallet, action: PayloadAction<{ id: string }>) {
      const idxToRemove = state.wallet
        .map(coin => coin.id)
        .indexOf(action.payload.id);
      state.wallet.splice(idxToRemove, 1);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
