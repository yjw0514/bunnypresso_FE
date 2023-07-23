import { removeCookie } from '@/utils/cookies';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  isLoggedIn: boolean;
  isSignupSuccess: boolean;
}

const initialState: authState = {
  isLoggedIn: false,
  isSignupSuccess: false,
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
    isSignUp: (state, action: PayloadAction<boolean>) => {
      state.isSignupSuccess = action.payload;
    },
  },
});

export const { login, logout, isSignUp } = authSlice.actions;
export default authSlice.reducer;
