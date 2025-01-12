import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthReducer/authSlice';

export const store = configureStore({
  reducer: {
    stock: authReducer,
  },
});

export default store;
