import {addCase} from './action';
import {PayloadAction} from '@reduxjs/toolkit';

const extraReducers = (builder: any) => {
  builder.addCase(addCase.pending, (state: any, action: PayloadAction<any>) => {
    state.loading = true;
  });
  builder.addCase(
    addCase.fulfilled,
    (state: any, action: PayloadAction<any>) => {},
  );
  builder.addCase(
    addCase.rejected,
    (state: any, action: PayloadAction<any>) => {
      state.error = action?.payload?.message;
      state.loading = false;
    },
  );
};

export {extraReducers};
