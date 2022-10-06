export enum Device {
  'PHONE',
  'TABLET',
}

export enum FetchState {
  'IDLE',
  'PENDING',
  'FULFILLED',
  'REJECTED',
}

export const DEVICE_LABEL = {
  [Device.PHONE]: 'Телефон',
  [Device.TABLET]: 'Планшет',
};

export const DEVICE_FILTER = {
  [Device.PHONE]: 'smartphones',
  [Device.TABLET]: 'laptops',
};

export const DEVICE_OPTIONS = [
  {
    value: Device.PHONE,
    label: DEVICE_LABEL[Device.PHONE],
  },
  {
    value: Device.TABLET,
    label: DEVICE_LABEL[Device.TABLET],
  },
];
