import {createAsyncThunk} from '@reduxjs/toolkit';
import {postApiCall} from '../../api/apiCommonActions';

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