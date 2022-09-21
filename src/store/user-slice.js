import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    wallet: [],
  },
  reducers: {
    addRemoveCrypto(state, action) {
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
