import {
  combineReducers,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from '@/store/slice/authSlice';
import menuReducer from '@/store/slice/menuSlice';

const reducer = (state: any, action: PayloadAction<any>) => {
  // hydration이 발생했을 때 처리하는 부분을 별도로 작성해줍니다.
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    auth: authReducer,
    menu: menuReducer,
  })(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
  });

const store = makeStore();

// wrapper를 생성해줍니다.
export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
