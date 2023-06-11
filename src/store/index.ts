import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
