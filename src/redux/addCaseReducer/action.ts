import {createAsyncThunk} from '@reduxjs/toolkit';
import {getApiCall, postApiCall} from '../../api/apiCommonActions';

export const addCase: any = createAsyncThunk(
  'addcase/add-case',
  async (params: any) => {
    try {
      const result = await postApiCall('/add-case', params);
      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message);
    }
  },
);

export const getNewCase: any = createAsyncThunk(
  'getNewCase/get-all-case',
  async (params) => {
    try {
      const result = await getApiCall(`/get-all-case${params}`);
      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message);
    }
  },
);