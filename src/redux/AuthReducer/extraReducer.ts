import {AuthState} from './authSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {emailsignIn, registration} from './action';
import {setAuthorizationToken} from '../../utils/common';

const extraReducers = (builder: any) => {
  builder.addCase(
    emailsignIn.pending,
    (state: AuthState, action: PayloadAction<any>) => {
      state.loading = true;
    },
  );
  builder.addCase(
    emailsignIn.fulfilled,
    (state: AuthState, action: PayloadAction<any>) => {
      console.log(state, action);
      setAuthorizationToken(action?.payload?.data?.token);
      state.token = action?.payload?.data?.token;
      state.loading = false;
    },
  );
  builder.addCase(
    emailsignIn.rejected,
    (state: AuthState, action: PayloadAction<any>) => {
      state.error = action?.payload?.message;
      state.loading = false;
    },
  );
  builder.addCase(
    registration.pending,
    (state: AuthState, action: PayloadAction<any>) => {
      state.loading = true;
    },
  );
  builder.addCase(
    registration.fulfilled,
    (state: AuthState, action: PayloadAction<any>) => {
      setAuthorizationToken(action?.payload?.data?.token);
      state.token = action?.payload?.data?.token;
      state.loading = false;
    },
  );
  builder.addCase(
    registration.rejected,
    (state: AuthState, action: PayloadAction<any>) => {
      state.error = action?.payload?.message;
      state.loading = false;
    },
  );
};

export {extraReducers};
