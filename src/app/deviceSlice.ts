import { createSlice } from '@reduxjs/toolkit';
import { Device } from '../const';

export interface IDeviceState {
  value: Device;
}

const initialState: IDeviceState = {
  value: Device.PHONE,
};

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    toggle: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value = Number(!state.value);
    },
  },
});

export const { toggle } = deviceSlice.actions;
export default deviceSlice.reducer;
