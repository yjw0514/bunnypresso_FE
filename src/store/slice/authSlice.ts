import { removeCookie } from '@/utils/cookies';
import { createSlice } from '@reduxjs/toolkit';

interface authState {
  isLoggedIn: boolean;
}

const initialState: authState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('name');
      localStorage.removeItem('userId');
      removeCookie('accessToken');
      removeCookie('refreshToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
