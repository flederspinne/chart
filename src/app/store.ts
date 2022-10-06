import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
