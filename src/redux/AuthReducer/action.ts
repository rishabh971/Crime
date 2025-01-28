import {createAsyncThunk} from '@reduxjs/toolkit';
import {postApiCall} from '../../api/apiCommonActions';

export const emailsignIn: any = createAsyncThunk(
  'auth/signIn',
  async (params: any) => {
    try {
      const result = await postApiCall('/login', params);
      return result;
    } catch (error: any) {
      console.log('error insidelogin', error);
      throw new Error(error?.message);
    }
  },
);

export const registration: any = createAsyncThunk(
  'auth/signUp',
  async (params: any) => {
    console.log('', params);
    try {
      const result = await postApiCall('/signup', params);
      return result;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },
);
