import authReducer from './AuthReducer/authSlice';
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

const appReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

/**
 * @param getDefaultMiddleware
 * @returns
 */
const getMiddleware = (
  getDefaultMiddleware: (arg0: {serializableCheck: boolean}) => any[],
) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getMiddleware,
});

export const persistor = persistStore(store);

export default store;
