import { PayloadAction } from '@reduxjs/toolkit';
import { emailsignIn, getUserData, registeration } from './action';
import { AuthState } from './authSlice';
import { setAuthorizationToken } from '../../utils/common';

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
      setAuthorizationToken(action?.payload?.data?.accesstoken);
      state.token = action?.payload?.data?.accesstoken;
      state.userProfile = {
        ...state.userProfile,
        ...action?.payload?.data?.userDetails,
      };
      state.loading = false;
      // console.log('tate is here ', state);
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
    registeration.pending,
    (state: AuthState, action: PayloadAction<any>) => {
      state.loading = true;
    },
  );
  builder.addCase(
    registeration.fulfilled,
    (state: AuthState, action: PayloadAction<any>) => {
      if (action.payload.statusCode === 200) {
        setAuthorizationToken(action?.payload?.data);
        state.token = action?.payload?.data;
        state.userProfile.phoneVerified = true;
      } else {
        state.error = action?.payload?.message;
      }
      state.loading = false;
    },
  );
  builder.addCase(
    registeration.rejected,
    (state: AuthState, action: PayloadAction<any>) => {
      state.error = action?.payload?.message;
      state.loading = false;
    },
  );

  builder.addCase(
    getUserData.pending,
    (state: AuthState, action: PayloadAction<any>) => {
      state.loading = true;
    },
  );
  builder.addCase(
    getUserData.fulfilled,
    (state: AuthState, action: PayloadAction<any>) => {
      state.userProfile = {
        ...state.userProfile,
        ...action?.payload?.data,
      };
      state.loading = false;
    },
  );
  builder.addCase(
    getUserData.rejected,
    (state: AuthState, action: PayloadAction<any>) => {
      state.error = action?.payload?.message;
      state.loading = false;
    },
  );
};

export { extraReducers };
