import { removeCookie } from '@/utils/cookies';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface menuState {
  tap: number;
}

const initialState = {
  tap: 0,
} as menuState;

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeTap: (state, action: PayloadAction<number>) => {
      console.log(state, action.payload);
      state.tap = action.payload;
    },
  },
});

export const { changeTap } = menuSlice.actions;
export default menuSlice.reducer;
