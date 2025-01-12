import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {extraReducers} from './extraReducer';

export interface AuthState {
  error: string;
  loading: boolean;
  userProfile: any;
  statusCode: number;
  token: string;
}

const initialState: AuthState = {
  userProfile: {},
  token: '',
  loading: false,
  error: '',
  statusCode: 0,
};

export const authSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userBasicDetails: (state, action: PayloadAction<any>) => {
      state.userProfile = {...state.userProfile, ...action.payload};
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
      console.log('action.payload', action, state);
    },
  },
  extraReducers: extraReducers,
});

// Action creators are generated for each case reducer function
export const {setAuthToken, userBasicDetails} = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
