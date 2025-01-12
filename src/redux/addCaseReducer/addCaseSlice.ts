import {createSlice} from '@reduxjs/toolkit';
import {extraReducers} from './extraReducer';

export interface AddCaseState {}

const initialState: AddCaseState = {};

export const addCaseSlice: any = createSlice({
  name: 'addcase',
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});

export const {} = addCaseSlice.actions;
const addCaseReducer = addCaseSlice.reducer;

export default addCaseReducer;
