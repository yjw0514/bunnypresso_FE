import {
  combineReducers,
  configureStore,
  EnhancedStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import authReducer from '@/store/slice/authSlice';
import menuReducer from '@/store/slice/menuSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root', // localStorage key
  storage, // localStorage
  whitelist: ['auth', 'menu'], // target (reducer name)
};

// const rootReducer = combineReducers({
//   auth: authReducer,
//   menu: menuReducer,
// });

const rootReducer = (state: any, action: PayloadAction<any>) => {
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

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);

// const makeStore = () =>
//   configureStore({
//     reducer,
//   });

// const store = makeStore();

// wrapper를 생성해줍니다.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
