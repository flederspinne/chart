import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { FetchState } from '../const';

export const fetchData = createAsyncThunk('products', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data;
});

interface DataState {
  products: [];
  loading: FetchState;
}

const initialState = {
  products: [],
  loading: FetchState.IDLE,
} as DataState;

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      state.products = action.payload.products;
      // eslint-disable-next-line no-param-reassign
      state.loading = FetchState.FULFILLED;
    });
    builder.addCase(fetchData.pending, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = FetchState.PENDING;
    });
    builder.addCase(fetchData.rejected, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = FetchState.REJECTED;
    });
  },
});

export default dataSlice.reducer;
