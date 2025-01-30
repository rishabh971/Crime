import {addCase, getNewCase} from './action';
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
  builder.addCase(
    getNewCase.pending,
    (state: any, action: PayloadAction<any>) => {},
  );
  builder.addCase(
    getNewCase.fulfilled,
    (state: any, action: PayloadAction<any>) => {},
  );
  builder.addCase(
    getNewCase.rejected,
    (state: any, action: PayloadAction<any>) => {},
  );
};

export {extraReducers};
