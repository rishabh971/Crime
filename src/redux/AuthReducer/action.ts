import {
  getUserDetails,
  signInWithEmail,
  signUp,
} from '@maxxx/api/services/authApi';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const emailsignIn: any = createAsyncThunk(
  'auth/signIn',
  async params => {
    try {
      const result = await signInWithEmail(params);
      // console.log('login result', result);

      return result;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },
);

export const registeration: any = createAsyncThunk(
  'auth/signUp',
  async params => {
    try {
      // console.log('params in registeration', params);
      const result = await signUp(params);
      return result;
    } catch (error: any) {
      // console.log('error in createAsyncThunk', error);
      throw new Error(error?.message);
    }
  },
);

export const getUserData: any = createAsyncThunk(
  'auth/getUserData',
  async params => {
    try {
      const result = await getUserDetails(params);
      console.log('params in registeration', result);
      return result;
    } catch (error: any) {
      // console.log('error in createAsyncThunk', error);
      throw new Error(error?.message);
    }
  },
);