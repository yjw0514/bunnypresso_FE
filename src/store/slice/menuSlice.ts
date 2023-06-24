import { menuType } from '@/dto/menuDto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface menuState {
  tap: number;
  menu: menuType[];
  searchPopup: boolean;
}

const initialState = {
  tap: 0,
  menu: [],
  searchPopup: false,
} as menuState;

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeTap: (state, action: PayloadAction<number>) => {
      state.tap = action.payload;
    },
    setMenu: (state, action: PayloadAction<menuType[]>) => {
      state.menu = action.payload;
    },
    toggleSearchPopup: (state) => {
      const prev = state.searchPopup;
      state.searchPopup = !prev;
    },
  },
});

export const { changeTap, setMenu, toggleSearchPopup } = menuSlice.actions;
export default menuSlice.reducer;
